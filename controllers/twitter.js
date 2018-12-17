var axios = require('axios');
const twitter = require('../helpers/twitter');
const dbHelper = require('../helpers/db');

async function getTweetsFromApi(req, res, next) {
    let searchResults = null;
    let tweets = [];
    try {
        searchResults = await twitter.search('#liveperson');  //hardcoding this for challenge sake
        for (let i = 0; i < searchResults.statuses.length - 1; i++) {
            const {id: tweet_id, created_at, text, user: {id: user_id, name}} = searchResults.statuses[i];
            tweets.push({tweet_id, created_at, tweet: text, user_id, user_name: name});
        }
    } catch (err) {
        res.status(503).json({error: {message: 'unable to reach twitter, try again ', code: 400}});
    }


    try {
        await dbHelper.saveTweets(tweets);
        res.status(200).json(tweets);
    } catch (err) {
        res.status(206).json(tweets);
        console.log(err.message)

    }
}

async function getTweetsFromDb(req, res, next) {
    try {
        await dbHelper.get('*',res)
    } catch (e) {
        res.status(503).json({error: {message: 'unable to reach db, try again soon or restart app', code: 400}});
        console.log(e.message);
    }
}


module.exports = {
    getTweetsFromApi,
    getTweetsFromDb
};