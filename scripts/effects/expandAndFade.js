(function($) {
    $.fn.expandAndFadeOut = function(options) {
        var opts = $.extend({}, $.fn.expandAndFadeOut.defaults, options);
        var timeline = new TimelineLite();

        this.each(function(i) {
            timeline.to(this, opts.duration, {
                delay: opts.delay,
                opacity: 0,
                marginLeft: i * opts.effectMagnitude,
                ease: opts.ease,
                repeat: 0
            }, "expand");
        });

        return this;
    };

}(jQuery));

// Plugin defaults
$.fn.expandAndFadeOut.defaults = {
    delay: 0,
    duration: 2,
    effectMagnitude: 0.3,
    // See http://greensock.com/ease-visualizer for more ease options
    ease: Expo.easeOut,
};