# cordlr-help [![NPM version](https://badge.fury.io/js/cordlr-help.svg)](https://npmjs.org/package/cordlr-help) [![Build Status](https://travis-ci.org/seanc/cordlr-help.svg?branch=master)](https://travis-ci.org/seanc/cordlr-help)

> Cordlr help plugin

## Installation

```sh
$ cordlr install cordlr-help
```

Then add it to your config.

```json
{
  "plugins": [
    "cordlr-help"
  ],
  "help": {
    "format": "Command: {{name}}\n\tUsage: {{prefix}}{{usage}}",
    "scope": ["channel"]
  }
}
```

## Usage

```
help [command]
```

## License

MIT © [Sean Wilson](https://imsean.me)
