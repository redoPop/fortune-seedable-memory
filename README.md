# Fortune Seedable Memory Adapter [![NPM Version](https://img.shields.io/npm/v/fortune-seedable-memory.svg?style=flat)](https://npmjs.org/package/fortune-seedable-memory) [![CI Status](https://github.com/redoPop/fortune-seedable-memory/workflows/CI/badge.svg?branch=main)](https://github.com/redoPop/fortune-seedable-memory/actions?query=workflow%3ACI+branch%3Amain)
In-memory adapter for [Fortune](https://fortune.js.org/) that can be seeded with data stored in the [JSON Lines](https://jsonlines.org/) format.

## Usage
Install the `fortune-seedable-memory` package from `npm`:
```
$ npm install fortune-seedable-memory
```

Then use it with Fortune:

```js
import fortune from 'fortune';
import seedableAdapter from 'fortune-seedable-memory';

const store = fortune({ ... }, {
  adapter: [seedableAdapter, {
    // Adapter options:
    dbPath: '/path/to/seeds',
  }],
});
```

## Options
- `dbPath`: path to a directory of [JSONL](https://jsonlines.org/) seed files named like `{record type}.jsonl` [(see test fixtures for example)](test/fixtures)

## License
Public domain. For more information, please refer to [unlicense.org](https://unlicense.org/) or to this project's [LICENSE](LICENSE) file.

❤️🐷
