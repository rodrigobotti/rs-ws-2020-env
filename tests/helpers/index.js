const chai = require('chai')
const promised = require('chai-as-promised')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(promised)
chai.use(sinonChai)
chai.should()

global.expect = chai.expect
global.assert = chai.assert
global.sinon = sinon
