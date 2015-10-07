// View Model
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

// Model
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