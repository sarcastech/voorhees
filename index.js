'use strict'

function voorhees (req, res, next) {
  res.voorhees = function (data, view) {
    req.xhr ? res.json(data) : res.render(view, data || {})
  }
  next()
}

module.exports = voorhees
