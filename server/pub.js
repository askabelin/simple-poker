Meteor.publish("users", function () {
    return Meteor.users.find();
});

Meteor.publish("games", function () {
    return Games.find({}, {sort: {number: -1}, limit: 1})
});

Meteor.publish("bids", function (gameId) {
    return Bids.find({gameId: gameId}, {fields: {value: 0}});
});

Meteor.publish("bidResults", function (gameId) {
    return Bids.find({
        gameId: gameId,
        $or: [{revealed: true}, {userId: this.userId}]
    });
});
