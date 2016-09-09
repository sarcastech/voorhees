'use strict'

function Voorhees (req, res) {
  this.view = ''
  this.req = req
  this.res = res
}

Voorhees.prototype = {
  setView: (view) => {
    this.view = view
    return this
  },
  respond: (data) => {
    let res = this.res
    this.req.xhr ? res.json(data) : res.render(this.view, data || {})
  }
}

function middleware (req, res, next) {
  res.voorhees = new Voorhees(req, res)
  next()
}

module.exports = middleware
