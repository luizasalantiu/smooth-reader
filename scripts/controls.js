var TimelineControls = (function() {
    var timeline;
    var $controls = $("#controls");
    var $playButton = $("#play");
    var $restartButton = $("#restart");

    var state = {
        play: "play",
        pause: "pause"
    };

    function _play() {
        timeline.play();
        _updateForState(state.play);
    };

    function _pause() {
        timeline.pause();
        _updateForState(state.pause);
    };

    function _restart() {
        timeline.restart();
        _updateForState(state.play);
    };

    function _updateForState(_state) {
        if (_state === state.play) {
            $playButton.text("pause");
            $playButton.one("click", _pause);
            return;
        }

        if (_state === state.pause) {
            $playButton.text("play");
            $playButton.one("click", _play);
            return;
        }

        throw new TypeError('An invalid state was supplied');
    };

    function _updateSlider() {
        $("#slider").slider("value", timeline.progress() * 100);
    };

    function _initSlider() {
        timeline.eventCallback("onUpdate", _updateSlider);
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

    function init(tl) {
        timeline = tl;
        _initSlider();
        $playButton.one("click", _play);
        $restartButton.click(_restart);
    };

    function onStartAnimation() {
        $controls.show();
        _updateForState(state.play);
    };

    return {
        init: init,
        onStartAnimation: onStartAnimation
    };
})();