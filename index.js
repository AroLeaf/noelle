// const fs = require('fs');
const { ShardClient } = require('detritus-client');
const { GatewayIntents } = require('detritus-client-socket/lib/constants');
const { TOKEN, PREFIX, CHANNEL, GUILD } = require('./.env.json');

const client = new ShardClient(TOKEN, {
  gateway: {
    intents: GatewayIntents.GUILDS | GatewayIntents.GUILD_MESSAGES | 1<<15,
  },
});

client.on('gatewayReady', () => {
  console.log('ready!');
});

const regex = RegExp(`^${PREFIX}([a-z]+)([^]*)?`);
client.on('messageCreate', async ({message}) => {
  
  const [,type, text = ''] = message.content.match(regex) || [];
  if (![
    'waifu',
    'neko',
    'shinobu',
    'megumin',
    'bully',
    'cuddle',
    'cry',
    'hug',
    'awoo',
    'kiss',
    'lick',
    'pat',
    'smug',
    'bonk',
    'yeet',
    'blush',
    'smile',
    'wave',
    'highfive',
    'handhold',
    'nom',
    'bite',
    'glomp',
    'slap',
    'kill',
    'kick',
    'happy',
    'wink',
    'poke',
    'dance',
    'cringe',
  ].includes(type)) return;
  const img = await fetch(`https://api.waifu.pics/sfw/${type}`).then(res => res.json());
  return message.reply({
    embed: {
      title: type,
      description: ({
        waifu: '',
        neko: '',
        shinobu: '',
        megumin: '',
        bully: `${message.author.mention} bullies${text}`,
        cuddle: `${message.author.mention} cuddles${text}`,
        cry: '',
        hug: `${message.author.mention} hugs${text}`,
        awoo: `${message.author.mention} awoos`,
        kiss: `${message.author.mention} kisses${text}`,
        lick: `${message.author.mention} licks${text}`,
        pat: `${message.author.mention} pats${text}`,
        smug: '',
        bonk: `${message.author.mention} bonks${text}`,
        yeet: `${message.author.mention} yeets${text}`,
        blush: '',
        smile: '',
        wave: `${message.author.mention} waves${text ? ` at${text}` : ''}`,
        highfive: `${message.author.mention} highfives${text}`,
        handhold: `${message.author.mention} holds hands${text ? ` with${text}` : ''}`,
        nom: `${message.author.mention} noms${text ? ` on${text}` : ''}`,
        bite: `${message.author.mention} bites${text}`,
        glomp: '',
        slap: `${message.author.mention} slaps${text}`,
        kill: `${message.author.mention} kills${text}`,
        kick: `${message.author.mention} kicks${text}`,
        happy: '',
        wink: `${message.author.mention} winks${text ? ` at${text}` : ''}`,
        poke: `${message.author.mention} pokes${text}`,
        dance: '',
        cringe: '',
      })[type],
      image: { url: img.url },
      footer: { text: 'pictures from https://waifu.pics' },
    },
  });
});

client.on('messageDelete', async ({ message, channelId, messageId }) => {
  message ||= await client.channels.get(channelId).fetchMessage(messageId).catch(() => {});
  console.log(message?.guild.id !== GUILD, !message.attachments?.length, message.channel.id === CHANNEL);
  if (message?.guild.id !== GUILD || !message.attachments?.length || message.channel.id === CHANNEL) return;

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

client.on('messageUpdate', async ({ old, message, channelId, messageId }) => {
  message ||= await client.channels.get(channelId).fetchMessage(messageId).catch(() => {});
  const removed = old?.attachments?.filter(a => !message.attachments?.has(a.id)) || [];

  if (message.guild.id !== GUILD || !removed.length || message.channel.id === CHANNEL) return;

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
