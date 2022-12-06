import { Event, Events } from '@aroleaf/djs-bot';
import { Leaderboard } from '../lib/leaderboard/index.js';
import { update } from '../lib/roles.js';

export default new Event({
  event: Events.ClientReady,
}, async (client) => {
  const noelles = await client.db.noelles.find();
  client.leaderboard = new Leaderboard(noelles.map(entry => entry.toObject()));

  const guild = client.guilds.resolve(process.env.GUILD);
  if (guild) {
    await guild.members.fetch();
    console.log(`cached ${guild.members.cache.size} members`);
    await update(guild);
  }
  

  console.log('ready!');
});