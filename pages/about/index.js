import { teal } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import React, { Fragment } from 'react';
import AboutSelect from '../../components/About/AboutSelect';
import Team from '../../components/About/Team';
import HeaderCard from '../../components/General/HeaderCard';
import Head from '../../components/Header/Head';
import Header from '../../components/Header/Header';

const AboutPage = () => {
  const title = 'About';
  return (
    <Fragment>
      <Header subheader={title} />
      <Head title={`${title}`} />
      <AboutSelect selection={0} />
      <Grid
        container
        spacing={0}
        alignItems="center"
        justify="center"
        className="pt-4 pb-4"
      >
        <Grid item lg={7} md={8} sm={11} xs={12}>
          <HeaderCard
            title={title}
            background={teal[600]}
            content={
              <div className="textPrimary postcontent">
                <p>
                  Welcome to TravelFeed! We are a group of travelers who came
                  together to build the platform that we always wanted to have:
                  a global community of independent travelers, where it’s easy
                  to meet new people and find information, and where bloggers
                  can monetize high-quality posts.
                </p>
                <p>
                  While there are some large, well-established platforms aimed
                  at tourists looking for information on sights, tour packages
                  and hotels, there’s no major platform that provides content
                  created by independent travelers for independent travelers.
                  There’s a huge number of people looking for genuine
                  experiences and off-the-beaten-track destinations, and they
                  need a place where they can find recommendations… and
                  contribute their own.
                </p>
                <p>
                  As a niche market, “Travel” features an unusual abundance of
                  small blogs with high-quality content. These blogs often
                  contain exactly the information that travelers are looking
                  for, but in most cases, they’re hard to find. Independent
                  blogs simply can’t keep up with the search-engine optimization
                  of large sites. And due to the small exposure, travel bloggers
                  struggle to earn the income they deserve. Many turn to large
                  social media networks, which have in the past few years made
                  it easy to gain followers.
                </p>
                <p>
                  The trend, however, is that these large platforms would rather
                  keep readers on their sites, and have been throttling traffic
                  toward the originating blogs. These social media platforms
                  inject their own ads between content that others have created,
                  without sharing the profits. To add insult to injury, they
                  even demand that creators buy ads if they want their followers
                  to see their posts. Also, these social networks are only made
                  to discover new posts, not to research destinations.
                </p>
                <p>
                  At the same time, travel communities are split over several
                  platforms such as groups on Facebook, Couchsurfing,
                  TripAdvisor or smaller forums. Contacting the author of a post
                  is usually done either in the comment area or by email.
                  TravelFeed, on the other hand, is a community of travelers and
                  travel bloggers where readers can easily chat with their
                  favorite authors.
                </p>
                <p>
                  With full-scale manual curation, we make sure that the best
                  posts get the visibility they deserve, often months or even
                  years after they’ve been published. Content is monetized
                  through the Steem Blockchain where creators get rewarded with
                  cryptocurrency. This is the perfect blockchain for travelers:
                  set out on a new adventure, write about it on TravelFeed, and
                  be rewarded with real money. It’s a dream come true, to get on
                  the road, and get paid for doing what you love? At TravelFeed,
                  we’re working hard to make this a reality.
                </p>
                <p>
                  Come and join us to get access to a fast-growing community of
                  like-minded people!
                </p>
              </div>
            }
          />
        </Grid>
        <Grid item lg={7} md={8} sm={11} xs={12} className="pt-3">
          <HeaderCard title="Team" background={teal[600]} content={<Team />} />
        </Grid>
      </Grid>
    </Fragment>
  );
};

AboutPage.getInitialProps = () => {};

export default AboutPage;
