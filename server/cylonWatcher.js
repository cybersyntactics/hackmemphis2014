var cylonPi = require('./cylonpi.js');

function Watcher(serviceProvider) {

  this.watch = function(get_url, field, size, count, condition) {
    serviceProvider.get(get_url, function(e, data, res) {
      var fieldCount = 0;

      data = JSON.parse(data);

      if(count) {
        for(var i = 0; i < data[field].length; i++) {
          if(condition(data[field][i])) fieldCount++;
        }

        var angle = 30 + fieldCount / size * 120; // count / max results * max angle
        if(angle > 30 && angle < 150) cylonPi.setAngle(angle);
      } else {
        var angle = 30 + data[field] / size * 120;
        if(angle > 30 && angle < 150) cylonPi.setAngle(angle);
      }
    });
  }
}

module.exports = Watcher;