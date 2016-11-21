'use strict';

/* Problem:
 * A bunch of different components want to update the url parameters
 * But they don't know about each other.
 * They add, they remove, they do it at crazy times.
 * So we get a long tail of url manipulation.
 *
 * Solution:
 * hold a 'virtual' query string.
 * let the various components update it as much as they want - go mad.
 * Try to push it to history but ... debounce it :D
 */

const urlParameter = require('./urlParameter');
var virtualQueryString = '';

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this,
			args = arguments;
		var later = function() {
			timeout = null;
			if ( !immediate ) {
				func.apply(context, args);
			}
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait || 200);
		if ( callNow ) { 
			func.apply(context, args);
		}
	};
};

var setHistroy = debounce(function(){
	if (typeof window != 'undefined'){
		if (window.history) {
			history.pushState(null, '', window.pathname + virtualQueryString);
		} else {
			console.log('No window.history :(');
		}
	} else {
		console.log('No window to set histroy on :(');
	}
}, 500);

module.exports = {
	get(paramName, isEncoded){
		return urlParameter.get(paramName, virtualQueryString, isEncoded);
	},
	set(paramName, value, isEncoded){
		virtualQueryString = urlParameter.set(paramName, value, virtualQueryString, isEncoded);
		setHistroy();
		return virtualQueryString;
	}
}