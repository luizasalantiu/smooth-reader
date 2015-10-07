(function($) {
    $.fn.slideEach = function(timeline, options) {
        var opts = $.extend({}, $.fn.slideEach.defaults, options);
        opts.totalDuration = opts.durationIn + opts.durationStay + opts.durationOut;
        this.each(function(index) {
            _slideElement(timeline, this, index, opts);
        });

        return this;
    };

    function _slideElement(timeline, elem, index, opts) {
        var thisElemDelay = opts.offsetDelay + index * (opts.totalDuration + opts.durationBetween);
        timeline.to(elem, opts.durationIn, {
            opacity: 1,
            x: 0,
            ease: opts.easeEffectIn,
            delay: thisElemDelay
        })
            .to(elem, opts.durationOut, {
                opacity: 0,
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
    durationStay: 2,
    durationOut: 0.5,
    durationBetween: 0,
    // See http://greensock.com/ease-visualizer for more ease options
    easeEffectIn: Power0.easeNone,
    easeEffectOut: Power4.easeIn
};