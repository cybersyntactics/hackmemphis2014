'use strict';

var hackMeter = angular.module('hackMeter',[
    'btford.socket-io'
]);

hackMeter.factory('mySocket', function (socketFactory) {
    return socketFactory({
        prefix: ''
    });
});

hackMeter.controller('MainController',
    function($scope,mySocket) {
        this.servoAngle = 11;

        $scope.setAngle = function(angle) {
            var myAngle = parseInt(angle, 10);

            if (myAngle <= 360 && myAngle >= 0) {
                this.servoAngle = myAngle;
                mySocket.emit('setAngle',myAngle);
            }

        };

        mySocket.on('connected',function(data){
            $log.console('Working!')
        });

    }
);