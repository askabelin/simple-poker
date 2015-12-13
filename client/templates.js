Template.pokerGame.helpers({
    game: function () {
        var game = Games.findOne();
        //TODO find better place to set gameId
        if (game && game != Session.get("gameId")) {
            Session.set("gameId", game._id)
        }
        return game;
    },
    users: function () {
        return Meteor.users.find()
    },
    bidOptions: ["1h", "2h", "3h", "4h", "8h", "12h", "2d", "3d", "4d"]
});

Template.pokerGame.events({
    "click #new-game": function () {
        return Meteor.call("newGame");
    },
    "click .bid": function (event) {
        var gameId = Session.get("gameId");
        var bid = Bids.findOne({
            userId: Meteor.userId()
        });
        if (bid) {
            Bids.update(bid._id, {$set: {
                value: event.target.value
            }})
        } else {
            Bids.insert({
                userId: Meteor.userId(),
                gameId: gameId,
                revealed: false,
                value: event.target.value
            });
        }
        Meteor.call("revealBids", gameId);
    }
});

Template.userBid.helpers({
    bidValue: function () {
        var bid = Bids.findOne({userId: this._id});
        return bid ? bid.value || "?" : ""
    }
});
