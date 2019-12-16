import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React from 'react';
import parseBody from '../../helpers/parseBody';
import parseHtmlToReact from '../../helpers/parseHtmlToReact';
import { getUser } from '../../helpers/token';
import PostContent from '../Post/PostContent';
import PostTitle from '../Post/PostTitle';

const EditorPreview = props => {
  let bodyText = <br />;
  if (props.content && props.content.length > 1) {
    const htmlBody = parseBody(props.content, { lazy: false });
    bodyText = parseHtmlToReact(htmlBody, {
      parseLinksToBlank: true,
      lazy: false,
    });
  }
  return (
    <div>
      <Grid container spacing={0} alignItems="center" justify="center">
        {!props.authorNotClickable && (
          <PostTitle img_url={props.img_url} title={props.title} />
        )}
        <Grid
          item
          lg={props.fullsize ? 12 : 7}
          md={props.fullsize ? 12 : 8}
          sm={props.fullsize ? 12 : 11}
          xs={12}
          className="pb-4"
        >
          <Card>
            <PostContent
              authorAvatar={props.authorAvatar}
              authorNotClickable={props.authorNotClickable}
              author={props.author}
              permlink={props.permlink}
              display_name={props.author}
              readtime={props.readtime}
              content={
                <div className="textPrimary postcontent postCardContent">
                  {bodyText}
                </div>
              }
              latitude={props.latitude}
              longitude={props.longitude}
            />
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

EditorPreview.defaultProps = {
  author: getUser(),
  img_url: '',
  content: '',
  title: '',
  permlink: '',
  latitude: undefined,
  longitude: undefined,
};

EditorPreview.propTypes = {
  readtime: PropTypes.arrayOf(PropTypes.any).isRequired,
  img_url: PropTypes.string,
  content: PropTypes.string,
  title: PropTypes.string,
  permlink: PropTypes.string,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  author: PropTypes.string,
};

export default EditorPreview;
