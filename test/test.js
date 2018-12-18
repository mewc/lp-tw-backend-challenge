process.env.NODE_ENV = 'test';

let chai = require('chai');
let expect = chai.expect;
let chaiHttp = require('chai-http');

let twitter = require('../helpers/twitter');
let db = require('../helpers/db');
var assert = require('assert');


const query = '#liveperson';

describe('Tweets', function() {
    describe('#search()', function() {
        it('should return list of tweets', async function () {
            const data = await twitter.search(query);
            expect(data.statuses.length).to.greaterThan(0);
        });
        it('should have processed the query', async function () {
            const data = await twitter.search(query);
            expect(data.search_metadata.query).to.equal('%23liveperson');
        });
    });
});
