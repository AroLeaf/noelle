import { Event, Events } from '@aroleaf/djs-bot';

const eventChannels = process.env.EVENT_CHANNELS?.split(',');

export default new Event({
  event: Events.MessageCreate,
}, async message => {
  if (message.member?.roles.resolve(process.env.MODS) ||!eventChannels.includes(message.channel.id)) return;

  if (message.content || message.stickers.size || message.embeds.length) return message.delete();
});