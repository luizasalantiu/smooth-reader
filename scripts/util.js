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