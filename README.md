# urlParameter

"Pure" utility for playing with URL parameters

[![Build Status](https://travis-ci.org/delphic-digital/urlParameter.svg?branch=master)](https://travis-ci.org/delphic-digital/urlParameter)

##Developing

 - `npm install`
 - `npm test`

##Using

 - `urlParameter.get(<parameter-name:string>, <query-string:string>, <is-encoded:boolean optional>)` 
	- Pass the query string and the name of the parameter you want to know
	- If you pass `is-encoded` as true, it will skip any encoding steps and give you a teeny boost in performance
 	- Returns a string for the value of your parameter or false if it doesn't exist
 - `urlParameter.set(<parameter-name:string>, <parameter-value:string>, <query-string:string>, <is-encoded:boolean optional>)` 
 	- Pass the name and value you want to be set and the query string you want it to be set in.
 	- If that parameter is already set it will be overwritten by your new value (if you're manipulating a list value, handle that yourself)
 	- `is-encoded` same as above
 	- If `parameter-value` is blank the parameter will be removed from the query string
 	- Returns a query string with your update

`query-string` should always be encoded. If you pull from `window.location` or build it with this utility you'll be golden.