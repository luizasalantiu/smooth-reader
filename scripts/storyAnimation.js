var StoryAnimation = (function() {
    var _storyViewModel;
    var _timelineControls = TimelineControls;
    var _lettersClass = "letter";
    var _timeline = new TimelineLite();

    // Title animation config
    _titleAnimConfig = {
        flyInDuration: 7,
        stayDuration: 2,
        fadeOutDuration: 2
    };

    // Content animation config
    _contentAnimConfig = {
        delay: _titleAnimConfig,
        animationInDuration: 0.7,
        animationOutDuration: 0.5,
        animationStayDuration: 3,
        delayBetweenAnimations: 0.4
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
    };

    function hideTitleWithDelay(delay) {
        setTimeout(_storyViewModel.hideTitle, delay); // transform to milliseconds

        return that;
    };

    function animateContentWithDelay(delay) {
        setTimeout(animateContent, delay); // transform to milliseconds

        return that;
    };

    function animateContent() {
        _timelineControls.onStartAnimation();
        _storyViewModel.getSections().slideEach(_timeline, {
            offsetDelay: 0,
        });

        return that;
    };

    function getTitleAnimMillisec() {
        var total = _titleAnimConfig.flyInDuration + _titleAnimConfig.stayDuration + _titleAnimConfig.fadeOutDuration;

        return total * 1000; // to milliseconds
    }

    function start() {
        var animateContentDelay = getTitleAnimMillisec();
        animateTitle().animateContentWithDelay(animateContentDelay);
    };

    function init(storyViewModel) {
        _storyViewModel = storyViewModel;
        _timelineControls.init(_timeline, this);
    }

    return that = {
        init: init,
        start: start,
        hideTitleWithDelay: hideTitleWithDelay,
        animateContentWithDelay: animateContentWithDelay,
    };
})();