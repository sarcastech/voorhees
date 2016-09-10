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
let mockRequest = {'type': 'request'}
let mockNext = function () {}

describe('Voorhees', function () {
  beforeEach(function () {
    sinon.spy(mockResponse, 'json')
    sinon.spy(mockResponse, 'render')
    middleware(mockRequest, mockResponse, mockNext)
  })

  afterEach(function () {
    mockResponse.json.restore()
    mockResponse.render.restore()
    delete mockResponse.voorhees
  })

  describe('instance', function () {
    it('should attach to express response object', function () {
      mockResponse.voorhees.should.exist
    })

    it('should apply express request/response objects to voorhees object', function () {
      mockResponse.voorhees.req.should.eql(mockRequest)
      mockResponse.voorhees.res.should.eql(mockResponse)
    })
  })

  describe('#setView', function () {
    it('should return voorhees object', function () {
      let returnValue = mockResponse.voorhees.setView('blank')
      returnValue.should.eql(mockResponse.voorhees)
    })

    it('should set internal "view" property with value of argument', function () {
      mockResponse.voorhees.setView('viewPath')
      mockResponse.voorhees.view.should.eql('viewPath')
    })
  })

  describe('#respond', function () {
    describe('when request done via ajax', function () {
      it('should implement "json" function of response', function () {
        mockRequest.xhr = true
        mockResponse.voorhees.respond({})
        mockResponse.json.should.have.been.called
      })
    })

    describe('when request done via http get/post/etc', function () {
      it('should implement "render" function of response', function () {
        mockRequest.xhr = false
        mockResponse.voorhees.respond({}, 'foo')
        mockResponse.render.should.have.been.called
      })
    })
  })
})
