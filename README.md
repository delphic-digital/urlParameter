# urlParameter

"Pure" utility for playing with URL parameters

[![Build Status](https://travis-ci.org/delphic-digital/urlParameter.svg?branch=master)](https://travis-ci.org/delphic-digital/urlParameter)

##Developing

 - `npm install`
 - `npm test`

##Using

 - `urlParameter.get(<parameter name>, <query string>)` Returns an array of string values
 - `urlParameter.set(<parameter name>, <parameter value>, <query string>)` Returns a new parameter string (pass an empty value to clear a parameter)