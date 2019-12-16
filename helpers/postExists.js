import steem from './steem';

const postExists = (author, permlink) => {
  return steem.api.getContentAsync(author, permlink).then(r => {
    if (r && r.id !== 0) return true;
    return false;
  });
};

export default postExists;
