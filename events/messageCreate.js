import { Event, Events } from '@aroleaf/djs-bot';

export default new Event({
  event: Events.MessageCreate,
}, async message => {
  if (![
    '1064633680712175716',
    '1064634114113810602',
    '1064634458084487219',
  ].includes(message.channel.id)) return;

  if (message.content || message.stickers.size || message.embeds.length) return message.delete();
});