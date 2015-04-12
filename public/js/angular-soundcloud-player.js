'use strict';

require('angular/angular');

var player = angular.module('angular-soundcloud-player', []);

player.directive('soundcloudPlayer', function() {
    return {
    	scope: true,
    	link: function link(scope, element, attrs) {
    		scope.tracks = [];

    		var resourceLink = attrs.soundcloudPlayer;
    		if(!$.trim(resourceLink))
    			throw new Error("resource link not set on directive soundcloud-player. Ex. <div soundcloud-player=\"/users/4246445/favorites\"></div>");
			SC.initialize({
		    	client_id: "YOUR_CLIENT_ID"
		  	});
		  	SC.get(resourceLink, {limit: 100}, function(tracks){
		  		var _tracks = [];

		  		for(var i = 0; i < tracks.length; i++) {
		  			if(!tracks[i].artwork_url)
		  				tracks[i].artwork_url = "https://a-v2.sndcdn.com/assets/images/default/cloudx200-38b02b00.png";

		  			if(tracks[i].streamable)
		  				_tracks.push(tracks[i]);
		  		}
		  		scope.$apply(function(){
					scope.tracks = _tracks;
			    });
			});
        },
        controller: function($scope) {
            $scope.playTrack = function(trackURI) {
            	SC.stream(trackURI, {
					useHTML5Audio: true
            	}, function(sound){
            		if($scope.currentTrack)
            			$scope.currentTrack.stop();

            		$scope.currentTrack = sound;
					sound.play();
				});
            };
        }
    };
});

//checks if flash is installed/enabled on the browser
function isFlashEnabled()
{
    var hasFlash = false;
    try
    {
        var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
        if(fo) hasFlash = true;
    }
    catch(e)
    {
        if(navigator.mimeTypes ["application/x-shockwave-flash"] != undefined) hasFlash = true;
    }
    return hasFlash;
}

module.exports = player;