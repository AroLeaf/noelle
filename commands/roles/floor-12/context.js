import { ApplicationCommandType, ContextCommand, PermissionFlagsBits } from '@aroleaf/djs-bot';

export default new ContextCommand({
  type: ApplicationCommandType.Message,
  name: 'floor-12',
  permissions: {
    user: PermissionFlagsBits.ManageRoles,
    self: PermissionFlagsBits.ManageRoles,
  },
}, async (interaction, message) => {
  const reply = content => interaction.reply({ content, ephemeral: true });
  
  const member = interaction.client.guilds.resolve(process.env.GUILD).members.resolve(message.author.id);
  if (!member) return reply('The author of the message is not a member of Noelle Mains.');

  await member.roles.add(process.env.FLOOR_12);
  return reply(`Added <@&${process.env.FLOOR_12}> to ${member.user}.`);
});