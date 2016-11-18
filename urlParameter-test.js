//using tape to test: here's an articel I read through before doing this: https://ponyfoo.com/articles/testing-javascript-modules-with-tape
const test = require('tape');
const urlParameter = require('./urlParameter');

var tapSpec = require('tap-spec');

test.createStream()
  .pipe(tapSpec())
  .pipe(process.stdout);

const performanceBenchmark = 5;//ms

speedTest = function(t, fn){
	var start = new Date();
	for (var i = 0; i < 1000; i++) { fn(); }
	var executionTime = new Date() - start;
	t.ok(executionTime < performanceBenchmark, '-- ' + executionTime + 'ms');
};

test('Writing values', function(t){

    t.equal(urlParameter.set('test', 'one', ''), '?test=one', 'Add to blank');
    speedTest(t, () => urlParameter.set('test', 'one', '') );

    var result = urlParameter.set('1', '1', '?2=2');
    t.ok(result == '?1=1&2=2' || result == '?2=2&1=1', 'Add to existing');
    speedTest(t, () => urlParameter.set('1', '1', '?2=2') );

	t.end();
});

test('Reading values', function(t){
	var result = urlParameter.get('1', '?1=thisvalue');
	t.equal(result[0], 'thisvalue', 'Get from 1');
	speedTest(t, () => urlParameter.get('1', '?1=thisvalue') );

	var result = urlParameter.get('1', '?1=1&2=2');
	t.equal(result[0], '1', 'Get from multiple');
	speedTest(t, () => urlParameter.get('1', '', '?1=1&2=2') );

	t.end();
});

test('Clearing values', function(t){
	var result = urlParameter.set('1', '', '?1=1');
	t.equal(result, '', 'Clear from 1');
	speedTest(t, () => urlParameter.set('1', '', '?1=1') );

	var result = urlParameter.set('1', '', '?1=1&2=2');
	t.equal(result, '?2=2', 'Clear from multiple');
	speedTest(t, () => urlParameter.set('1', '', '?1=1&2=2') );
	
	t.end();
});