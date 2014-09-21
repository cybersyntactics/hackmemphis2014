var Cylon = require('cylon');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

function CylonPi() {
    this.servo = {};
    this.myAngle = 0;
}
util.inherits(CylonPi, EventEmitter);

CylonPi.prototype.initRobot = function() {
    var self = this;
    Cylon.robot({
        name: 'piservo',

        connection: { name: 'raspi', adaptor: 'raspi', port: '/dev/ttyACM0' },
        device: { name: 'servo', driver: 'servo', pin: 7 },

        work: function(my) {
            self.myAngle = 0;
            self.servo = Cylon.robots.piservo.devices.servo;
            self.emit('ready');
            console.log('piservo ready for work');
        }
    });

    Cylon.start();
};

CylonPi.prototype.setAngle = function(angle) {
    this.myAngle = angle;
    console.log('Setting Angle: ' + this.myAngle);

    this.servo.angle(angle);

    return this.myAngle;
};

module.exports = exports = new CylonPi();