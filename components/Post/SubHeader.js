import Tooltip from '@material-ui/core/Tooltip';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import cleanTags from '../../helpers/cleanTags';
import { nameFromCC, slugFromCC } from '../../helpers/countryCodes';
import Link from '../../lib/Link';
import IsCurated from './IsCurated';

dayjs.extend(relativeTime, LocalizedFormat); // use plugin

const SubHeader = props => {
  const { created_at, readtime, location, tags } = props;
  const taglist = cleanTags(tags, {});
  const tag = taglist && taglist[0] ? taglist[0] : undefined;
  let createdAt;
  if (!created_at) createdAt = dayjs();
  else createdAt = dayjs(created_at);

  const country =
    location.country_code !== null
      ? nameFromCC(location.country_code)
      : undefined;
  const countryslug =
    location.country_code !== null
      ? slugFromCC(location.country_code)
      : undefined;

  return (
    <Fragment>
      {(props.curationScore !== undefined || props.isTf !== undefined) && (
        <IsCurated isTf={props.isTf} curationScore={props.curationScore} />
      )}
      <Tooltip title={createdAt.format('MMMM DD YYYY H:mm')} placement="bottom">
        <span>
          {createdAt.isBefore(
            dayjs()
              .startOf('month')
              .add(-1, 'month'),
          )
            ? createdAt.format('MMMM YYYY')
            : createdAt.fromNow()}
        </span>
      </Tooltip>
      {readtime && (
        <Fragment>
          <span> · </span>
          <Tooltip title={`${readtime.words} words`} placement="bottom">
            <span>{readtime.text}</span>
          </Tooltip>
        </Fragment>
      )}
      {country && (
        <Fragment>
          <span> · </span>
          <Link
            color="textSecondary"
            as={`/destinations/${countryslug}/${
              location.subdivision !== null ? location.subdivision : ''
            }/`}
            href={`/destinations?country=${countryslug}${
              location.subdivision !== null
                ? `&subdivision=${location.subdivision}`
                : ''
            }`}
          >
            <Tooltip
              title={`${
                location.subdivision !== null ? `${location.subdivision}, ` : ''
              } ${country}`}
              placement="bottom"
            >
              <span>{country}</span>
            </Tooltip>
          </Link>
        </Fragment>
      )}
      {tag && (
        <>
          <span> · </span>
          <Link
            color="textSecondary"
            as={`/topics/${tag}`}
            href={`/tag?tags=${tag}`}
            key={tag}
          >
            <span>#{tag}</span>
          </Link>
        </>
      )}
    </Fragment>
  );
};

SubHeader.defaultProps = {
  readtime: undefined,
  location: {},
};

SubHeader.propTypes = {
  created_at: PropTypes.string.isRequired,
  readtime: PropTypes.objectOf(PropTypes.any),
  location: PropTypes.objectOf(PropTypes.any),
};

export default SubHeader;
