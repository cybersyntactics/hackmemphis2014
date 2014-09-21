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
        this.servoAngle = 30;
        this.hashtag;

        $scope.setAngle = function(angle) {
            var myAngle = parseInt(angle, 10);

            if (myAngle <= 150 && myAngle >= 30) {
                this.servoAngle = myAngle;
                mySocket.emit('setAngle',myAngle);
            }

        };

        $scope.monitorHashtag = function(hashtag) {
            this.hashtag = hashtag;
            if(this.hashtag) mySocket.emit('monitorHashtag', this.hashtag);
        }

        $scope.clearHashtag = function(hashtag) {
            mySocket.emit('clearHashtag', this.hashtag);
        }

        mySocket.on('connected',function(data){
            $log.console('Working!')
        });

    }
);