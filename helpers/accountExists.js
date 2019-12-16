import steem from './steem';

const accountExists = account => {
  return steem.api.getAccountsAsync([account]).then(r => {
    if (r.length > 0) return true;
    return false;
  });
};

export default accountExists;
