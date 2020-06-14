// ========================================================================
//  getting dom elements
// ========================================================================
const colorDisplay = $(".h2");
const h1 = $("jumbotron");
const sq = $(".sq");
const resetbtn = $("#reset");
const modebtn = $(".mode");
const message = $("#display");
// ========================================================================
//  starting the game
// ========================================================================
let num = 6;
let colors = randomColor(num);
init();

// ========================================================================
//  functions
// ========================================================================

//  function for generating random colors in colors array

function randomColor(num) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);
    let rgb = `rgb(${r}, ${g}, ${b})`;
    arr.push(rgb);
  }
  return arr;
}

//  function for choosing a color from colors array

function colorPicker(num) {
  let i = Math.floor(Math.random() * colors.length);
  return colors[i];
}

//  function to change all squares colors to the picked color

function changeColors(color) {
  for (let i = 0; i < sq.length; i++) {
    sq[i].style.background = color;
  }
}

//  function for setting up squares

function setSq() {
  for (let i = 0; i < sq.length; i++) {
    sq[i].addEventListener("click", function () {
      let clickedColor = this.style.background;
      if (clickedColor === pickedColor) {
        message.add(".display");
        message.text("correct");
        resetbtn.text("play again");
        changeColors(clickedColor);
      } else {
        $(this).css("background", "#3f3f44");
        message.text("try again");
      }
    });
  }
}

// setting resetbtn

resetbtn.click(() => reset());

//  function for setting up btn

function mode() {
  for (let i = 0; i < modebtn.length; i++) {
    modebtn[i].addEventListener("click", function () {
      modebtn[0].classList.remove("active");
      modebtn[1].classList.remove("active");
      this.classList.add("active");
      num =  this.textContent === "easy" ? 3 : 6;
      reset();
    });
  }
}

//  function for resetting the game

function reset() {
  colors = randomColor(num);
  pickedColor = colorPicker();
  colorDisplay.text(pickedColor);
  resetbtn.text("New Colors");
  message.text("");
  for (let i = 0; i < sq.length; i++) {
    if (colors[i]) {
      sq[i].style.display = "block";
      sq[i].style.background = colors[i];
    } else {
      sq[i].style.display = "none";
    }
  }
}

// main function to call all sub functions

function init() {
  mode();
  setSq();
  reset();
}
