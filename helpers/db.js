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
        tweets.forEach((t) => {
            db.run('INSERT INTO tweets VALUES (?,?,?,?,?);',
                [t.tweet_id, t.tweet, t.created_at, t.user.user_name, t.user.user_id],
                (err)=>{
                if(err){console.log(err)}
            })
        })

    } catch (e) {
        console.log(e)
    }
}

//just get all tweets
async function getAll() {
    let t = [];
    try {
        await db.each('SELECT * FROM tweets',
            (err, row) => {
                if(err){throw err}
                t.push(row)
        });
    } catch (e) {
        console.log('tweet log' + e.message);
        return e;
    }
    return t;
}


module.exports = {
    saveTweets,
    getAll,
    db
};