import { Bot, util } from '@aroleaf/djs-bot';
import 'dotenv/config.js';
import Database from './db/index.js';

const client = new Bot({
  intents: [ 1<<0, 1<<9, 1<<15 ],
  commands: (await util.loader('commands')).flat(),
  events: await util.loader('events'),
  prefix: process.env.PREFIX,
  owner: '659488296820408355',
  register: {
    global: false,
    guilds: [process.env.GUILD],
  },
  defaultEvents: {
    messageCreate: false,
  },
});

client.db = new Database(process.env.MONGO);

await client.login(process.env.TOKEN);