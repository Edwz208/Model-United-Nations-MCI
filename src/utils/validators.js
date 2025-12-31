export const validateCountry = (country) => {
    const countryRegex = /^[a-zA-Z0-9]{1,30}$/;
    return countryRegex.test(country) && country.length >= 1 && country.length <= 30;
}

export const validateCode = (code) => {
    return code.length >= 1
}

export const validateCharMin = (str) => {
    return str.length >= 3;
  }

export const validatePosInteger = (integer) => {
  try {
    const integer_as_int = parseInt(integer)
    return integer_as_int >= 0
  }
  catch {
    return false
  }
      }
    
export const validateOptionSelected = (option) => {
    if (!option) return false
    return true
  }

export const validateFileExists = (file) => {
    return file !== null && file !== undefined;
}