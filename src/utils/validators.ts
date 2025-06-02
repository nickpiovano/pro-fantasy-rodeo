/**
 * Validates an email address
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates a team name (non-empty, appropriate length)
 */
export const isValidTeamName = (teamName: string): boolean => {
  return teamName.trim().length >= 3 && teamName.trim().length <= 30;
};

/**
 * Validates credit card number (basic format check)
 */
export const isValidCreditCard = (cardNumber: string): boolean => {
  const sanitized = cardNumber.replace(/\s+/g, '').replace(/-/g, '');
  const regex = /^[0-9]{13,19}$/;
  
  if (!regex.test(sanitized)) {
    return false;
  }
  
  // Luhn algorithm for basic card validation
  let sum = 0;
  let shouldDouble = false;
  
  for (let i = sanitized.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitized.charAt(i));
    
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  
  return sum % 10 === 0;
};

/**
 * Validates a credit card expiration date (MM/YY format, not expired)
 */
export const isValidExpiration = (month: string, year: string): boolean => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits
  const currentMonth = currentDate.getMonth() + 1; // 1-12
  
  const expMonth = parseInt(month, 10);
  const expYear = parseInt(year, 10);
  
  // Check format
  if (isNaN(expMonth) || isNaN(expYear)) {
    return false;
  }
  
  // Check month range
  if (expMonth < 1 || expMonth > 12) {
    return false;
  }
  
  // Check if expired
  if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
    return false;
  }
  
  return true;
};

/**
 * Validates CVC code (3-4 digits)
 */
export const isValidCVC = (cvc: string): boolean => {
  const regex = /^[0-9]{3,4}$/;
  return regex.test(cvc);
};

/**
 * Checks if all events have been selected
 */
export const isTeamComplete = (selections: { eventId: string }[], totalEvents: number): boolean => {
  return selections.length === totalEvents;
}; 