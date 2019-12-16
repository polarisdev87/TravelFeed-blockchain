/* eslint-disable react/no-unescaped-entities */
import Button from '@material-ui/core/Button';
import { indigo, teal } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import Cookie from 'js-cookie';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { Query } from 'react-apollo';
import ReactPiwik from 'react-piwik';
import Head from '../../components/Header/Head';
import Header from '../../components/Header/Header';
import OnboardStart from '../../components/Onboarding/OnboardStart';
import { GET_TF_STATS } from '../../helpers/graphql/stats';

const JoinPage = props => {
  const [referrer, setReferrer] = useState(undefined);

  useEffect(() => {
    ReactPiwik.push(['trackGoal', 1]);
    if (props.referrer) {
      Cookie.set('referrer', props.referrer);
      setReferrer(props.referrer);
    } else {
      setReferrer(Cookie.get('referrer'));
    }
  }, [props]);

  return (
    <Fragment>
      <Head
        title="Join"
        description="TravelFeed is the travel community on the Steem Blockchain. Join TravelFeed now!"
      />
      <Header />
      <Query query={GET_TF_STATS} variables={{ days: 1000 }}>
        {({ data, loading, error }) => {
          if (loading || error || data.stats === null) {
            return <></>;
          }
          return (
            <>
              <div
                style={{
                  backgroundImage: `url(/img/header-1.jpg)`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center center',
                  backgroundSize: 'cover',
                  width: '100%',
                  height: '500px',
                }}
              >
                <div className="container text-center h-100">
                  <div className="row justify-content-center align-items-center h-100">
                    <div className="col-xl-6 col-md-8 col-sm-11 col-xs-12">
                      <Typography variant="h3">
                        {(referrer &&
                          `You have been invited to TravelFeed by ${referrer}`) ||
                          'Welcome to TravelFeed!'}
                      </Typography>
                      <div className="p-3">
                        <a href="#join">
                          <Button variant="contained" color="primary">
                            Join Now
                          </Button>
                        </a>
                      </div>
                      <Typography gutterBottom variant="subtitle1">
                        On TravelFeed, you can discover travel content created
                        by a large community of likeminded travelers! With{' '}
                        <strong>{data.stats.posts} blog posts</strong>, you will
                        almost certainly discover insiders' tips about your
                        travel destination and find other travelers to connect
                        with.
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="jumbotron mb-0 text-light"
                style={{ background: indigo[900] }}
              >
                <div className="container text-center">
                  <div className="row justify-content-center align-items-center h-100">
                    <div className="col-xl-6 col-md-8 col-sm-11 col-xs-12">
                      <Typography gutterBottom variant="h3">
                        <strong>The</strong> Travel Community.
                      </Typography>
                      <Typography gutterBottom variant="subtitle1">
                        With <strong>{data.stats.authors} authors</strong> and
                        many more readers, TravelFeed is one of the largest
                        international communities of independent travelers.
                        Soon, you will be able to create custom trips and find
                        travel buddies for your next trip.
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  backgroundImage: `url(/img/header-2.jpg)`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center center',
                  backgroundSize: 'cover',
                  width: '100%',
                  height: '500px',
                }}
              >
                <div className="container text-center h-100">
                  <div className="row justify-content-center align-items-center h-100">
                    <div className="col-xl-6 col-md-8 col-sm-11 col-xs-12">
                      <Typography gutterBottom variant="h3">
                        Travel, Write, Earn – it's that simple!
                      </Typography>
                      <Typography gutterBottom variant="subtitle1">
                        Ready to start your own travel blog? We offer you a free
                        blog hosted on the uncensorable Steem Blockchain. When
                        readers like your post, they will hit the 'take off'
                        button and assign smiles to it. Seven days after
                        publishing your post, you can then claim the reward for
                        your post in cryptocurrency.
                      </Typography>
                      <Typography gutterBottom variant="subtitle1">
                        So far, <strong>${data.stats.payout}</strong> have been
                        paid out to TravelFeed authors.
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="jumbotron mb-0 text-center text-light"
                style={{ background: teal[900] }}
                id="join"
              >
                <div className="container">
                  <Typography gutterBottom variant="h3">
                    Join TravelFeed now!
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    If you already have a Steem account, simply login by
                    clicking the "login" button on the top. If you don't have a
                    Steem account yet, enter your email address below and we
                    will set you up with a free account!
                  </Typography>
                  <OnboardStart autoFocus={false} isWhite referrer={referrer} />
                </div>
              </div>
            </>
          );
        }}
      </Query>
    </Fragment>
  );
};

JoinPage.getInitialProps = props => {
  const { ref } = props.query;
  return { referrer: ref };
};

JoinPage.propTypes = {
  referrer: PropTypes.string,
};

export default JoinPage;
