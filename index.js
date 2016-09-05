'use strict';

function voorhees (viewPath) {
  return function (req, res, data) {
    req.xhr ? res.json(data) : res.render(`${viewPath}`, data);
  };
};

module.exports = voorhees;