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
        console.log(tweets.length);
        let query = db.prepare("INSERT INTO tweets VALUES (?,?,?,?,?)");
        await tweets.forEach(async (tw) => {
            const exists = await db.get('SELECT EXISTS(SELECT 1 from tweets WHERE tweet_id=' + tw.tweet_id);
            console.log('TWEET ' + tw.tweet_id + ' in db is ' + exists);
            if (!exists) {
                await query.run(tw.tweet_id, tw.text, tw.created_at, tw.user_name, tw.user_id)
            }
        });

        query.finalize();
        const all = await db.get('SELECT * FROM tweets');
        console.log('select all', all);
    } catch (e) {
        console.log(e)
    }
}

//just get all tweets
async function getAllTweets() {
    try {
        return await db.get('SELECT * FROM tweets');
    } catch (e) {
        console.log('tweet log' + e.message)
        return e;
    }

}

//log them all for debug
async function logAllTweets() {
    try {
        db.each("SELECT * FROM tweets", function (err, row) {
            console.log(row);
            console.log(err);
        });
    } catch (e) {
        console.log('tweet log ' + e.message)
    }
}


module.exports = {
    saveTweets,
    getAllTweets,
    logAllTweets,
    db
};