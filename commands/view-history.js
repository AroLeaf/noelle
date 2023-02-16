import { ButtonStyle, ComponentType, SlashCommand } from '@aroleaf/djs-bot';
import DME from 'discord-markdown-embeds';
import ms from 'ms';

function chunk(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

const punishmentTypeNames = {
  informal_warn: 'Informal Warning',
  warn: 'Warning',
  kick: 'Kick',
  ban: 'Ban',
  mute: 'Mute',
  timeout: 'Timeout',
}

const components = (prev, next) => [{
  type: ComponentType.ActionRow,
  components: [{
    type: ComponentType.Button,
    style: ButtonStyle.Primary,
    emoji: '⬅️',
    custom_id: 'prev',
    disabled: !prev,
  }, {
    type: ComponentType.Button,
    style: ButtonStyle.Primary,
    emoji: '➡️',
    custom_id: 'next',
    disabled: !next,
  }],
}];

export default new SlashCommand({
  name: 'view-history',
  description: 'View your moderation history',
}, async (interaction) => {
  await interaction.deferReply({ ephemeral: true });
  const reply = content => interaction.editReply(content);

  const history = [];

  let more = true;
  while (more) {
    const chunk = await fetch(`https://api.daedalus.hyper-neutrino.xyz/v1/moderation/history/${interaction.guild.id}/user/${interaction.user.id}`, {
      headers: { 'Authorization': `Bearer ${process.env.DDL_TOKEN}` }
    }).then(res => res.json());
    
    if (chunk.error) {
      console.error(new Error(`${chunk.error.statusCode}: ${chunk.error.message}`));
      return reply('An error occurred while fetching your history.');
    }

    more = chunk.more;
  }

  if (!history.length) return reply('You have no moderation history.');

  const chunks = chunk(history, 15);

  const renderChunk = (chunk, i) => DME.render(`
    ---
    footer: Page ${i + 1} of ${chunks.length}, ${history.length} total
    ---

    # ${interaction.user.tag}'s Moderation History

    ${chunk.map(punishment => `
      #- #${punishment.id}: ${punishmentTypeNames[punishment.type]}
      **Reason:** ${punishment.reason || 'No reason provided'}
      ${['ban', 'mute', 'timeout'].includes(punishment.type) ? `Duration: ${ms(punishment.duration, { long: true })}` : ''}
    `).join('')}
  `);

  const pages = chunks.map(renderChunk);
  let page = 0;

  const message = await interaction.editReply({
    embeds: pages[0],
    components: components(false, pages.length > 1),
  });

  const collector = message.createMessageComponentCollector({
    componentType: ComponentType.Button,
    idle: 5 * 60 * 1000,
  });

  collector.on('collect', async interaction => {
    switch (interaction.customId) {
      case 'prev': {
        page--;
        break;
      }
      case 'next': {
        page++;
        break;
      }
    }

    await interaction.update({
      embeds: pages[page],
      components: components(page > 0, page < pages.length - 1),
    });
  });

  collector.on('end', async () => {
    await message.edit({
      components: components(false, false),
    });
  });
});