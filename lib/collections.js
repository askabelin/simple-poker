Games = new Meteor.Collection("games");
Bids = new Meteor.Collection("bids");

var authorOrRevealed = function (userId, bid) {
    return bid.userId == userId && !bid.revealed;
};

Bids.allow({
    insert: authorOrRevealed,
    update: authorOrRevealed
});
