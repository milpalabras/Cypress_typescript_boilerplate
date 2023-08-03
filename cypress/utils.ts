/**
 * This method will add a char at the begin of a string.
 * @param str: string to be modified
 * @param char: char to be added at the begin of the string
 * @example addCharAtFirst('IDlogin', '#') => '#IDlogin''
 */
export function addCharAtFirst(str: string, char: string): string {
  return str.startsWith(char) ? str : `${char}${str}`
}

/**
 * This method generate a random string of chars.
 * @param string_length lenght of the string to be generated
 * @returns return a random string of chars
 * @example generateRandomWords(5) => 'ABCDE'
 */

export function generateRandomWords(string_length: number): string {
  let random_string = ''
  let random_ascii
  let ascii_low = 65
  let ascii_high = 90
  for (let i = 0; i < string_length; i++) {
    random_ascii = Math.floor(Math.random() * (ascii_high - ascii_low) + ascii_low)
    random_string += String.fromCharCode(random_ascii)
  }
  return random_string
}
