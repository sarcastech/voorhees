'use strict'

module.exports = function (req, res, next) {
  res.voorhees = {
    respond: function (view, data) {
      req.xhr ? res.json(data) : res.render(view, data)
    }
  }
  next()
}
