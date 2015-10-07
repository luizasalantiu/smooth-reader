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