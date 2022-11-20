import { Collection } from '@aroleaf/djs-bot';
import * as constants from './constants.js';

export class EnkaError extends Error {
  constructor(code) {
    super({
      [constants.ENKA_ERRORS.INVALID_UID]:          'UID is invalid or does not belong to a user',
      [constants.ENKA_ERRORS.NO_CHARACTER_DETAILS]: 'The character details of that user are private',
      [constants.ENKA_ERRORS.CHARACTER_NOT_PUBLIC]: 'That user does not have that character in their public characters',
    }[code]);
    this.code = code;
  }
}

export class EnkaManager {
  constructor(character) {
    this.cache = new Collection();
    this.character = character;
  }

  async fetch(uid) {
    const cached = this.cache.get(uid);
    if (cached && cached.validUntil > Date.now()) return cached.character;
    const data = await fetch(`https://enka.network/u/${uid}/__data.json`).then(res => res.json()).catch(() => {});
    if (!data?.playerInfo) throw new EnkaError(constants.ENKA_ERRORS.INVALID_UID);
    if (!data.avatarInfoList) throw new EnkaError(constants.ENKA_ERRORS.NO_CHARACTER_DETAILS);
    const character = data.avatarInfoList.find(avatar => avatar.avatarId === this.character);
    if (!character) throw new EnkaError(constants.ENKA_ERRORS.CHARACTER_NOT_PUBLIC);
    this.cache.set(uid, {
      uid,
      character,
      validUntil: Date.now() + data.ttl * 1000,
    });
    return character;
  }

  resolve(uid) {
    return this.cache.get(uid)?.character;
  }
}