// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const Clock = require('./src/clock.js');
var notifications = [];


var notifySubstitution = function(clock, notifications) {
  var nofifyText = document.getElementById("notifyText");
  console.log(notifications[clock.substitutes + 1]);
  notifyText.setAttribute("style", "display: block");
  notifyText.innerText = `${notifications[clock.substitutes + 1]}`;
  clock.substitutionTracker();
}


var pauseClock = function(clock) {
  clock.toggleTime();
}

var startClock = function(clock, time) {
  var timeButton = document.getElementById("stopwatch");
  if (clock.clicked > 0) {
    timeButton.innerText = "Pause Game";
  }
  if (clock.paused) {
    console.log("pause");
    timeButton.innerText = "Resume Game";
  }
  else if (clock.time % 60 == 0 && clock.time != 0) {
    clock.addMinute();
    timeDisplay = `${clock.minutes}:00`;
    clock.resetSeconds();
  }
  else {
    clock.addSecond();
    if (clock.seconds < 10) {
      timeDisplay = `${clock.minutes}:0${clock.seconds}`
    }
    else {
      timeDisplay = `${clock.minutes}:${clock.seconds}`
    }
  }
  clock.startTime();
  time.innerText = `Time Elapsed: ${timeDisplay}`;
}

var gameClock = function(clock, notifications) {
  clock.clicked += 1;
  var rotationPeriod = clock.rotationCount;
  if (clock.started == true) {
    pauseClock(clock);
    clock.started = false;
  }
  else if (clock.clicked > 1) {
    clock.started = true;
  }
  else {
    var time = document.getElementById("time");
    setInterval(function() { startClock(clock, time); }, 1000);
    setInterval(function() {notifySubstitution(clock, notifications); }, (60000 * rotationPeriod));
    clock.started = true;
  }
};

/**
 *  what does the function do (not exactly how, but what)
 *
 *  players_in_array
 */
var timeTableCreate = function(players_in_array, playersIn, current_time, names, playerOut, notifications) {
    //explain what these are
    var row = document.getElementById("rows");
    var tableWrap = document.createElement("DIV");

    //explain what this is doing
    tableWrap.setAttribute("class", "col-xs-4 tables");
    row.appendChild(tableWrap);

    //wtf is this (how are you going to use it in the future)
    var timeDisplay = document.createElement("DIV");

  if (current_time > 0) {
    var notification = timeDisplay.innerText = `${current_time}:00 - ${players_in_array[playersIn - 1]} goes in for ${playerOut}`;
    notifications.push(notification);
  }
  else {
    var notification = timeDisplay.innerText = `Starting ${playersIn}`;
    notifications.push(notification);
  }
  tableWrap.appendChild(timeDisplay);
  for (var q = 0; q < playersIn; q++) {
    var player = document.createElement("DIV");
    player.innerText = `${players_in_array[q]} `;
    player.setAttribute("class", "times");
    tableWrap.appendChild(player);
  }
}

var nameManipulate = function(playerAmount, rotationPeriod, totalTime, playersIn, playersPerRotInt) {
  // console.log("playersperrot");
  // console.log(playersPerRotInt);
  var stopWatch = document.getElementById("stopwatch");
  stopWatch.setAttribute("style", "display: block");
  var number_of_rotations = totalTime / rotationPeriod;
  var names = document.querySelectorAll('input.name');
  var name_index = 0;
  var current_time = 0;
  clock.rotationCount = rotationPeriod;

  for (var i = 0; i < number_of_rotations; i++) {
    var players_in_array = [];

    if (name_index >= playerAmount - playersIn + 1) {
      var frontPlayers = playerAmount - name_index;

      for (var q = 0; q < frontPlayers; q++) {
        if (q == 0) {
          var players_out = [];
          for (var out = 0; out < playersPerRotInt; out++) {
            var playerOut = names[playerAmount - frontPlayers + out].value;
            players_out.push(playerOut);
          }
          console.log("players out");
          console.log(players_out);
        }
        players_in_array.push(names[playerAmount - frontPlayers + q].value);
      }

      for (var q = 0; q < playersIn - frontPlayers; q++) {
        players_in_array.push(names[q].value);
      }

      console.log(players_in_array);
      timeTableCreate(players_in_array, playersIn, current_time, names, playerOut, notifications);
      current_time += rotationPeriod;
      name_index += 1;
      if (name_index == playerAmount) {
        name_index = 0;
      }
    }

    else {
      if (name_index == playerAmount - 1) {
        name_index = 0;
      }

      for (var q = 0; q < playersIn; q++) {
        if (q == 0) {
          var players_out = [];
          if (name_index > 1){
            for (var out = 0; out < playersPerRotInt; out++) {
              var playerOut = names[name_index + out].value;
              players_out.push(playerOut);
            }
            console.log("players out");
            console.log(players_out);
          }
          else {
            for (var out = 0; out < playersPerRotInt; out++) {
              var playerOut = names[out].value
              players_out.push(playerOut);
            }
            console.log("players_out");
            console.log(players_out);
          }
        }
        players_in_array.push(names[name_index + q].value);
      }

      console.log(players_in_array);
      timeTableCreate(players_in_array, playersIn, current_time, names, playerOut, notifications);

      current_time += rotationPeriod;
      name_index += 1;
    }
  }
}

var calculate = function(player_amount, time_of_rotation, total_time, players_in) {
  var playerArray = [];
  var playerInt = parseInt(player_amount, 10);
  var rotationInt = parseInt(time_of_rotation, 10);
  var totalInt = parseInt(total_time, 10);
  var playersInInt = parseInt(players_in, 10);
  var playersPerRotInt = playerInt - playersInInt;
  var inputs = document.getElementById("inputs");
  for (var i = 0; i < playerInt; i++) {
    console.log(i);

    var player_input = document.createElement("INPUT");
    player_input.setAttribute("class", "name");
    var player_label = document.createElement("LABEL");
    var breaking1 = document.createElement("BR");
    var breaking2 = document.createElement("BR");
    player_input.setAttribute("type", "text");

    inputs.appendChild(player_input);
    inputs.appendChild(breaking1);
    inputs.appendChild(breaking2);

    playerArray.push(player_input);
  }
  var nameSort = document.getElementById("nameSort");
  nameSort.style.display = "block";
  nameSort.onclick = function() {nameManipulate(playerArray.length, rotationInt, totalInt, playersInInt, playersPerRotInt)};
}

var continuation = function() {
  var total_time = document.getElementById("total_time").value;
  var player_amount = document.getElementById("player_amount").value;
  var time_of_rotation = document.getElementById("time_per_rotation").value;
  var players_in = document.getElementById("players_in").value;
  calculate(player_amount, time_of_rotation, total_time, players_in);
};

var clock = new Clock.GameClock(0, 0, 0, 0, 0, 0, false, false);
continued.onclick = function() {continuation()};
stopwatch.onclick = function() {gameClock(clock, notifications)};
