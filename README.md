# Liveperson Coding Challenge:

by [mewc](https://github.com/mewc)

## Instructions for running

**For already deployed versions:**
[Backend live link](https://lp-tw-backend-challenge.herokuapp.com/)
- endpoints are /twitter, /twitter/api, twitter/db
[Frontend live link:](https://lp-tw-frontend-challenge.herokuapp.com/)

**For manual deploy [standard dev deploy](**
1. clone the repo
1. paste in `.env` file and keys, other values, etc.
1. `yarn install`
1. `yarn start`

Then also run the [front end app](https://github.com/mewc/lp-tw-frontend-challenge) for visualisation.

--

## Client Requirements

### Part 1
 
**Create a NodeJS/Express application that can search Twitter for #liveperson via API's and store the result into a SQL Lite database.** 

This includes:

1. Generate a SQLite database in NodeJS
1. Using NodeJS & Express, call to Twitter API's to search and collect results for any tweets containing #liveperson.
1. Make sure to have proper error handling for if Twitter's API isn't available
1. Error handling if you get an unexpected result
1. Publish these results into an SQLite database via NodeJS using Express for easier handling of the SQLite DB. 
1. Make sure to check that you don't double up on entries and that you have appropriate error handling
1. Build a basic frontend to render the results stored within the SQLite database
 

### Part 2:
 **Explain how the solution fits together and any positives / difficulties you had completing the project.**

### Part 3:
 **Upload the solution to a GitHub repository & provide build instructions/scripts.**

 

### Extras [if you have time]

If you wish to add in functionality feel free, it's not needed for the submission of the core coding challenge. 
Some examples of extras we have seen in the past are:

1. Completed unit tests
1. Angular frontend with results listed and styled
1. Cleanup of code and organisation into classes/prototypes based on collections of related functions.

Again, this is only if you have time, what we are looking for is clean, human readable code that has thought through any considerations that may be needed to write this app.

 

 

### Final Submission Expected Components:

NodeJS script and SQL Lite database delivered VIA a GitHub repository.

Email write-up explaining how the solution fits together and any positives / difficulties you had.


### Author

made by [Michael Carter](https://mewc.info) [mewc](https://github.com/mewc)
 
 
