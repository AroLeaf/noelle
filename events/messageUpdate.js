import { Event, Events } from '@aroleaf/djs-bot';

export default new Event({
  event: Events.MessageUpdate,
}, async (old, message) => {
  const removed = old.attachments?.filter(a => !message.attachments?.has(a.id));
  
  if (message.guild.id !== process.env.GUILD || !removed?.size || message.channel.id === process.env.LOGS) return;

  const files = await Promise.all(removed.map(async a => ({
    attachment: await fetch(a.url).then(async res => Buffer.from(await res.arrayBuffer())),
    name: a.name,
  })));

  return message.client.channels.resolve(process.env.LOGS)?.send({
    content: `**${files.length == 1 ? 'a file' : 'some files'} got removed from a message**\n**author:** ${message.author}\n**channel:** ${message.channel}`,
    allowedMentions: { parse: [] },
    files,
  });
});