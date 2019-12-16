import { round } from './math';
import steem from './steem';

const compare = (a, b) => {
  if (a.amountDelegated < b.amountDelegated) {
    return 1;
  }
  if (a.amountDelegated > b.amountDelegated) {
    return -1;
  }
  return 0;
};

export const getDelegations = (
  total_vesting_shares,
  total_vesting_fund_steem,
) => {
  return fetch(`https://api.steemplus.app/delegators/travelfeed`)
    .then(response => {
      return response.json();
    })
    .then(delegations => {
      const delegators = [];
      delegations.forEach(delegation => {
        const { delegator, vesting_shares } = delegation;
        const steemPower = steem.formatter.vestToSteem(
          vesting_shares,
          total_vesting_shares,
          total_vesting_fund_steem,
        );
        const amountDelegated = round(steemPower, 0);
        if (amountDelegated > 0)
          delegators.push({ delegator, amountDelegated });
      });
      delegators.sort(compare);
      return delegators;
    });
};
