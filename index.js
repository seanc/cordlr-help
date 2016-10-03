const resolve = require('resolve-cwd');
const pixie = require('pixie');

function help(bot, config) {
  config.plugins.splice(config.plugins.indexOf('cordlr-help'), 1);
  const plugins = config.plugins.map(p => require(resolve(p)));
  const commands = plugins.filter(p => p.command && p.usage);
  commands.push({
    command: 'help',
    usage: 'help [command]'
  });
  const helpMessage = commands.map(c => {
    return pixie.render(config.help.format, Object.assign({
      prefix: config.prefix
    }, c));
  });

  return function run(message, args) {
    if (args.length > 0) {
      const command = args[0];
      const commandHelp = commands.find(c => c.name === command);

      if (commandHelp) {
        config.help.scope.forEach(scope => {
          if (message[scope].sendCode) {
            message[scope].sendCode(null, pixie.render(config.help.format, Object.assign({
              prefix: config.prefix
            }, commandHelp)));
          }
        });
      } else if (config.help.unknown) {
        config.help.scope.forEach(scope => {
          if (message[scope].sendCode) {
            message[scope].sendMessage(pixie.render(config.help.unknown, {
              prefix: config.prefix,
              command
            }));
          }
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
