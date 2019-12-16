import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { ONBOARD_GET_REVIEWABLE } from '../../helpers/graphql/onboarding';
import OnboardingItem from './Onboarding/OnboardingItem';

const Onboarding = () => {
  return (
    <Fragment>
      <Query fetchPolicy="network-only" query={ONBOARD_GET_REVIEWABLE}>
        {({ data }) => {
          if (data && data.onboardingGetReviewable)
            return (
              <>
                <div className="container pt-1">
                  <div className="row">
                    {(data.onboardingGetReviewable.length < 1 && (
                      <div className="col text-center">
                        No pending applications
                      </div>
                    )) ||
                      data.onboardingGetReviewable.map(acc => (
                        <div className="col-12 pt-2 pl-2 pr-2">
                          <OnboardingItem acc={acc} />
                        </div>
                      ))}
                  </div>
                </div>
              </>
            );
          return 'Loading...';
        }}
      </Query>
    </Fragment>
  );
};

export default Onboarding;
