# urlParameter

"Pure" utility for playing with URL parameters

[![Build Status](https://travis-ci.org/delphic-digital/urlParameter.svg?branch=master)](https://travis-ci.org/delphic-digital/urlParameter)

##Developing

 - `npm install`
 - `npm test`

##Using

For now, just copy the code from urlParaeter.js into your project wherever makes sense and reformat it to match whatever system is in use. This one is defined as an es6 module but it wouldn't take much tweaking to turn it into a require module or something else.

Note, for both functions below `query-string` should always be encoded. If you pull from `window.location` or build it with this utility you'll be golden.

###Get a value from a query string

```javascript
urlParameter.get(<parameter-name:string>, <query-string:string>, <is-encoded:boolean optional>)
```

- Looks in `query-string` for the value of parameter-name
- If `is-encoded`, it will skip encoding parameter-name
- Returns a String

###Set a value in a query string

```javascript
urlParameter.set(<parameter-name:string>, <parameter-value:string>, <query-string:string>, <is-encoded:boolean optional>)
```

- Adds `"parameter-name=parameter-value"` to `query-string` 
- If `parameter-name` is already set, it'll be overwritten
- If `is-encoded` it'll skip encoding `parameter-name` and `parameter-value`
- Returns a String
