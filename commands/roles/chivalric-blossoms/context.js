import { ApplicationCommandType, ContextCommand, PermissionFlagsBits } from '@aroleaf/djs-bot';

export default new ContextCommand({
  type: ApplicationCommandType.Message,
  name: 'chivalric-blossoms',
  permissions: {
    user: PermissionFlagsBits.ManageRoles,
    self: PermissionFlagsBits.ManageRoles,
  },
}, async (interaction, message) => {
  const reply = content => interaction.reply({ content, ephemeral: true });
  
  const member = interaction.client.guilds.resolve(process.env.GUILD).members.resolve(message.author.id);
  if (!member) return reply('The author of the message is not a member of Noelle Mains.');

  await member.roles.add(process.env.CHIVALRIC_BLOSSOMS);
  return reply(`Added <@&${process.env.CHIVALRIC_BLOSSOMS}> to ${member.user}.`);
});