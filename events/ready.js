import { Collection, Event, Events } from '@aroleaf/djs-bot';

export default new Event({
  event: Events.ClientReady,
}, async (client) => {
  const noelles = await client.db.noelles.find();
  client.leaderboard = new Collection(noelles.map(noelle => [noelle.user, noelle]));
  
  console.log('ready!');
});