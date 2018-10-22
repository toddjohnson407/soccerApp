module.exports = {

  GameClock: function(time, minutes, seconds, clicked, substitutes, rotationPeriod, started, paused) {
    this.time = time;
    this.minutes = minutes;
    this.seconds = seconds;
    this.clicked = clicked;
    this.paused = paused;
    this.substitutes = substitutes;
    this.rotationPeriod = rotationPeriod;

    this.startTime = function() {
      this.time += 1;
    }
    this.addMinute = function() {
      this.minutes += 1;
    }
    this.resetSeconds = function() {
      this.seconds = 0;
    }
    this.addSecond = function() {
      this.seconds += 1;
    }
    this.addClickCount = function() {
      this.clicked += 1;
    }
    this.started = function() {
      this.started = true;
    }
    this.toggleTime = function() {
      if (this.paused == false) {
        this.paused = true
      }
      else {
        this.paused = false
      }
    }
    this.substitutionTracker = function() {
      this.substitutes += 1;
    }
  }
}
