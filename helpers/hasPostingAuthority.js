import steem from './steem';

const hasPostingAuthority = account => {
  return steem.api.getAccountsAsync([account]).then(r => {
    const postingAuths = r[0].posting.account_auths;
    return new Promise(resolve => {
      postingAuths.forEach(acc => {
        if (acc[0] === 'travelfeed.app') resolve(true);
      });
      resolve(false);
    });
  });
};

export default hasPostingAuthority;
