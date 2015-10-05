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
    };

    function _pause() {
        timeline.pause();
        _updateForState(state.paused);
    };

    function _restart() {
        timeline.restart();
        _updateForState(state.playing);
    };

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
    };

    function _updateSlider() {
        $("#slider").slider("value", timeline.progress() * 100);
    };

    function _initSlider() {
        $("#slider").slider({
            range: false,
            min: 0,
            max: 100,
            step: .1,
            slide: function(event, ui) {
                _pause();
                timeline.progress(ui.value / 100);
            }
        });
    };

    function _addEventListeners() {
        timeline.eventCallback("onUpdate", _updateSlider);
        timeline.eventCallback("onComplete", _updateForState, [state.completed]);
        $wrapper.mouseenter(function() {
            $controls.show();
        }).mouseleave(function() {
            $controls.hide();
        });
    }

    function onStartAnimation() {
        _updateForState(state.playing);
    };

    function init(tl) {
        timeline = tl;
        _initSlider();
        _addEventListeners();
    };

    return {
        init: init,
        onStartAnimation: onStartAnimation
    };
})();