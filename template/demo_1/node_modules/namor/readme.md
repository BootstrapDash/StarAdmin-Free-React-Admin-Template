<div align="center">
    <br>
    <img src="https://raw.githubusercontent.com/jsonmaur/namor/master/assets/logo.png">
    <br> <br> <br>
    <a href="https://travis-ci.org/jsonmaur/namor"><img src="https://travis-ci.org/jsonmaur/namor.svg?branch=master" alt="Build Status"></a>
    <a href="https://coveralls.io/github/jsonmaur/namor?branch=master"><img src="https://coveralls.io/repos/github/jsonmaur/namor/badge.svg?branch=master" alt="Coverage Status"></a>
    <br> <br> <br>
</div>

A name generator for Node that generates random, url-friendly names. This comes in handy if you need to generate unique subdomains (like Heroku does), or unique names for anything else. It can check against a reserved word list to prevent malicious subdomains, and if manly mode is enabled (for those who understand its importance), only names of a rugged nature will be generated.

> *Please Note: Generated names are not always guaranteed to be unique. To reduce the chances of collision, you can increase the length of the trailing number ([see here for collision stats](#collision)). Always be sure to check your database before assuming a generated value is unique.*

## Getting Started

```bash
$ npm install namor --save
```

```javascript
const namor = require('namor')

/* defaults to two words and 2 trailing numbers */
const name = namor.generate()

/* generate with 3 words and no numbers */
const name = namor.generate({ words: 3, numbers: 0 })

/* generate manly names */
const name = namor.generate({ manly: true })
```

[See it in action here](https://namor-example-mlcpnkahch.now.sh/?words=2&numbers=2) or [experience manly mode](https://namor-example-mlcpnkahch.now.sh/?manly=true).

<a name="collision"></a>
## Collision Stats

The following stats give you the total number of permutations based on the word count, and can help you make a decision on how many trailing numbers you should use for uniqueness. This data is based on the number of words we currently have in our [dictionary files](data/).

- 1-word combinations: 1,319
- 2-word combinations: 3,016,553
- 3-word combinations: 1,720,200,230
- 4-word combinations: 2,268,944,103,370

##### Manly Mode

- 1-word combinations: 282
- 2-word combinations: 110,826
- 3-word combinations: 9,487,044
- 4-word combinations: 2,675,346,408

## API

### .generate (options:Object)

Generates a new name, in all its glory.

- **options**
  - **words** - The number of words to include in the generated name. Must be a positive integer no higher than 4.

    > Type: `integer`  
    > Default: `2`

  - **numbers** - The number of digits in the random trailing number. Must be a positive integer or `0` to *exclude* a trailing number.

    > Type: `integer`  
    > Default: `2`

  - **char** - The character to use between words when generating a name (will default to pipe-cased-strings).

    > Type: `string`  
    > Default: `-`

  - **manly** - Whether to enable manly mode, which will generate names of a rugged nature. Be aware this limits the number of dictionary words, creating a higher chance of collision.

    > Type: `boolean`  
    > Default: `false`

### .isValid (name:String, options:Object)

Checks whether a name is a valid for use as a subdomain. Can also check the name against a [reserved word list](data/reserved.txt) to prevent malicious subdomains.

- **name** - The name to check.

  > Type: `string`

- **options**
  - **reserved** - Whether to check the name against the [reserved word list](data/reserved.txt), which is a predefined set of subdomains that should remain private.

    > Type: `boolean`  
    > Default: false

## License

[MIT](license) © [Jason Maurer](http://maur.co)
