const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  test('convertHandler should correctly read a whole number input', function(done) {
    const input = '32L';
    assert.equal(convertHandler.getNum(input), 32);
    done();
  });
  
  test('convertHandler should correctly read a decimal number input', function(done) {
    const input = '3.1mi';
    assert.equal(convertHandler.getNum(input), 3.1);
    done();
  });
  
  test('convertHandler should correctly read a fractional input', function(done) {
    const input = '1/2km';
    assert.equal(convertHandler.getNum(input), 0.5);
    done();
  });
  
  test('convertHandler should correctly read a fractional input with a decimal', function(done) {
    const input = '5.4/3lbs';
    assert.equal(convertHandler.getNum(input), 1.8);
    done();
  });
  
  test('convertHandler should correctly return an error on a double-fraction', function(done) {
    const input = '3/2/3kg';
    assert.equal(convertHandler.getNum(input), 'invalid number');
    done();
  });
  
  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function(done) {
    const input = 'kg';
    assert.equal(convertHandler.getNum(input), 1);
    done();
  });
  
  test('convertHandler should correctly read each valid input unit', function(done) {
    const inputs = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    inputs.forEach(function(input) {
      assert.equal(convertHandler.getUnit(input), input === 'L' ? 'L' : input);
    });
    done();
  });
  
  test('convertHandler should correctly return an error for an invalid input unit', function(done) {
    const input = '32g';
    assert.equal(convertHandler.getUnit(input), 'invalid unit');
    done();
  });
  
  test('convertHandler should return the correct return unit for each valid input unit', function(done) {
    const inputs = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    const expected = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
    inputs.forEach(function(input, i) {
      assert.equal(convertHandler.getReturnUnit(input), expected[i]);
    });
    done();
  });
  
  test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function(done) {
    const inputs = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    const expected = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
    inputs.forEach(function(input, i) {
      assert.equal(convertHandler.spellOutUnit(input), expected[i]);
    });
    done();
  });
  
  test('convertHandler should correctly convert gal to L', function(done) {
    const input = [5, 'gal'];
    const expected = 18.9271;
    assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
    done();
  });
  
  test('convertHandler should correctly convert L to gal', function(done) {
    const input = [5, 'L'];
    const expected = 1.32086;
    assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
    done();
  });
  
  test('convertHandler should correctly convert mi to km', function(done) {
    const input = [5, 'mi'];
    const expected = 8.0467;
    assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
    done();
  });
  
  test('convertHandler should correctly convert km to mi', function(done) {
    const input = [5, 'km'];
    const expected = 3.10686;
    assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
    done();
  });
  
  test('convertHandler should correctly convert lbs to kg', function(done) {
    const input = [5, 'lbs'];
    const expected = 2.26796;
    assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
    done();
  });
  
  test('convertHandler should correctly convert kg to lbs', function(done) {
    const input = [5, 'kg'];
    const expected = 11.02312;
    assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
    done();
  });

});
