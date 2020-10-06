declare module 'namor' {
  export interface GenerateOptions {
    /**
     * The number of words to include in the generated name. Must be a positive integer no higher than 4.
     * @default 2
     */
    words: number
    /**
     * The number of digits in the random trailing number. Must be a positive integer or 0 to exclude a trailing number.
     * @default 2
     */
    numbers: number
    /**
     * The character to use between words when generating a name (will default to pipe-cased-strings).
     * @default -
     */
    char: string
    /**
     * Whether to enable manly mode, which will generate names of a rugged nature. Be aware this limits the number of dictionary words, creating a higher chance of collision.
     * @default false
     */
    manly: boolean
  }

  /**
   * Generates a new name, in all its glory.
   * @param options
   */
  export function generate(options?: Partial<GenerateOptions>): string


  export interface IsValidOptions {
    /**
     * Whether to check the name against the reserved word list, which is a predefined set of subdomains that should remain private.
     * @default false
     * @link https://github.com/jsonmaur/namor/blob/master/data/reserved.txt
     */
    reserved: boolean
  }

  /**
   * Checks whether a name is a valid for use as a subdomain. Can also check the name against a reserved word list to prevent malicious subdomains.
   * @param name - The name to check.
   * @param options 
   * @link https://github.com/jsonmaur/namor/blob/master/data/reserved.txt
   */
  export function isValid(name: string, options?: Partial<IsValidOptions>): boolean
}
