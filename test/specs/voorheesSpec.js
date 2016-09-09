/* eslint-env mocha */
'use strict'

let chai = require('chai')
let sinon = require('sinon')
let sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)

let middleware = require('../../index')
let mockResponse = {'type': 'response'}
let mockRequest = {'type': 'request'}
let mockNext = function () {}

describe('Voorhees', function () {
  beforeEach(function () {
    middleware(mockRequest, mockResponse, mockNext)
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
})
