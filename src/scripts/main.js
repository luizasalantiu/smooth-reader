var story = new Story(rabbiEisikOfCrakow.story);
StoryAnimation.init(StoryViewModel, TimelineControls);
StoryViewModel.init(story, StoryAnimation.start); // TODO use a pubsub for event notification