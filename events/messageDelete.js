import { Event, Events } from '@aroleaf/djs-bot';

export default new Event({
  event: Events.MessageDelete,
}, async message => {
  if (message.guild.id !== process.env.GUILD || !message.attachments?.size || message.channel.id === process.env.LOGS) return;

  const files = await Promise.all(message.attachments.map(async a => ({
    attachment: await fetch(a.url).then(async res => Buffer.from(await res.arrayBuffer())),
    name: a.name,
  })));

  return message.client.channels.resolve(process.env.LOGS)?.send({
    content: `**a message with ${files.length == 1 ? 'a file' : 'some files'} got deleted**\n**author:** ${message.author}\n**channel:** ${message.channel}`,
    allowedMentions: { parse: [] },
    files,
  });
});