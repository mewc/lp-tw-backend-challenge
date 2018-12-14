require('dotenv').config();
const axios = require('axios');

const tw_search_endpoint = 'https://api.twitter.com/1.1/search/tweets.json';
const tw_gettweet_endpoint = 'https://api.twitter.com/1.1/statuses/show.json';
let twitter = axios.create({
    headers: {
        'Authorization': 'Bearer ' + process.env.TW_BEARER_TOKEN,
        'Content-Type': 'application/json'
    }
});

async function search(q) {
    const params = '?q=' + escape(q);
    return await twitter.get(tw_search_endpoint + params)
        .then((response) => {
            return response.data;
        })
        .catch(err => {
            console.log('err');
            return err;
        })


}

async function getTweet(id) {
    const params = '?q='+id;
    return await twitter.get(tw_gettweet_endpoint + params)
        .then((response) => {
            return response.data;
        })
        .catch(err => {
            console.log('err');
            return err;
        })


}


module.exports = {
    search
};