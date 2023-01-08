import crypto from 'crypto';

const paths = {
  ABYSS: 'https://bbs-api-os.hoyolab.com/game_record/genshin/api/spiralAbyss',
  ACCOUNTS: 'https://bbs-api-os.hoyolab.com/game_record/card/wapi/getGameRecordCard'
}

function DS() {
  const time = Math.floor(Date.now() / 1000);
  const c = crypto
    .createHash('md5')
    .update(`salt=6s25p5ox5y14umn1p61aqyyvbvvl3lrt&t=${time}&r=Noelle`)
    .digest('hex');
  return `${time},Noelle,${c}`;
}

const headers = (cookies) => ({
  Origin: 'https://webstatic-sea.hoyolab.com',
  Referer: 'https://webstatic-sea.hoyolab.com',
  Accept: 'application/json, text/plain, */*',
  'Accept-Encoding': 'gzip, deflate',
  'Accept-Language': 'en-US;q=0.5',
  'x-rpc-app_version': '1.5.0',
  'x-rpc-client_type': '5',
  'x-rpc-language': 'en-us',
  'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:100.0) Gecko/20100101 Firefox/100.0',
  Cookie: cookies,
  DS: DS(),
});

const server = uid => ({
  6: 'os_usa',
  7: 'os_euro',
  8: 'os_asia',
  9: 'os_cht',
})[uid.toString()[0]];


export async function getAbyssStats(cookies, uid) {
  const res = await fetch(`${paths.ABYSS}?${new URLSearchParams({
    server: server(uid),
    role_id: uid,
    schedule_type: 1,
  })}`, { headers: headers(cookies) }).then(res => res.ok && res.json()).catch(console.error);
  return res?.data;
}


export async function getAccounts(cookies) {
  const uid = /ltuid=(\d+);/.exec(cookies)?.[1];
  const res = await fetch(`${paths.ACCOUNTS}?${new URLSearchParams({ uid })}`, { headers: headers(cookies) }).then(res => res.ok && res.json()).catch(console.error);
  return res?.data?.list;
}