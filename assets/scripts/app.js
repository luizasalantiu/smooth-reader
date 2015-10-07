var rabbiEisikOfCrakow  = rabbiEisikOfCrakow  || {};

rabbiEisikOfCrakow.story = "The Story of Rabbi Eisik of Crakow\nAfter many years of great poverty which had never shaken his faith in God, he dreamed someone bade him look for a treasure in Prague, under the bridge which leads to the King's palace.\nWhen the dream recurred a third time, Rabbi Eisik prepared for the journey and set out for Prague. But the bridge was guarded day and night and he did not dare to start digging. Nevertheless, he went to the bridge every morning and kept walking around it until evening.\nFinally, the captain of the guards, who had been watching him, asked in a kindly way whether he was looking for something or waiting for somebody. Rabbi Eisik told him of the dream which had brought him here from a faraway country.\nThe captain laughed: \"And so to please the dream, you poor fellow wore out your shoes to come here! As for having faith in dreams, if I had it, I should have had to get going when a dream once told me to go to Cracow and dig for treasure under the stove in the room of a Jew – Eisik, son of Yekel, that was the name! Eisik, son of Yekel! I can just imagine what it would be like, how I should have to try every house over there, where one half of the Jews are named Eisik, and the other, Yekel!\" And he laughed again.\nRabbi Eisik bowed, traveled home, dug up the treasure from under the stove, and built the house of prayer which is called \"Reb Eisik's Shul\".";
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
(function($) {
    $.fn.flyIn = function(options) {
        var opts = $.extend({}, $.fn.flyIn.defaults, options);

        this.each(function(i) {
            TweenMax.from(this, opts.duration, {
                opacity: 0,
                x: util.random(-500, 500),
                y: util.random(-500, 500),
                z: util.random(-500, 500),
                scale: 0.1,
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
// top-level namespace
var util = util || {};

util.random = function(min, max) {
    return (Math.random() * (max - min)) + min;
};

util.convertHtmlToLetters = function($container, letterClass) {
    var text = $container.text();
    $container.text("");
    var letters = text.split("");
    letters = $.map(letters, function(letter) {
        return (letter == " ") ? "&nbsp" : letter;
    });
    return util.populateContainer($container, letters, letterClass);
};

util.convertHtmlToWords = function($container, wordClass) {
    var text = $container.text();
    $container.text("");
    var words = text.split(" ");
    return util.populateContainer($container, words, wordClass);
};

util.populateContainer = function($container, elements, elementClass) {
    $.each(elements, function(i, element) {
        var newElem = $("<div/>").html(element).addClass(elementClass);
        $container.append(newElem);
    });
    return $container.children();
};

util.fixHeight = function($container) {
    var heights = $container.children().map(function() {
        return $(this).height();
    });

    $container.height(Math.max.apply(Math, heights));
};
var TimelineControls = (function() {
    var timeline;
    var $wrapper = $("#controlsWrapper");
    var $controls = $wrapper.find("#controls");
    var $playButton = $controls.find("#play");
    var $restartButton = $controls.find("#restart");

    var state = {
        playing: "playing",
        paused: "paused",
        completed: "completed"
    };

    function _play() {
        timeline.play();
        _updateForState(state.playing);
    }

    function _pause() {
        timeline.pause();
        _updateForState(state.paused);
    }

    function _restart() {
        timeline.restart();
        _updateForState(state.playing);
    }

    function _updateForState(_state) {
        switch (_state) {
            case state.playing:
                $playButton.text("pause");
                $playButton.one("click", _pause);
                break;
            case state.paused:
                $playButton.text("play");
                $playButton.one("click", _play);
                break;
            case state.completed:
                $controls.show();
                $playButton.text("restart");
                $playButton.one("click", _restart);
                break;
            default:
                throw new TypeError('An invalid state was supplied');
        }
    }

    function _updateSlider() {
        $("#slider").slider("value", timeline.progress() * 100);
    }

    function _initSlider() {
        $("#slider").slider({
            range: false,
            min: 0,
            max: 100,
            step: 0.1,
            slide: function(event, ui) {
                _pause();
                timeline.progress(ui.value / 100);
            }
        });
    }

    function _addTimelineListeners() {
        timeline.eventCallback("onUpdate", _updateSlider);
        timeline.eventCallback("onComplete", _updateForState, [state.completed]);
    }

    function onStartAnimation() {
        $wrapper.mouseenter(function() {
            $controls.show();
        }).mouseleave(function() {
            $controls.hide();
        });
        _updateForState(state.playing);
    }

    function init(tl) {
        timeline = tl;
        _initSlider();
        _addTimelineListeners();
    }

    return {
        init: init,
        onStartAnimation: onStartAnimation
    };
})();
function Story(text) {
    if (typeof text !== 'string' && !(text instanceof String)) throw new Error("Please provide a string to create a story object.");
    this.sections = text.split(/\r?\n/);
    this.title = this.sections.shift();
}

Story.prototype.getTitle = function() {
    return this.title;
};

Story.prototype.getSections = function() {
    return this.sections;
};
var StoryViewModel = (function() {
    var $el = $("#story");
    var $content;
    var $title;
    var template = $el.find("#story-template").html();
    var _story;

    function _render(callback) {
        var data = {
            title: story.getTitle(),
            sections: story.getSections()
        };

        $el.html(Mustache.render(template, data));
        if (typeof callback === "function") {
            callback();
        }

        $content = $el.find(".content");
        util.fixHeight($content);
    }

    function init(story, callback) {
        _story = story;
        _render(callback);
    }

    function getTitle() {
        if ($title === undefined) {
            $title = $el.find(".title");
        }
        return $title;
    }

    function hideTitle() {
        getTitle().hide();
    }

    function getSections() {
        return $el.find("p");
    }

    return {
        init: init,
        getTitle: getTitle,
        hideTitle: hideTitle,
        getSections: getSections
    };
})();
var StoryAnimation = (function() {
    var _storyViewModel;
    var _timelineControls;
    var _lettersClass = "letter";
    var _timeline = new TimelineLite();

    _titleAnimConfig = {
        flyInDuration: 7,
        stayDuration: 2,
        fadeOutDuration: 2
    };

    function animateTitle() {
        var $letters = util.convertHtmlToLetters(_storyViewModel.getTitle(), _lettersClass);
        $letters.flyIn({
            flyInDuration: _titleAnimConfig.flyInDuration
        });

        $letters.expandAndFadeOut({
            delay: _titleAnimConfig.flyInDuration + _titleAnimConfig.stayDuration,
            duration: _titleAnimConfig.fadeOutDuration
        });

        return that;
    }

    function hideTitleWithDelay(delay) {
        setTimeout(_storyViewModel.hideTitle, delay); // transform to milliseconds

        return that;
    }

    function animateContentWithDelay(delay) {
        setTimeout(animateContent, delay); // transform to milliseconds

        return that;
    }

    function animateContent() {
        _timelineControls.onStartAnimation();
        _storyViewModel.getSections().slideEach(_timeline);

        return that;
    }

    function getTitleAnimMillisec() {
        var total = _titleAnimConfig.flyInDuration + _titleAnimConfig.stayDuration + _titleAnimConfig.fadeOutDuration;

        return total * 1000; // to milliseconds
    }

    function start() {
        var animateContentDelay = getTitleAnimMillisec();
        //animateTitle().hideTitleWithDelay(animateContentDelay).animateContentWithDelay(animateContentDelay);
        hideTitleWithDelay(0).animateContentWithDelay(0);
    }

    function init(storyViewModel, timelineControls) {
        _storyViewModel = storyViewModel;
        _timelineControls = timelineControls;
        _timelineControls.init(_timeline, this);
    }

    return that = {
        init: init,
        start: start,
        hideTitleWithDelay: hideTitleWithDelay,
        animateContentWithDelay: animateContentWithDelay,
    };
})();
var story = new Story(rabbiEisikOfCrakow.story);
StoryAnimation.init(StoryViewModel, TimelineControls);
StoryViewModel.init(story, StoryAnimation.start); // TODO use a pubsub for event notification