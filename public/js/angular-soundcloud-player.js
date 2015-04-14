'use strict';

require('angular/angular');

var player = angular.module('angular-soundcloud-player', []);
var cachedTracks = undefined;
var globalPlayer = undefined;
var currentTrack = undefined;

player.directive('soundcloudPlayer', function() {
    return {
        controller: function($scope, $attrs) {
            if(cachedTracks) {
                $scope.tracks = cachedTracks;
            } else
            {
                $scope.tracks = [];

                var resourceLink = $attrs.soundcloudPlayer;
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

                    cachedTracks = _tracks;

                    $scope.$apply(function(){
                        $scope.tracks = _tracks;
                    });
                });
            }

            $scope.playTrack = function(track) {
                if(globalPlayer && currentTrack.id == track.id) {
                    globalPlayer.togglePause();
                    return;
                }

            	SC.stream(track.uri, {
					useHTML5Audio: true
            	}, function(sound){
            		if(globalPlayer)
            			globalPlayer.stop();

                    var shouldCallDigest = false;
                    if(!globalPlayer)
                        shouldCallDigest = true;

                    globalPlayer = sound;
                    currentTrack = track;

					globalPlayer.play();

                    if(shouldCallDigest)
                        $scope.$digest();
				});
            };

            $scope.isPlaying = function(track) {
                if(currentTrack && currentTrack.id == track.id && !globalPlayer.paused)
                    return true;
                else
                    return false;
            }
        }
    };
});

module.exports = player;