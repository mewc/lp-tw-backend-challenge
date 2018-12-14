var axios = require('axios');
const twitter = require('../helpers/twitter');

async function getTweets(req, res, next) {
    let searchResults = null;
    try {
        searchResults = await twitter.search('#liveperson');  //hardcoding this for challenge sake
        let tweets = [];
        for (let i = 0; i < searchResults.statuses.length - 1; i++) {
            const {id: tweet_id, created_at, text, user: {id: user_id, name}} = searchResults.statuses[i];
            console.log(tweet_id, user_id);
            tweets.push({tweet_id, created_at, text, user: {user_id, name}});
        }
        res.status(200).json(tweets)
    } catch (err) {
        console.log(err.message)
    }


}

module.exports = {
    getTweets
};