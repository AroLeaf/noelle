import { Event, Events } from '@aroleaf/djs-bot';

export default new Event({
  event: Events.MessageCreate,
}, async message => {
  if (message.member?.roles.resolve('787242744170938379') ||![
    '1075829565395583096',
    '1075829515034566716',
  ].includes(message.channel.id)) return;

  if (message.content || message.stickers.size || message.embeds.length) return message.delete();
});