# cordlr-help [![NPM version](https://badge.fury.io/js/cordlr-help.svg)](https://npmjs.org/package/cordlr-help) [![Build Status](https://travis-ci.org/seanc/cordlr-help.svg?branch=master)](https://travis-ci.org/seanc/cordlr-help)

> Cordlr help plugin

## Installation

```sh
$ cordlr install cordlr-help
```

Then add it to your config.

```js
{
  "plugins": [
    "cordlr-help"
  ],
  "help": {
    "format": "Command: {{command}}\n\tUsage: {{prefix}}{{usage}}", // How should the list be formatted
    "scope": ["channel"], // Where should the bot send the list
    "unknown": "Command {{command}} does not exist" // How should the bot respond if a specific command cannot be found
  },
}
```

## Usage

```
help [command]
```

## License

MIT © [Sean Wilson](https://imsean.me)
