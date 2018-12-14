process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');

let twitter = require('../helpers/twitter');

var assert = require('assert');

describe('tweet search', async function () {
    // const query = '#liveperson';
    // const {data: {search_metadata, statuses}} = await twitter.search(query);
    //
    // it('should return list of tweets', function () {
    //     assert.equals(statuses.length > 0, 'true');
    // });
    // it('should have processed the query', function () {
    //     assert.equals(search_metadata.query, '%23liveperson');
    // });
});

