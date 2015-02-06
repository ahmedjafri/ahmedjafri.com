var $ = require('jquery');

'use strict';

var loadedCallback = $.Callbacks();

function PathLoader( el ) {
  this.el = el;

  // clear line
  this.el.style.strokeDasharray = this.el.style.strokeDashoffset = this.el.getTotalLength();

  this._draw = function( val ) {
    this.el.style.strokeDashoffset = this.el.getTotalLength() * ( 1 - val );
  }

  this.setProgress = function( val ) {
    this._draw(val);
  }
}

// disable scrolling while loading
(function() {
  window.addEventListener( 'scroll', noscroll );
  
  function noscroll() {
    window.scrollTo( 0, 0 );
  }

  loadedCallback.add(function() {
    window.removeEventListener( 'scroll', noscroll );
  });

})();

var animEndEventNames = { 'WebkitAnimation' : 'webkitAnimationEnd', 'OAnimation' : 'oAnimationEnd', 'msAnimation' : 'MSAnimationEnd', 'animation' : 'animationend' };
var animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];

(function() {

  var support = { animations : Modernizr.cssanimations },
    container = $('.wrapper').get(0),
    loader = new PathLoader( document.getElementById( 'ip-loader-circle' ) );

  $("main").bind(animEndEventName, function(){ 
    $(this).removeClass('opacity-no-show');
    $(this).addClass('opacity-show');
  });

  (function startLoading() {
    $(container).addClass('loading');

      var progress = 0,
      interval = setInterval( function() {
        progress = Math.min( progress + Math.random() * 0.1, 1 );
        loader.setProgress( progress );

        if( progress === 1 ) {
          $(container).removeClass('loading');
          $(container).addClass('loaded');

          clearInterval( interval );

          $("header.brand-header").one(animEndEventName, function(){
            $("main").addClass('animate-opacity-to-show'); 
            $(container).addClass('layout-switch');
            loadedCallback.fire();
          });
        }
      }, 80 );

    })();
  
})();