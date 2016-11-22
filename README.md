# urlParameter

A "Pure" utility for playing with URL parameters.

[![Build Status](https://travis-ci.org/delphic-digital/urlParameter.svg?branch=master)](https://travis-ci.org/delphic-digital/urlParameter)

Pluck it from urlParameter.js and drop it whereveer you need it. It's not holy and untouchable! The tests and handler files are just icing.

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

##urlParameterHandler

*Problem:*  
A bunch of different components want to update the url parameters.  
But they don't know about each other.  
They add, they remove, they do it at crazy times.  
So we get a long flase history of url changes.

*Solution:*  
Hold a 'virtual' query string.  
Let the various components update it as much as they want - go mad.  
With every change, try to push it to history but ... debounce it :D  

It has almost the same interface as the urlParameter component, but without `query-string`. The whole point of this componenet is to handle the string for you. It also requires `window.history` to be available in the global namespace. So this is not a "pure" function, which seemed a good enough reason to split it out from `urlParameter`. I hope you'll agree!

```javascript
urlParameterHandler.get(<parameter-name:string>, <is-encoded:boolean optional>);
```

```javascript
urlParameterHandler.set(<parameter-name:string>, <parameter-value:string>, <is-encoded:boolean optional>);
```