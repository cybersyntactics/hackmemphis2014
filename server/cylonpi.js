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

        connection: {
            name: 'arduino',
            adaptor: 'firmata',
            port: 'COM3'
        },

        devices: [
            { name: 'led', driver: 'led', pin: 13 },
            { name: 'servo', driver: 'servo', pin: 9 }
        ],

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

CylonPi.prototype.getAngle = function() {
    return this.servo.currentAngle();
}

module.exports = exports = new CylonPi();