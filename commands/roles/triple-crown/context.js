import { ApplicationCommandType, ContextCommand, PermissionFlagsBits } from '@aroleaf/djs-bot';

export default new ContextCommand({
  type: ApplicationCommandType.Message,
  name: 'triple-crown',
  permissions: {
    user: PermissionFlagsBits.ManageRoles,
    self: PermissionFlagsBits.ManageRoles,
  },
}, async (interaction, message) => {
  const reply = content => interaction.reply({ content, ephemeral: true });
  
  const member = interaction.client.guilds.resolve(process.env.GUILD).members.resolve(message.author.id);
  if (!member) return reply('The author of the message is not a member of Noelle Mains.');

  await member.roles.add(process.env.TRIPLE_CROWN);
  return reply(`Added <@&${process.env.TRIPLE_CROWN}> to ${member.user}.`);
});