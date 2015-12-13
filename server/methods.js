Meteor.methods({
    newGame: function () {
        var lastGame = Games.findOne({}, {
            sort: {number: -1},
            limit: 1
        });
        Games.insert({number: lastGame ? lastGame.number + 1 : 1});
    },
    revealBids: function (gameId) {
        var usersCount = Meteor.users.find().count();
        var bidsCount = Bids.find({gameId: gameId}).count();
        if (usersCount == bidsCount) {
            Bids.update({gameId: gameId}, {$set: {revealed: true}}, {multi: true});
        }
    }
});
