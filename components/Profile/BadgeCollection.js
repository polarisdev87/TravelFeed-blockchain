import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

const BadgeCollection = props => {
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <Typography gutterBottom variant="h4" className="pt-4">
              {props.title}
            </Typography>{' '}
          </div>
          {props.badges.map(b => {
            return (
              <div className="col-3 col-xl-1 col-lg-1 col-md-2 col-sm-2 text-center">
                <Tooltip
                  disableFocusListener
                  disableTouchListener
                  title={b.name}
                >
                  <span
                    style={{ fontSize: '4em' }}
                    className={`cpointer ${
                      b.visited === false ? ' notvisited' : ''
                    }`}
                  >
                    {b.emoji}
                  </span>
                </Tooltip>
              </div>
            );
          })}
        </div>
      </div>
      <style jsx>{`
        .notvisited {
          opacity: 0.33;
          filter: saturate(0%);
        }
      `}</style>
    </>
  );
};

BadgeCollection.propTypes = {
  badges: PropTypes.arrayOf(PropTypes.any).isRequired,
  title: PropTypes.string.isRequired,
};

export default BadgeCollection;
