import { util } from '@aroleaf/djs-bot';
import { Leaderboard } from './leaderboard/index.js';

export async function update(guild) {
  const roles = await guild.client.db.roles.find();

  for (const [, member] of guild.members.cache) {
    const [managed, rest] = util.partition([...member.roles.cache.keys()], roleId => roles.some(role => role.role === roleId));

    const expected = guild.client.leaderboard.cache.has(member.id) ? roles.filter(role => {
      const leaderboard = guild.client.leaderboard.query().sort((a, b) => Leaderboard.mappers[role.type](b) - Leaderboard.mappers[role.type](a));
      const position = leaderboard.toJSON().findIndex(entry => entry.user === member.id) + 1;
      return position >= role.start && position <= role.end;
    }).map(role => role.role) : [];

    const different = managed.length !== expected.length || managed.some(role => !expected.includes(role));
    if (different) await member.roles.set(expected.concat(rest));
  }
}