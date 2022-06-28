const fs = require('fs');
const { ShardClient } = require('detritus-client');
const { GatewayIntents } = require('detritus-client-socket/lib/constants');
const { TOKEN, PREFIX, CHANNEL } = require('./.env.json');

// const commands = new Map();
// for (const f of fs.readdirSync('commands').filter(f => f.endsWith('.js'))) {
//   const cmd = require('./commands/' + f);
//   commands.set(cmd.name, cmd);
// }

const client = new ShardClient(TOKEN, {
  gateway: {
    intents: GatewayIntents.GUILDS | GatewayIntents.GUILD_MESSAGES,
  },
});

client.on('gatewayReady', () => {
  console.log('ready!');
});

// client.on('messageCreate', async ({message}) => {
//   if (message.fromBot || !message.content.startsWith(PREFIX)) return;
  
//   const args = message.content.slice(PREFIX.length).split(/ +/);
//   const cmd = args.shift();
  
//   const command = commands.get(cmd);
//   if (command) command.run(message, args);
// });

client.on('messageDelete', async ({ message }) => {
  if (!message.attachments?.length || message.channel.id === CHANNEL) return;

  const files = await Promise.all(message.attachments.map(async a => ({
    filename: a.filename,
    value: await fetch(a.proxyUrl).then(res => res.arrayBuffer()),
  })));

  return client.channels.get(CHANNEL).createMessage({
    content: `**a message with ${message.attachments.length == 1 ? 'a file' : 'some files'} got deleted**\n**author:** ${message.author.mention}\n**channel:** ${message.channel.mention}`,
    allowedMentions: { parse: [] },
    files,
  });
});

client.on('messageUpdate', async ({ old, message }) => {
  const removed = old.attachments.filter(a => !message.attachments.has(a.id)) || [];

  if (!removed.length || message.channel.id === CHANNEL) return;

  const files = await Promise.all(removed.map(async a => ({
    filename: a.filename,
    value: await fetch(a.proxyUrl).then(res => res.arrayBuffer()),
  })));

  return client.channels.get(CHANNEL).createMessage({
    content: `**${message.attachments.length == 1 ? 'a file' : 'some files'} got removed from a message**\n**author:** ${message.author.mention}\n**channel:** ${message.channel.mention}`,
    allowedMentions: { parse: [] },
    files,
  });
});

client.run();