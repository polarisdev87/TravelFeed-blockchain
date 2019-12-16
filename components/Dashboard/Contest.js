import { indigo, teal } from '@material-ui/core/colors';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withSnackbar } from 'notistack';
import React, { Fragment } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { getUser } from '../../helpers/token';
import Link from '../../lib/Link';
import HeaderCard from '../General/HeaderCard';
import OptIn from './Contest/OptIn';
import RaffleTickets from './Contest/RaffleTickets';
import ReferAFriend from './Contest/ReferAFriend';
import Referrals from './Contest/Referrals';

const Contest = props => {
  const newNotification = notification => {
    if (notification !== undefined) {
      let variant = 'success';
      if (notification.success === false) {
        variant = 'error';
      }
      props.enqueueSnackbar(notification.message, { variant });
    }
  };

  return (
    <Fragment>
      <Grid container spacing={0} justify="center" className="p-1">
        <Grid item className="p-1" lg={6} md={6} sm={12} xs={12}>
          <HeaderCard
            title="How to Participate"
            background={teal[600]}
            content={
              <>
                <Typography className="pt-4">
                  <p>
                    In cooperation with{' '}
                    <Link as="/@blocktrades" href="/blog?author=blocktrades">
                      @blocktrades
                    </Link>{' '}
                    and{' '}
                    <Link as="/@anomadsoul" href="/blog?author=anomadsoul">
                      @anomadsoul
                    </Link>{' '}
                    we are giving away a ticket to Steemfest including
                    accommodation. Steemfest is the awesome yearly conference of
                    the global Steem community and will be attended by many
                    TravelFeed users, including the team. Steemfest is held from
                    November 6th to November 10th 2019 in Bangkok, refer to the{' '}
                    <Typography display="inline" color="primary">
                      <a
                        href="https://steemfest.com/"
                        rel="noopener noreferrer nofollow"
                        target="_blank"
                      >
                        official website
                      </a>
                    </Typography>{' '}
                    for more information.
                  </p>
                  <p>
                    Before you can start earning entries, you first need to opt
                    in. Each raffle entry gives you a chance to participate in
                    the final draw on October 18th to win a ticket to Steemfest
                    including accommodation. You can earn raffle entries until
                    October 17th by using and promoting TravelFeed:
                  </p>
                  <ul>
                    <li>
                      10 entries for posting an article which is one of the 5
                      articles per day which are chosen by our curation team to
                      be featured on our front page<sup>*</sup>
                    </li>
                    <li>
                      3 entries for each article that we highlight as honorable
                      mention<sup>*</sup>
                    </li>
                    <li>
                      50/40/30 entries for the 1st/2nd/3rd weekly winner,
                      announced every Friday
                      <sup>*</sup>
                    </li>
                    <li>
                      1 entry for sharing a TravelFeed post on social media
                      using the share buttons below posts (limited to 3 entries
                      per day)
                    </li>
                    <li>
                      Referral program: 20 entries for each new user
                      (non-Steemian signed up through EasySignUp) or 2 entries
                      for each new Steemian signed up via your referral link. On
                      top of that, you earn 10% of the entries earned for
                      posting by users referred by you.
                    </li>
                    <li>
                      20 entries for good posts promoting TravelFeed and/or this
                      contest - on and off Steem. Send us the link{' '}
                      <Typography display="inline" color="primary">
                        <a
                          href="https://discord.gg/jWWu73H"
                          rel="noopener noreferrer nofollow"
                          target="_blank"
                        >
                          on our Discord
                        </a>
                      </Typography>{' '}
                      to claim your entries!
                    </li>
                  </ul>
                  <p>
                    <sup>*</sup> Only posts posted through TravelFeed.io are
                    eligible, not posts using only the tag.
                  </p>
                  <p>
                    Users blacklisted from TravelFeed before or during the
                    contest will not be able to participate in the final draw.
                    Entries and tickets are not transferable.
                  </p>
                </Typography>
              </>
            }
          />
        </Grid>
        <Grid item className="p-1" lg={6} md={6} sm={12} xs={12}>
          <OptIn />
          <div className="pt-2">
            {' '}
            <HeaderCard
              title="Refer a Friend"
              background={indigo[600]}
              content={
                <>
                  <FormLabel component="legend" className="pt-4">
                    Refer your friends to TravelFeed and earn raffle entries!
                    Fill out the form to send an email to your friends to invite
                    them:
                  </FormLabel>
                  <ReferAFriend />
                  <FormLabel component="legend" className="pt-4">
                    Or use your referral link:
                  </FormLabel>
                  <div>
                    <CopyToClipboard
                      text={`https://travelfeed.io/join?ref=${getUser()}`}
                      onCopy={() =>
                        newNotification({
                          success: true,
                          message:
                            'Copied your referral link to your clipboard',
                        })
                      }
                    >
                      <TextField
                        variant="filled"
                        fullWidth
                        margin="dense"
                        multiline
                        value={`https://travelfeed.io/join?ref=${getUser()}`}
                      />
                    </CopyToClipboard>
                  </div>
                </>
              }
            />
          </div>
        </Grid>
        <Grid item className="p-1" lg={12} md={12} sm={12} xs={12}>
          <RaffleTickets />
        </Grid>
        <Grid item className="p-1" lg={12} md={12} sm={12} xs={12}>
          <Referrals />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default withSnackbar(Contest);
