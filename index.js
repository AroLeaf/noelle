import { Bot, util } from '@aroleaf/djs-bot';
import 'dotenv/config.js';

const client = new Bot({
  intents: [ 1<<0, 1<<9, 1<<15 ],
  commands: (await util.loader('commands')).flat(),
  events: await util.loader('events'),
  prefix: process.env.PREFIX,
});

await client.login(process.env.TOKEN);