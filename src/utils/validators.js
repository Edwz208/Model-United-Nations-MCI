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
    return integer >= 0 && Number.isInteger(integer)
      }
    
export const validateOptionSelected = (option) => {
    if (!option) return false
    return true
  }

export const validateFileExists = (file) => {
    return file !== null && file !== undefined;
}