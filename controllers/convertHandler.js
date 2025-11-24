function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    
    // Find the index where the unit starts (first letter)
    let numString = input.match(/[^a-zA-Z]+/);
    
    if (!numString) {
      // No number provided, default to 1
      return 1;
    }
    
    numString = numString[0];
    
    // Check for double fraction (e.g., 3/2/3)
    const fractionCount = (numString.match(/\//g) || []).length;
    if (fractionCount > 1) {
      return 'invalid number';
    }
    
    // Handle fraction
    if (numString.includes('/')) {
      const parts = numString.split('/');
      const numerator = parseFloat(parts[0]);
      const denominator = parseFloat(parts[1]);
      
      if (isNaN(numerator) || isNaN(denominator) || denominator === 0) {
        return 'invalid number';
      }
      
      result = numerator / denominator;
    } else {
      result = parseFloat(numString);
      
      if (isNaN(result)) {
        return 'invalid number';
      }
    }
    
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    
    // Extract the unit (letters at the end)
    let unitMatch = input.match(/[a-zA-Z]+$/);
    
    if (!unitMatch) {
      return 'invalid unit';
    }
    
    let unit = unitMatch[0].toLowerCase();
    
    // Valid units
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    
    if (!validUnits.includes(unit)) {
      return 'invalid unit';
    }
    
    // Return L as uppercase, others as lowercase
    result = unit === 'l' ? 'L' : unit;
    
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    
    const unitMap = {
      'gal': 'L',
      'L': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
    
    result = unitMap[initUnit];
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    
    const unitNames = {
      'gal': 'gallons',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    
    result = unitNames[unit];
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    switch(initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
    }
    
    // Round to 5 decimal places
    result = Math.round(result * 100000) / 100000;
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    
    const initUnitString = this.spellOutUnit(initUnit);
    const returnUnitString = this.spellOutUnit(returnUnit);
    
    result = `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
