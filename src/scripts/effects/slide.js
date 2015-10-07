(function($) {
    $.fn.slideEach = function(timeline, options) {
        var opts = $.extend({}, $.fn.slideEach.defaults, options);

        this.each(function(index) {
            _slideElement(timeline, this, opts);
        });

        return this;
    };

    // With no delay, animations would happen sequentially. Delay specified is relative to previous animation.
    function _slideElement(timeline, elem, opts) {
        var initialZindex = $(elem).css("z-index");
        timeline.to(elem, opts.durationIn, {
            opacity: 1,
            x: 0,
            zIndex: 1000,
            ease: opts.easeEffectIn,
            delay: opts.durationBetween
        })
            .to(elem, opts.durationOut, {
                opacity: 0,
                zIndex: initialZindex,
                x: -150,
                ease: opts.easeEffectOut,
                delay: opts.durationStay
            });
    }
}(jQuery));

// Plugin defaults
$.fn.slideEach.defaults = {
    offsetDelay: 0,
    durationIn: 1,
    durationStay: 6,
    durationOut: 0.5,
    durationBetween: 0,
    // See http://greensock.com/ease-visualizer for more ease options
    easeEffectIn: Power0.easeNone,
    easeEffectOut: Power4.easeIn
};