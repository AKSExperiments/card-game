const room = require('./rooms');
const ExpectationError = require('../lib/error').ExpectationError;

function cardStrength(card_number) {
    return card_number % 13 ? card_number % 13: 13;
}

module.exports = {
    getRandom: function(req, res, next) {
        const user_id = req.cookies.user;
        // get current user's room
        room.getRoomByUser(user_id, function(err, room_id) {
            if(err || !room_id) {
                return next(new ExpectationError(err || 'No active room'));
            }
            // get random card from room's deck
            room.getNextCard(room_id, function(err, result) {
                if(err || !res) {
                    return next(new Error(err || 'Something went wrong!'));
                }
                // res == card_number
                req.data = {
                    cardNumber: result.card
                }
                let opts = {
                    player_id: user_id,
                    room_id: room_id
                }
                turns.insert(opts, function(err, res) {
                    if(err || !res) {
                        // room.insertCardBack(room_id, result.card, function(err, res) {
                        //     if(err || !res) {
                        //         return next(new Error('Something went wrong!'));
                        //     }
                        //     return next(new Error('DB Failure: turns cannot be updated'));
                        // });
                    }
                    return next();
                });
            })

        })
    },
    calcStreak: function(req, res, next) {
        const user_id = req.cookies.user;
        // get last streak
        turns.getStreakAndLastCard(user_id, function(err, result) {
            const lastCard = cardStrength(result.card);
            const currentCard = cardStrength(req.data.cardNumber);
            // update current streak
            turns.updateStreakAndLastCard(user_id, currentCard, currentCard > lastCard ? result.streak+1: 1, function(err, res) {
                if(err || !res) {
                    return next(new Error('Redis failure: Failure in updating streak'));
                }
                if(result.streak == 4) {
                    req.data.won = 1;
                }
                return next();
            });
        })
    }
}