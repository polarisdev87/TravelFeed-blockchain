export const imgFullSize = /<img src="([^"]*)"(?:| alt="([^"]*)") \/>/;

export const allLinks = /href="([^"]*)"/;

export const invalidPermlink = /^-|[^a-zA-Z0-9-]/;

// Valid steem usernames
export const allMentions = /\s@([a-z0-9-]{3,16})/;

export const ownUrl = /^(localhost|travelfeed\.io|travelfeedio\.herokuapp.com)$/;

export const allowedTitleChars = /[^\sa-zA-Z0-9(?)(')(/)(`)(,)(\-)(’)(#)(!)(´)(:)(()())(\])([)]+/g;

export const nospecialchars = /[^a-zA-Z0-9]/g;

export const swmregex = /!\bsteemitworldmap\b\s((?:[-+]?(?:[1-8]?\d(?:\.\d+)?|90(?:\.0+)?)))\s\blat\b\s((?:[-+]?(?:180(?:\.0+)?|(?:(?:1[0-7]\d)|(?:[1-9]?\d))(?:\.\d+)?)))\s\blong\b/gi;

export const allURLs = /(?:https?|ftp):\/\/[\n\S]+/g;

export const tfJSON = /<div json='{(.*)}'>(.*)<\/div>/;

export const htmlComment = /<!--([\s\S]+?)(-->|$)/g;

export const markdownComment = /\[\/\/\]:\S?\s\(.*\)/g;

// eslint-disable-next-line no-control-regex
export const allSpecialChars = /(?:[!/:-@[-`{-~],.|[^\x00-\x7F]|\s)/g;

export const permlinkFromTitle = title => {
  return title.replace(nospecialchars, '-').toLowerCase();
};

export const extractSWM = bodyText => {
  return swmregex.exec(bodyText);
};

export const dtubeImageRegex = /<center><a href='https:\/\/d\.tube\/#!\/v\/(.*)\/(.*)'><img src='https:\/\/ipfs\.io\/ipfs\/.*'><\/a><\/center><hr>/i;

export const dtubeLinkRegex = /\nhttps:\/\/d\.tube\/#!\/v\/(.*\/.*)\n/gi;

export const postUrl = /https:\/\/(?:travelfeed\.io|steemit\.com|busy\.org|steempeak\.com|partiko\.app)(?:\/|\/[a-z0-9-]{1,30}\/)@([a-z0-9-]{3,16})\/([a-z0-9-]*)/i;

export const mentionUrl = /^(?:https:\/\/(?:travelfeed\.io|steemit\.com|busy\.org|steempeak\.com|partiko\.app)|)\/@([a-z0-9-]{3,16})$/i;

export const exitUrl = /^\/exit\?url=(.*)$/i;
