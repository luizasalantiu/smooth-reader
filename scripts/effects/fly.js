(function($) {
    $.fn.flyIn = function(options) {
        var opts = $.extend({}, $.fn.flyIn.defaults, options);

        this.each(function(i) {
            TweenMax.from(this, opts.duration, {
                opacity: 0,
                x: util.random(-500, 500),
                y: util.random(-500, 500),
                z: util.random(-500, 500),
                scale: .1,
                delay: i * opts.effectMagnitude,
                yoyo: opts.yoyoFlag,
                repeat: opts.repeat,
                repeatDelay: opts.repeatDelay
            });
        });

        return this;
    };
}(jQuery));

// Plugin defaults
$.fn.flyIn.defaults = {
    duration: 7,
    effectMagnitude: 0.02,
    yoyoFlag: false,
    repeat: 0,
    repeatDelay: 0
};