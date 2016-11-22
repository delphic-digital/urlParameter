//using tape to test: here's an articel I read through before doing this: https://ponyfoo.com/articles/testing-javascript-modules-with-tape
const test = require('tape');
const urlParameter = require('./urlParameterHandler');

var tapSpec = require('tap-spec');

test.createStream()
  .pipe(tapSpec())
  .pipe(process.stdout);

test('The Handler: writing values', function(t){
	//queryString = ''
    
    t.equal(urlParameter.set('1', '1', true), '?1=1', 'Add to blank');

    //queryString = '?1=1'
    
    t.equal(urlParameter.set('2', '2', true), '?1=1&2=2', 'Add to existing');

    //query string = '?1=1&2=2'

	t.end();
});

test('The Handler: reading values', function(t){

	t.equal(urlParameter.get('1', true), '1', 'Get from 1');

	t.end();
});

test('The Handler: clearing values', function(t){

	//query string still = '?1=1&2=2'	
	
	t.equal(urlParameter.set('1', '', true), '?2=2', 'Clear from multiple');

	//query string = '?2=2'	

	t.equal(urlParameter.set('2', '', true), '', 'Clear 1');

	//query string = ''	
	
	t.end();
});



test('The Handler: should fail', function(t){
	
	t.notOk(urlParameter.set(), 'Set with no args');
	t.notOk(urlParameter.set(null, null, null, null), 'Set with nulls');
	t.notOk(urlParameter.set(undefined, undefined, undefined, undefined), 'Set with undefineds');
	t.notOk(urlParameter.set({}, {}, {}, {}), 'Set with empty objects');

	t.notOk(urlParameter.get(), 'Get with no args');
	t.notOk(urlParameter.get(null, null, null, null), 'Get with nulls');
	t.notOk(urlParameter.get(undefined, undefined, undefined, undefined), 'Get with undefineds');
	t.notOk(urlParameter.get({}, {}, {}, {}), 'Get with empty objects');

	t.end();
});