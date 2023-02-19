import { PrefixCommand, PrefixCommandOptionType } from '@aroleaf/djs-bot';

export default new PrefixCommand({
  name: 'crit-value',
  description: 'Calculates the crit value of a crit stat pair.',
  args: [{
    type: PrefixCommandOptionType.NUMBER,
    name: 'CR',
    description: 'The crit rate of the pair.',
    required: true,
  }, {
    type: PrefixCommandOptionType.NUMBER,
    name: 'CD',
    description: 'The crit damage of the pair.',
    required: true,
  }],
}, async (message, { args }) => {
  const CV = args.CR * 2 + args.CD;
  return message.reply(`The Crit Value of given stats is \`${CV.toFixed(2)}\`.`);
});