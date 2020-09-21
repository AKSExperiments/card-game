const common = require('./common');
const cardAlloc = require('../api/cardAlloc');

module.exports = function (app) {
    app.get('/v1/api/getRandomCard', common.validateParams, common.validateUser, cardAlloc.getRandom, cardAlloc.calcStreak, common.res, common.error);
}