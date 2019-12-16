import PropTypes from 'prop-types';
import React from 'react';
import PostPreview from '../Post/PostPreview';
import PostList from './PostList';

const MapCard = props => {
  return (
    <div>
      {(props.info.posts && (
        <div style={{ width: '300px', maxHeight: '350px', overflow: 'scroll' }}>
          <PostList info={props.info} />
        </div>
      )) || (
        <div style={{ width: '300px' }}>
          <PostPreview
            author={props.info.author}
            permlink={props.info.permlink}
            title={props.info.title}
            img_url={props.info.img_url}
          />
        </div>
      )}
    </div>
  );
};

MapCard.propTypes = {
  info: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default MapCard;
