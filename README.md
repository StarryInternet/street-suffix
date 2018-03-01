# street-suffix

Utility for expanding and abbreviating US street types from their many abbreviations.

### Instaling
```
npm install --save street-suffix
```

### Examples

#### Expanding Street Types
Expanding a street type abbreviation into it's full USPS suffix street-suffix
```js
let suffix = require('street-suffix');

suffix.expand('st') // STREET
suffix.expand('ave') // AVENUE
suffix.expand('av') // AVENUE
suffix.expand('avenue'); // AVENUE
```

#### Abbreviating Street Types
Abbreviating a street type suffix or abbreviation into it's USPS standard abbreviation
```js
let suffix = require('street-suffix');

suffix.abbreviate('street'); // ST
suffix.abbreviate('avenue'); // AVE
suffix.abbreviate('ave'); // AVE
suffix.abbreviate('av'); // AVE
```

This works for all [standard USPS abbreviations](https://pe.usps.com/text/pub28/28apc_002.htm)
