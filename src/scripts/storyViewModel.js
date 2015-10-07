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