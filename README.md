# Voorhees
Express module to determine if JSON should assault your client.

## Huh?
Voorhees is an express middleware module that will call the [response](https://expressjs.com/en/4x/api.html#res) object's [json](https://expressjs.com/en/4x/api.html#res.json) or [render](https://expressjs.com/en/4x/api.html#res.render) functions, depending on if the [request](https://expressjs.com/en/4x/api.html#req) object's [xhr](https://expressjs.com/en/4x/api.html#req.xhr) property is either true (will call `json()`) or false (will call `render()`)

## Usage
Voorhees can be applied as middleware for your entire app
```javascript
let express = require('express')
let app = express()
let voorhees = require('voorhees')

app.use(voorhees)
```

Or can be applied to a specific route
```javascript
let express = require('express')
let router = require('express').Router
let voorhees = require('voorhees')

router.use(voorhees)
```

In either case, voorhees applies a property `voorhees` to the response object. This can then be accessed by your route handling code:
```javascript
router.get('/', function (req, res){
  res.voorhees.setView('/path/to/template')
  let sendToClient = res.voorhees.respond()
  sendToClient(res.locals) // or pass whatever data object you choose instead of res.locals
})

// setting view can also be chained
router.get('/other', function (req, res){
  let sendToClient = req.voorhees.setView('/path/to/other/template').respond()
  sendToClient(res.locals) // or pass whatever data object you choose instead of res.locals
})
```