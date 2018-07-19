const fizzbuzz = require('./fizzbuzz')

describe('FizzBuzz', () => {

  it('return "n" if can not be divided by 3 or 5', () => {
    expect(fizzbuzz(1)).toEqual('1')
    expect(fizzbuzz(2)).toEqual('2')
    expect(fizzbuzz(4)).toEqual('4')
  })

  it('return "fizz" if can be divided by 3', () => {
    expect(fizzbuzz(3)).toEqual('fizz')
    expect(fizzbuzz(6)).toEqual('fizz')
    expect(fizzbuzz(9)).toEqual('fizz')
  })

  it('return "buzz" if can be divided by 5', () => {
    expect(fizzbuzz(5)).toEqual('buzz')
    expect(fizzbuzz(10)).toEqual('buzz')
  })

  it('return "fizzbuzz" if can be divided by 15', () => {
    expect(fizzbuzz(15)).toEqual('fizzbuzz')
  })
})
