import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import CurateIcon from '@material-ui/icons/Star';
import EmptyIcon from '@material-ui/icons/StarBorder';
import HonourIcon from '@material-ui/icons/StarHalf';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(() => ({
  iconButton: {
    marginLeft: '-3px',
    paddingBottom: '3px',
  },
}));

const IsCurated = props => {
  const classes = useStyles();
  const { curationScore, isTf } = props;

  if (!isTf && curationScore < 4000) return <></>;
  return (
    <>
      <Tooltip
        placement="bottom"
        title={
          (curationScore > 8000 &&
            `Top pick ${isTf ? 'and TravelFeed.io Original' : ''}`) ||
          (curationScore > 4000 &&
            `Honorable pick ${isTf ? 'and TravelFeed.io Original' : ''}`) ||
          'TravelFeed.io Original'
        }
      >
        <div className="d-inline">
          <IconButton
            size="small"
            edge="start"
            disabled
            className={classes.iconButton}
          >
            {(curationScore > 8000 && (
              <CurateIcon
                className={classes.iconButton}
                color={isTf ? 'primary' : undefined}
              />
            )) ||
              (curationScore > 4000 && (
                <HonourIcon
                  className={classes.iconButton}
                  color={isTf ? 'primary' : undefined}
                />
              )) || (
                <EmptyIcon className={classes.iconButton} color="primary" />
              )}
          </IconButton>
        </div>
      </Tooltip>
      <span>· </span>
    </>
  );
};

IsCurated.propTypes = {
  curationScore: PropTypes.number.isRequired,
};

export default IsCurated;
