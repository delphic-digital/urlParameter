'use strict';

function addToQueryString(queryString, paramName, value){
	if (queryString.length > 0) {
		//there's something in the querystring, I'm going to assume it's a properly formed parameter
		return queryString + '&' + paramName + '=' + value;
	} else {
		//guess there's nothing there, no need to '&'
		return '?' + paramName + '=' + value;			
	}
}

function removeQueryFromString(queryString, paramName){

	//find the index of paramName
	var paramIndex = queryString.indexOf(paramName);
	if (paramIndex == -1){
		//it's not in there, just return the string
		return queryString;
	}

	var startSlice = paramIndex;
	//find index of the next &
	var endSlice = queryString.indexOf('&', startSlice);
	if (endSlice == -1) {
		endSlice = queryString.length;
	}

	//remove the given param from the url
	var slicedOut = queryString.substr(0, startSlice) + queryString.substr(endSlice, queryString.length);
	return slicedOut.replace('&&', '&');
}

module.exports = {
	get: function(key, queryString){
		//Get returns an array of values from the passed in string
		//find the key in here and return it's value
		var queryString = decodeURI(queryString.substr(1));

		try {
			var paramArray = queryString.split('&');
			
			for (var i = 0; i < paramArray.length; i++) {
				var keyValuePair = paramArray[i].split('=');
				//[0] will now be the filter name, [1] will be a string of all it's values
				if (keyValuePair[0] == key) {
					if (keyValuePair.length > 1) {
						return keyValuePair[1].split(',');
					} else {
						console.log('empty url parameter: ', keyValuePair);
					}
				}
			}
		}
		catch(err) {
			console.error('urlParam err: ', err);
			return false;
		}
	},

	set: function(paramName, value, queryString){
		//set adds a query to a given query string and returns the new query string
		var query = queryString.substring(1);
		
		if (paramName.length > 0) {
			var paramName = paramName.replace(/ /g, '%20');

			var cleanQueryString = removeQueryFromString(query, paramName);

			if (value == "") {
				//remove the query
				var newQuery = cleanQueryString;
			} else {
				var newQuery = addToQueryString(cleanQueryString, paramName, value);
			}
			var returnString = newQuery.replace('&&', '&').replace('??', '?').replace('?&', '?');

			if (returnString[0] == '?') {
				returnString = returnString.substring(1);
			}

			if (returnString[0] == '&') {
				returnString = returnString.substring(1);
			}

			if (returnString == '') {
				return returnString;
			} else {
				return '?' + returnString;
			}
		} else {
			return virtualLocation.search;
		}
	}
}