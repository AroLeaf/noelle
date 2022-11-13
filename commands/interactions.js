import { PrefixCommand } from '@aroleaf/djs-bot';

const types = [
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
];

function getInteractionText(type, author, text) {
  return ({
    waifu: '',
    neko: '',
    shinobu: '',
    megumin: '',
    bully: `${author} bullies ${text}`,
    cuddle: `${author} cuddles ${text}`,
    cry: '',
    hug: `${author} hugs ${text}`,
    awoo: `${author} awoos`,
    kiss: `${author} kisses ${text}`,
    lick: `${author} licks ${text}`,
    pat: `${author} pats ${text}`,
    smug: '',
    bonk: `${author} bonks ${text}`,
    yeet: `${author} yeets ${text}`,
    blush: '',
    smile: `${author} smiles ${text ? `at ${text}` : ''}`,
    wave: `${author} waves ${text ? `at ${text}` : ''}`,
    highfive: `${author} highfives ${text}`,
    handhold: `${author} holds hands ${text ? `with ${text}` : ''}`,
    nom: `${author} noms ${text ? `on ${text}` : ''}`,
    bite: `${author} bites ${text}`,
    glomp: '',
    slap: `${author} slaps ${text}`,
    kill: `${author} kills ${text}`,
    kick: `${author} kicks ${text}`,
    happy: '',
    wink: `${author} winks ${text ? `at ${text}` : ''}`,
    poke: `${author} pokes ${text}`,
    dance: '',
    cringe: '',
  })[type];
}


export default types.map(type => new PrefixCommand({
  name: type,
  description: `Cute ${type} images!`,
}, async (message, args) => {
  const image = await fetch(`https://api.waifu.pics/sfw/${type}`).then(res => res.json());
  return message.reply({
    embeds: [{
      title: type,
      description: getInteractionText(type, message.webhookId ? `**${message.author.username}**` : message.author, args.join(' ')),
      image,
      color: 0xe17f93,
    }],
  });
}));