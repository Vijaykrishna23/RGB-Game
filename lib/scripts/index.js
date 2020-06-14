// ========================================================================
//  getting dom elements
// ========================================================================
let colorDisplay = $(".h2");
let h1 = $(".container-fluid-head");
let sq = $(".sq");
let resetbtn = $("#reset");
let modebtn = $(".mode");
let message = $("#display");
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
    $(sq[i]).css("background", color);
  }
}

//  function for setting up squares

function setSq() {
  for (let i = 0; i < sq.length; i++) {
    sq[i].addEventListener("click", function() {
      let clickedColor = $(this).css("backgroundColor");
      if (clickedColor === pickedColor) {
        $(message).add(".display");
        $(message).text("correct");
        $(resetbtn).text("play again");
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
    modebtn[i].addEventListener("click", function() {
      $(modebtn[0]).remove("active");
      $(modebtn[1]).remove("active");
      $(this).add("active");
      $(this).text() === "easy" ? (num = 3) : (num = 6);
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
      $(sq[i]).css("display", "block");
      $(sq[i]).css("background", `${colors[i]}`);
      $(h1).css("background", "#3f3f44");
    } else {
      $(sq[i]).css("display", "none");
    }
  }
}

// main function to call all sub functions

function init() {
  mode();
  setSq();
  reset();
}