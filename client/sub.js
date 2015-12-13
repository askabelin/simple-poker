Meteor.subscribe("games");
Meteor.subscribe("users");
Tracker.autorun(function () {
    Meteor.subscribe("bids", Session.get("gameId"));
    Meteor.subscribe("bidResults", Session.get("gameId"));
});

