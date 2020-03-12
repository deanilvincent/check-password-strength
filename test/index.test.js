const app = require('../index')
const assert = require('chai').assert

describe('Index test', () => {
    it("Should return strength id 2 if password is strong", () => {
        assert.equal(app('Asdf12343!').id, 2)
    })

    it("Should return strength id 1 if password is medium", () => {
        assert.equal(app('Asdf1234').id, 1)
    })

    it("Should return strength id 0 if password is weak", () => {
        assert.equal(app('a').id, 0)
    })

    it("Should return strength value 'Strong' if password is strong", () => {
        assert.equal(app('Asdf12343!').value, 'Strong')
    })

    it("Should return strength value 'Medium' if password is medium", () => {
        assert.equal(app('Asdf1234').value, 'Medium')
    })

    it("Should return strength value 'Weak' if password is weak", () => {
        assert.equal(app('a').value, 'Weak')
    })

    it("Should return type of number if request for id", () => {
        assert.typeOf(app('a').id, 'number')
    })

    it("Should return type of string if request for value", () => {
        assert.typeOf(app('a').value, 'string')
    })
    
    it("Should return type of object if requesting directly from the function", () => {
        assert.typeOf(app('a'), 'object')
    })

    it("Should return undefined if password parameter is empty", () => {
        assert.equal(app(), undefined)
    })
})