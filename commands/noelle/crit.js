import { PrefixCommand, PrefixCommandOptionType } from '@aroleaf/djs-bot';

export default new PrefixCommand({
  name: 'compare-crit',
  description: 'Compares two crit stat pairs.',
  args: [{
    type: PrefixCommandOptionType.NUMBER,
    name: 'CR1',
    description: 'The crit rate of the first pair.',
    required: true,
  }, {
    type: PrefixCommandOptionType.NUMBER,
    name: 'CD1',
    description: 'The crit damage of the first pair.',
    required: true,
  }, {
    type: PrefixCommandOptionType.NUMBER,
    name: 'CR2',
    description: 'The crit rate of the second pair.',
    required: true,
  }, {
    type: PrefixCommandOptionType.NUMBER,
    name: 'CD2',
    description: 'The crit damage of the second pair.',
    required: true,
  }],
}, async (message, { args }) => {
  const mult1 = 1 + args.CR1 / 100 * args.CD1 / 100;
  const mult2 = 1 + args.CR2 / 100 * args.CD2 / 100;

  if (mult1 > mult2) return message.reply(`The first pair is better. (\`${mult1.toFixed(2)}x\` vs \`${mult2.toFixed(2)}x\` non-crit damage)`);
  if (mult1 < mult2) return message.reply(`The second pair is better. (\`${mult1.toFixed(2)}x\` vs \`${mult2.toFixed(2)}x\` non-crit damage)`);
  return message.reply(`The two pairs are equal. (\`${mult1.toFixed(2)}x\` non-crit damage)`);
});