# urlParameter

"Pure" utility for playing with URL parameters

[![Build Status](https://travis-ci.org/delphic-digital/urlParameter.svg?branch=master)](https://travis-ci.org/delphic-digital/urlParameter)

##Developing

 - `npm install`
 - `npm test`

##Using

```javascript
urlParameter.get(<parameter-name:string>, <query-string:string>, <is-encoded:boolean optional>)
```

- Looks in `query-string` for the value of parameter-name
- If `*is-encoded*`, it will skip encoding parameter-name
- Returns a String

```javascript
urlParameter.set(<*parameter-name*:string>, <*parameter-value*:string>, <*query-string*:string>, <*is-encoded*:boolean optional>)
```

- Adds `"*parameter-name*=*parameter-value*"` to `*query-string*` 
- If `*parameter-name*` is already set, it'll be overwritten
- If `*is-encoded*` it'll skip encoding `*parameter-name*` and `*parameter-value*`
- Returns a String

`*query-string*` should always be encoded. If you pull from `window.location` or build it with this utility you'll be golden.