import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import MapIcon from '@material-ui/icons/Map';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { Query } from 'react-apollo';
import { getBudgetScore } from '../../helpers/budgetScore';
import { nameFromSlug } from '../../helpers/countryCodes';
import { imageProxy } from '../../helpers/getImage';
import { GET_LOCATION_DETAILS } from '../../helpers/graphql/locations';
import supportsWebp from '../../helpers/webp';
import Link from '../../lib/Link';
import PopularDestinationsPopup from '../Destinations/PopularDestinationsPopup';
import Head from '../Header/Head';
import EditLocationDetails from './EditLocationDetails';
import TopicSelector from './TopicSelector';

const PhotoDetailHeader = props => {
  const { query, countrySlug, title, tag } = props;
  const [screenWidth, setScreenWidth] = useState(1920);
  const [webpSupport, setWebpSupport] = useState(undefined);

  useEffect(() => {
    setScreenWidth(Math.ceil(window.innerWidth / 100) * 100);
    const getWebpSupport = async () => {
      const isWebp = await supportsWebp();
      return isWebp;
    };
    const webp = getWebpSupport();
    setWebpSupport(webp);
  }, []);

  const countryName = nameFromSlug(countrySlug);

  return (
    <Fragment>
      <Query query={GET_LOCATION_DETAILS} variables={query}>
        {({ data, loading }) => {
          const detailTitle =
            (data && data.locationDetails && data.locationDetails.title) ||
            title;
          let description = `${
            tag ? `Discover ${detailTitle}` : `Visit ${detailTitle}`
          }: ${
            data &&
            data.locationDetails.budget_score &&
            data.locationDetails.budget_score < 3
              ? `Traveling ${detailTitle} is affordable and exciting! `
              : ''
          }`;
          if (
            data &&
            !data.locationDetails.url &&
            data.locationDetails.description
          )
            description += `${data.locationDetails.description} `;
          description += `Explore the best places to visit, discover insider's tips, find out what to do${
            data &&
            data.locationDetails.budget_score &&
            data.locationDetails.budget_score > 4
              ? ` in ${detailTitle} on a budget`
              : ''
          } and read the top travel blogs about ${detailTitle} on TravelFeed!`;
          if (loading || (data && data.locationDetails)) {
            return (
              <Fragment>
                <Head
                  noIndex={props.noIndex}
                  shorttitle={`${detailTitle}: Top Travel Blogs`}
                  description={description}
                />
                <div
                  className="w-100"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0,0.5)),
                      url("${(data &&
                        data.locationDetails.unsplashUser &&
                        data.locationDetails.image) ||
                        (data &&
                          data.locationDetails.image &&
                          imageProxy(
                            data.locationDetails.image,
                            screenWidth,
                            500,
                            undefined,
                            webpSupport ? 'webp' : undefined,
                          )) ||
                        ''}")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                  }}
                >
                  <div className="container h-100">
                    <div
                      className="row h-100 justify-content-center"
                      style={{ minHeight: '400px' }}
                    >
                      <div className="col-xl-7 col-lg-8 col-md-9 col-sm-10 col-12 my-auto">
                        <Typography
                          variant="h6"
                          align="center"
                          className="text-light font-weight-bold"
                          style={{
                            textShadow: '1px 1px 20px #343A40',
                          }}
                          component="h5"
                        >
                          {// For cities, display breadcrumbs to Country and Subdivison. Else, display Knowledge Graph subtitle, if unavailable country name
                          (tag && `#${tag}`) ||
                            (query.city && (
                              <span>
                                <Link
                                  color="textPrimary"
                                  as={`/destinations/${countrySlug}/`}
                                  href={`/destinations?country=${countrySlug}`}
                                >
                                  <span className="text-light font-weight-bold">
                                    {countryName}
                                  </span>
                                </Link>
                                <span className="text-light">
                                  {' '}
                                  &raquo;{' '}
                                  <Link
                                    color="textPrimary"
                                    as={`/destinations/${countrySlug}/${query.subdivision}`}
                                    href={`/destinations?country=${countrySlug}&subdivision=${query.subdivision}`}
                                  >
                                    <span className="text-light font-weight-bold">
                                      {query.subdivision}
                                    </span>
                                  </Link>
                                </span>{' '}
                              </span>
                            )) ||
                            (((query.search && !query.country_code) ||
                              query.subdivision ||
                              query.city) && (
                              <Link
                                color="textPrimary"
                                as={`/destinations/${countrySlug}/`}
                                href={`/destinations?country=${countrySlug}`}
                              >
                                <span className="text-light font-weight-bold">
                                  {(data && data.locationDetails.subtitle) ||
                                    countryName}
                                </span>
                              </Link>
                            ))}
                          {!props.noEdit && (
                            <EditLocationDetails
                              country_code={props.query.country_code}
                              subdivision={props.query.subdivision}
                              city={props.query.city}
                              tag={tag}
                              data={
                                data && data.locationDetails
                                  ? data.locationDetails
                                  : {}
                              }
                            />
                          )}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="h2"
                          component="h1"
                          className="text-light font-weight-bold text-center"
                          style={{
                            textShadow: '1px 1px 10px #343A40',
                          }}
                        >
                          {detailTitle}
                        </Typography>
                        <Typography
                          gutterBottom
                          className="lead text-light text-center"
                          variant="h6"
                          style={{
                            textShadow: '1px 1px 10px black',
                          }}
                        >
                          <em>
                            {(data && data.locationDetails.description) || (
                              <>
                                <br />
                                <br />
                              </>
                            )}
                          </em>
                        </Typography>
                        <div className="text-center">
                          {!tag && (
                            <>
                              <Link href={`/map?search=${title}`}>
                                <Button
                                  className="m-2"
                                  variant="contained"
                                  color="primary"
                                >
                                  <span className="pr-1">Explore the map</span>
                                  <MapIcon />
                                </Button>
                              </Link>
                            </>
                          )}
                          {data &&
                            data.locationDetails.sublocations &&
                            data &&
                            data.locationDetails.sublocations.length > 1 && (
                              <PopularDestinationsPopup
                                title={detailTitle}
                                countrySlug={countrySlug}
                                subdivision={query.subdivision}
                                destinations={data.locationDetails.sublocations}
                              />
                            )}
                          {data && data.locationDetails.budget_score && (
                            <Tooltip
                              title={getBudgetScore(
                                data.locationDetails.budget_score,
                                detailTitle,
                              )}
                            >
                              <Typography
                                component="p"
                                variant="h4"
                                className="pt-2 text-light font-weight-bold"
                              >
                                {'$'.repeat(data.locationDetails.budget_score)}
                              </Typography>
                            </Tooltip>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="text-mutedlight text-right pr-1"
                    style={{ fontSize: '0.8rem' }}
                  >
                    {data && data.locationDetails.url && (
                      <span>
                        Description by{' '}
                        <a
                          className="text-mutedlight text-decoration-underline"
                          target="_blank"
                          rel="nofollow noreferrer noopener"
                          href={data && data.locationDetails.url}
                        >
                          Wikipedia
                        </a>{' '}
                        under{' '}
                        <a
                          className="text-mutedlight text-decoration-underline"
                          target="_blank"
                          rel="nofollow noreferrer noopener"
                          href={data && data.locationDetails.license}
                        >
                          CC BY-SA 3.0
                        </a>
                        .{' '}
                      </span>
                    )}
                    {data && data.locationDetails.attribution && (
                      <span>
                        Photo:{' '}
                        {(data && data.locationDetails.unsplashUser && (
                          <a
                            className="text-mutedlight text-decoration-underline"
                            target="_blank"
                            rel="nofollow noreferrer noopener"
                            href={`https://unsplash.com/@${data &&
                              data.locationDetails
                                .unsplashUser}?utm_source=TravelFeed&utm_medium=referral`}
                          >
                            {data && data.locationDetails.attribution}
                          </a>
                        )) || (
                          <span className="text-mutedlight">
                            {data && data.locationDetails.attribution}
                          </span>
                        )}{' '}
                        {data && data.locationDetails.unsplashUser && (
                          <span>
                            /{' '}
                            <a
                              target="_blank"
                              rel="nofollow noreferrer noopener"
                              href="https://unsplash.com/?utm_source=TravelFeed&utm_medium=referral"
                              className="text-mutedlight text-decoration-underline"
                            >
                              Unsplash
                            </a>
                          </span>
                        )}
                      </span>
                    )}
                  </div>
                </div>
                {data && data.locationDetails.topics && (
                  <TopicSelector
                    topics={data.locationDetails.topics}
                    active={props.topic}
                    onChange={props.setTopic}
                  />
                )}
              </Fragment>
            );
          }
          return <Fragment />;
        }}
      </Query>
    </Fragment>
  );
};

PhotoDetailHeader.propTypes = {
  query: PropTypes.objectOf(PropTypes.string).isRequired,
  countrySlug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default PhotoDetailHeader;
