export function validateEmail(email) {
  const regex = /^[a-z0-9.\-_]+@[a-z]+\.[a-z]{2,3}$/;
  
  return regex.test(email);
}

export function validatePhoneNumber(number) {
  const regex = /^6[5-9]+[0-9]{7}$/

  return regex.test(number.toString())
}