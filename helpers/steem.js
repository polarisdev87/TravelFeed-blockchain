import steem from 'steem';
import { STEEM_API } from '../config';
import { round } from './math';

steem.api.setOptions({ url: STEEM_API });

export const getAccount = username => {
  return steem.api.getAccountsAsync([username]).then(account => {
    if (account.length < 1) return undefined;

    const { posting_json_metadata, json_metadata } = account[0];

    let json = {};
    try {
      json = JSON.parse(posting_json_metadata);
    } catch {
      try {
        json = JSON.parse(json_metadata);
      } catch {
        return { name: username, display_name: username };
      }
    }
    const { profile } = json;

    if (!profile) return { name: username, display_name: username };

    const {
      name,
      profile_image,
      cover_image,
      about,
      location,
      website,
      twitter,
      facebook,
      instagram,
      youtube,
      couchsurfing,
      pinterest,
    } = profile;

    return {
      name: username,
      display_name: name || username,
      profile_image,
      cover_image,
      about,
      location,
      website,
      twitter,
      facebook,
      instagram,
      youtube,
      couchsurfing,
      pinterest,
    };
  });
};

export const getVesting = () => {
  return new Promise(resolve => {
    steem.api.getDynamicGlobalProperties((error, result) => {
      const { total_vesting_shares, total_vesting_fund_steem } = result;
      resolve({ total_vesting_shares, total_vesting_fund_steem });
    });
  });
};

export const getTfDelegation = (
  account,
  total_vesting_shares,
  total_vesting_fund_steem,
) => {
  return new Promise(resolve => {
    steem.api.getVestingDelegations(account, 'travelfeed', 100, (err, res) => {
      if (res && res.length > 0) {
        const steemPower = steem.formatter.vestToSteem(
          res[0].vesting_shares,
          total_vesting_shares,
          total_vesting_fund_steem,
        );
        const amountDelegated = round(steemPower, 0);
        resolve({
          isDelegator: true,
          amountDelegated,
        });
      } else resolve({ isDelegator: false });
    });
  });
};

export const getIsWitnessVote = username => {
  return steem.api.getAccountsAsync([username]).then(account => {
    const isWitnessVote = account[0].witness_votes.indexOf('travelfeed') !== -1;
    return isWitnessVote;
  });
};

export default steem;
