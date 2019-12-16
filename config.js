/* eslint-disable prefer-destructuring */
// Do not use destructuring!
// https://github.com/zeit/next.js/tree/master#build-time-configuration

const { version } = require('./package.json');

export const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;
export const GMAPS_API_KEY = process.env.GMAPS_API_KEY;
export const RECAPTCHA_SITE_KEY = process.env.RECAPTCHA_SITE_KEY;
export const ROOTURL = process.env.ROOTURL;
export const API_URL = process.env.GRAPHQL_URL;
export const GRAPHQL_URL = `${process.env.GRAPHQL_URL}/graphql`;
export const WEB_PUSH_PUB = process.env.WEB_PUSH_PUB;
export const STEEM_API = process.env.STEEM_API;

export const STEEMCONNECT_CALLBACK_URL = `${ROOTURL}/login`;

export const APP_VERSION = `travelfeed/${version}`;
export const DEFAULT_META_DESCRIPTION =
  'Find inspiration for your travels on TravelFeed. Join the TravelFeed community, write your own travel blog and start earning!';

export const photoTags = [
  'photofeed',
  'photocircle',
  'photostreem',
  'photo',
  'photomatic',
  'photomag',
  'photofriend',
  'phototalent',
];

export const removeTags = [
  'travelfeed',
  'fundition-81n9hwooj',
  'travel',
  'blog',
  'steemitworldmap',
  'blocktradescontest',
  'ntopaz',
  'steempress',
  'newsteem',
  'qurator',
  'blocktrades',
  'adsactly',
  'traveldigest',
  'tripsteem',
  'dtube',
  'threespeak',
  'tokenbb',
  'steemmonsters',
  'tasteem',
  'tasteem-intl',
  'tasteem-food',
  'partiko',
  'steem-travel',
  'busy',
  'actifit',
  'sp-group',
  'artzone',
  'curie',
  'steem',
  'steemit',
  'talentclub',
  'ulog',
  'helpiecake',
  'archisteem',
  'placestoremember',
  'ocd',
  'jjm',
  'ocd-resteem',
  'oc',
  'share2steem',
  'swmchallenge',
  'esteem',
  'powerhousecreatives',
  'palnet',
  'steemleo',
  'lifestyle',
  'creativecoin',
  'neoxian',
  'marlians',
  'realityhubs',
  'zzan',
  'thealliance',
  'whalepower',
  'sct',
  'cervantes',
  'bdvoter',
  'actnearn',
  'dblog',
  'posh',
  'bdcommunity',
];
