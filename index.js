const resolve = require('resolve-cwd');
const pixie = require('pixie');

function help(bot, config) {
  const prefix = config.prefix;
  config.plugins.splice(config.plugins.indexOf('cordlr-help'), 1);
  const helpConfig = config[help.name] || {};
  const format = helpConfig.help || 'Command: {{command}}\n\tUsage: {{prefix}}{{usage}}';
  const scope = helpConfig.scope || ['channel'];
  const unknown = helpConfig.unknown || 'Command {{command}} does not exist';

  return function run(message, args) {
    const plugins = config.plugins.reduce((plugins, p) => {
      const plugin = require(resolve(p));
      if (Array.isArray(plugin)) for (let pl of plugin) plugins.push(pl)
      else plugins.push(plugin);
      return plugins;
    }, []);
    const commands = plugins.filter(p => {
      if (!(p.command && p.usage)) p(bot, config);
      return p.command && p.usage;
    });
    commands.push({
      command: 'help',
      usage: 'help [command]'
    });
    const helpMessage = commands.map(c => {
      return pixie.render(format, Object.assign({
        prefix: prefix
      }, c));
    });

    if (args.length > 0) {
      const command = args[0];
      const commandHelp = commands.find(c => c.name === command);

      if (commandHelp) {
        scope.forEach(scope => {
          if (message[scope].sendCode) {
            message[scope].sendCode(null, pixie.render(format, Object.assign({
              prefix: prefix
            }, commandHelp)));
          }
        });
      } else if (unknown) {
        scope.forEach(scope => {
          if (message[scope].sendCode) {
            message[scope].sendMessage(pixie.render(unknown, {
              prefix: prefix,
              command
            }));
          }
        });
      }
      return;
    }

    scope.forEach(scope => {
      if (message[scope].sendCode) message[scope].sendCode(null, helpMessage.join('\n'));
    });
  }
}

help.command = 'help';
help.usage = 'help [command]';

module.exports = help;
