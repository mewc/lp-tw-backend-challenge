var axios = require('axios');
const twitter = require('../helpers/twitter');
const dbHelper = require('../helpers/db');

async function getTweets(req, res, next) {
    let searchResults = null;
    let tweets = [];
    try {
        searchResults = await twitter.search('#liveperson');  //hardcoding this for challenge sake
        for (let i = 0; i < searchResults.statuses.length - 1; i++) {
            const {id: tweet_id, created_at, text, user: {id: user_id, name}} = searchResults.statuses[i];
            console.log(tweet_id, user_id);
            tweets.push({tweet_id, created_at, tweet: text, user: {user_id, user_name: name}});
        }
    }catch(err){
        res.status(500).json({error: 'unable to access twitter - try again later'})
    }


    try {
        const isSaved = await dbHelper.saveTweets(tweets);
        res.status(200).json(tweets);
    } catch (err) {
        res.status(206).json(tweets);
        console.log(err.message)

    }
}


module.exports = {
    getTweets
};