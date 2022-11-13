import { Event, Events } from '@aroleaf/djs-bot';
import { Leaderboard } from '../lib/leaderboard/index.js';

export default new Event({
  event: Events.ClientReady,
}, async (client) => {
  const noelles = await client.db.noelles.find();
  client.leaderboard = new Leaderboard(noelles.map(entry => entry.toObject()));

  console.log('ready!');
});