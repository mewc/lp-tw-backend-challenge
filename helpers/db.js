const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data/tweets.db', (err) => {
    if (err) {
        return console.error(err.message);
    } else {
        console.log('Connection to the SQlite database successful.');
        db.serialize(() => {
            try {
                db.run("CREATE TABLE IF NOT EXISTS tweets (\n" +
                    "\ttweet_id integer PRIMARY KEY UNIQUE,\n" +
                    "\ttweet text NOT NULL,\n" +
                     "\tcreated_at text NOT NULL,\n" +
                    "\tuser_name text NOT NULL,\n" +
                    "\tuser_id text NOT NULL\n" +
                    ");"
                );
                console.log('db has been initialised (if it didnt already exist)');
            } catch (err) {
                console.error('init error: ' + err.message);
            }
        });
    }
});

//Save array of tweets we get, check for uniques
async function saveTweets(tweets) {
    try {
        tweets.forEach((t) => {
            db.run('INSERT INTO tweets VALUES (?,?,?,?,?);',
                [t.tweet_id, t.tweet, t.created_at, t.user.user_name, t.user.user_id],
                (err) => {
                    if (err) {
                        console.log(err.message)
                    }
                })
        })
    } catch (e) {
        console.log(e)
    }
}

//just get all tweets
async function get(param,res) {
    db.all('SELECT '+param+' FROM tweets;', [],
        (err, rows) => {
        if(err){console.log(err.message)}
            console.log(rows);
            res.send(rows)
        });
}




module.exports = {
    saveTweets,
    get,
};