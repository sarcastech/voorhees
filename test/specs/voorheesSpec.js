/* eslint-env mocha */
'use strict'

let chai = require('chai')
let sinon = require('sinon')
let sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)

let middleware = require('../../index')
let mockResponse = {
  'type': 'response',
  'json': function () {},
  'render': function () {}
}
let mockAjaxRequest = {'xhr': true}
let mockNext = sinon.spy()

describe('Voorhees', function () {
  beforeEach(function () {
    sinon.spy(mockResponse, 'json')
    sinon.spy(mockResponse, 'render')
    middleware(mockAjaxRequest, mockResponse, mockNext)
  })

  afterEach(function () {
    mockResponse.json.restore()
    mockResponse.render.restore()
    delete mockResponse.voorhees
  })

  describe('middleware', function () {
    it('should attach to express response object', function () {
      mockResponse.voorhees.should.exist
    })
    it('should call the "next" function', function () {
      mockNext.should.have.been.called
    })
  })

  describe('#respond', function () {
    let view = 'foo'
    let data = {'bar': 'baz'}

    it('should respond with JSON if ajax request', function () {
      mockResponse.voorhees.respond(view, data)
      mockResponse.json.should.have.been.calledWith(data)
    })

    it('should respond with HTML if not ajax request', function () {
      middleware({}, mockResponse, mockNext)
      mockResponse.voorhees.respond(view, data)
      mockResponse.render.should.have.been.calledWith(view, data)
    })
  })
})
