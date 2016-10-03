const resolve = require('resolve-cwd');
const pixie = require('pixie');

function help(bot, config) {
  config.plugins.splice(config.plugins.indexOf('cordlr-help'), 1);
  const plugins = config.plugins.map(p => require(resolve(p)));
  const commands = plugins.filter(p => p.command && p.usage);
  const helpMessage = commands.map(c => {
    return pixie.render(config.help.format, {
      name: c.command,
      usage: c.usage,
      prefix: config.prefix
    });
  });

  return function run(message, args) {
    if (args.length > 1) {
      const command = args[0];
      const commandHelp = commands.find(c => c.name === command);

      if (commandHelp) {
        config.help.scope.forEach(scope => {
          if (message[scope].sendCode) message[scope].sendCode(null, commandHelp);
        });
      }
      return;
    }

    config.help.scope.forEach(scope => {
      if (message[scope].sendCode) message[scope].sendCode(null, helpMessage.join('\n'));
    });
  }
}

help.command = 'help';
help.usage = 'help [command]';

module.exports = help;
