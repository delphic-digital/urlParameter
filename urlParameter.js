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
	var startSlice = queryString.indexOf(paramName);
	if (startSlice == -1){
		//it's not in there, just return the string
		return queryString;
	}

	//find index of the next &
	var endSlice = queryString.indexOf('&', startSlice);
	if (endSlice == -1) {
		//it's the last / only one!
		return queryString.substr(0, startSlice - 1); //-1 to lop of the preceeding "?" if it's the only one or "&" if it's the last one
	}

	if (endSlice < queryString.length) {
		//we're in the middle, add to end slice so it'll lop off one of the "&"'s
		endSlice++;
	}

	//if we're here - the param is one of many - return the slice before & after the param
	return queryString.substr(0, startSlice) + queryString.substr(endSlice, queryString.length);
}

function formatStringForUrl(unsafeString){
	var safeString = unsafeString.replace(/ /g, '%20');
	return safeString;
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
		if (typeof paramName == 'undefined') {
			return false;
		}

		var queryString = removeQueryFromString(queryString, paramName);
		if (value == "") {
			return queryString;
		}

		//param name and value have passed, so format them 
		var paramName = formatStringForUrl(paramName);
		var value = formatStringForUrl(value);

		//and return the new string!
		var newQuery = addToQueryString(queryString, paramName, value);
		
		//var returnString = newQuery.replace('&&', '&').replace('??', '?').replace('?&', '?');



		return newQuery;
		
	}
}