/**
This function is extracted from the source code of condenser with 
some slight adjustments to meet our needs. Refer to the main one in case of 
future problems:
https://github.com/steemit/condenser/blob/master/src/app/utils/CanonicalLinker.js
 */
import Apps from 'steemscript/apps.json';

function read_md_app(app) {
  return app && typeof app === 'string' && app.split('/').length === 2
    ? app.split('/')[0]
    : null;
}

function read_md_canonical(meta) {
  const metadata = JSON.parse(meta);
  const url =
    metadata.canonical_url && typeof metadata.canonical_url === 'string'
      ? metadata.canonical_url
      : null;

  const saneUrl = new RegExp(/^https?:\/\//);
  return saneUrl.test(url) ? url : null;
}

function build_scheme(scheme, category, author, permlink) {
  // https://github.com/bonustrack/steemscript/blob/master/apps.json
  return scheme
    .split('{category}')
    .join(category)
    .split('{username}')
    .join(author)
    .split('{permlink}')
    .join(permlink);
}

function allowed_app(app) {
  // apps which follow (reciprocate) canonical URLs (as of 2019-10-15)
  const whitelist = ['steemit', 'esteem', 'steempeak'];
  return whitelist.includes(app);
}

export default function makeCanonicalLink(
  metadata,
  appstring,
  category,
  author,
  permlink,
) {
  if (metadata) {
    const canonUrl = read_md_canonical(metadata);
    if (canonUrl) return canonUrl;

    const app = read_md_app(appstring);
    if (app && allowed_app(app)) {
      const scheme = Apps[app] ? Apps[app].url_scheme : null;
      if (scheme && category) {
        return build_scheme(scheme, category, author, permlink);
      }
    }
  }
  return `https://travelfeed.io/@${author}/${permlink}`;
}
