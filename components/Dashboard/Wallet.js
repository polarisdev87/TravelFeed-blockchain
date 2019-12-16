import Button from '@material-ui/core/Button';
import { green, indigo, teal } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { GET_USER_STATS } from '../../helpers/graphql/stats';
import HeaderCard from '../General/HeaderCard';
import RecentEarnings from './Stats/RecentEarningsChart';

const Wallet = () => {
  return (
    <Fragment>
      <Grid container spacing={0} className="p-1" justify="center">
        <Query query={GET_USER_STATS}>
          {({ data }) => {
            return (
              <Fragment>
                <Grid item className="p-1" lg={6} md={6} sm={11} xs={12}>
                  <HeaderCard
                    title="Total Earnings"
                    background={green[600]}
                    content={
                      <Fragment>
                        {data && data.userstats && (
                          <p>
                            You have earned a total of{' '}
                            <strong>${data.userstats.total_payout}</strong> with
                            your TravelBlog so far.
                          </p>
                        )}
                      </Fragment>
                    }
                  />
                  <div className="pt-2">
                    {' '}
                    <HeaderCard
                      title="Wallet"
                      background={indigo[600]}
                      content={
                        <Fragment>
                          <p>
                            You can use Steemitwallet to transfer and power up
                            your STEEM. A TravelFeed wallet will be implemented
                            once we launch our own token.
                          </p>
                          <a
                            href="https://steemitwallet.com/"
                            target="_blank"
                            rel="nofollow noreferrer noopener"
                          >
                            <Button variant="contained" color="secondary">
                              Go to steemit wallet
                            </Button>
                          </a>
                        </Fragment>
                      }
                    />
                  </div>
                </Grid>
                <Grid item className="p-1" lg={6} md={6} sm={11} xs={12}>
                  <HeaderCard
                    title="Monthly Earnings"
                    background={teal[600]}
                    content={
                      <>
                        {data && data.userstats && (
                          <RecentEarnings
                            color={teal[400]}
                            recentPayouts={data.userstats.recent_payouts}
                          />
                        )}
                      </>
                    }
                  />
                </Grid>
              </Fragment>
            );
          }}
        </Query>
      </Grid>
    </Fragment>
  );
};

export default Wallet;
