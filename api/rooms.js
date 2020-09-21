const roomModel = require('../model/rooms');
const turnsModel = require('../model/turns');
const redisClient = require('../lib/redis');
const { ExpectationError } = require('../lib/error');

module.exports = {
    getRoomByUser: function(user_id, cb) {
        redisClient.get('room_' + user_id, function(err, res) {
            if(err || !res) {
                let opts = {
                    user_id: user_id
                };
                return roomModel.getByUser(opts, cb);
            }
            return cb(null, res);
        });
    },
    getNextCard: function(room_id, cb) {
        redisClient.spop('deck_' + room_id, function(err, res) {
            if(err) {
                let opts = {
                    room_id: room_id,
                    col: ['card']
                };
                turnsModel.get(opts, function(err, res) {
                    if(err) {
                        return cb(new ExpectationError('DB Failure: Unexpected error'));
                    }
                    let unusedCards = [];
                    for(let i = 1; i <= 52; i++) {
                        if(!res.includes(i)) {
                            unusedCards.push(i);
                        }
                    }
                    redisClient.sadd('deck_' + room_id, ...unusedCards, function(err, res) {
                        if(err) {
                            return cb(new ExpectationError('Redis Failure: Unexpected error'));
                        }
                        redisClient.spop('deck_' + room_id, cb);
                    });
                });
            }
            return cb(null, res);
        })
    }
}