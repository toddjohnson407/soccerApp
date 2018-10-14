// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.


var nameManipulate = function(playerAmount, rotationPeriod, totalTime) {
  var number_of_rotations = totalTime / rotationPeriod;
  var names = document.querySelectorAll('input.name');
  var name_index = 0;
  for (var i = 0; i < number_of_rotations; i++) {

    if (name_index == playerAmount - 1) {
      name_index = 0;
      console.log(`${names[playerAmount - 1].value}${names[name_index].value}`);
    }
    else if (name_index > playerAmount - 1) {
      name_index = 0;
      console.log("oh");
    }
    else {
      console.log(`${names[name_index].value}${names[name_index+1].value}`);
      name_index += 1;
    }
  }
}

var calculate = function(player_amount, time_of_rotation, total_time) {
  var playerArray = [];
  var playerInt = parseInt(player_amount, 10);
  var rotationInt = parseInt(time_of_rotation, 10);
  var totalInt = parseInt(total_time, 10);
  console.log(playerInt);
  for (var i = 0; i < playerInt; i++) {
    console.log(i);

    var player_input = document.createElement("INPUT");
    player_input.setAttribute("class", "name");
    var player_label = document.createElement("LABEL");
    var breaking1 = document.createElement("BR");
    var breaking2 = document.createElement("BR");
    player_input.setAttribute("type", "text");

    document.body.appendChild(player_input);
    document.body.appendChild(breaking1);
    document.body.appendChild(breaking2);

    playerArray.push(player_input);
  }
  console.log(playerArray.length);
  var nameSort = document.getElementById("nameSort");
  nameSort.style.display = "block";
  nameSort.onclick = function() {nameManipulate(playerArray.length, rotationInt, totalInt)};
}

var continuation = function() {
  var total_time = document.getElementById("total_time").value;
  var player_amount = document.getElementById("player_amount").value;
  var time_of_rotation = document.getElementById("time_per_rotation").value;
  calculate(player_amount, time_of_rotation, total_time);
};

continued.onclick = function() {continuation()};
