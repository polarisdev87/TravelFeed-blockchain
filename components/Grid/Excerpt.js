// http://hackingui.com/front-end/a-pure-css-solution-for-multiline-text-truncation/

import Typography from '@material-ui/core/Typography';
import React from 'react';

const Excerpt = props => {
  const { title, text } = props;
  return (
    <>
      {title && (
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          className="preview-title"
        >
          {title}
        </Typography>
      )}
      {text && (
        <Typography component="p" className="preview-text">
          {text
            .replace(/&amp;/g, '&')
            .replace(/!([a-zA-Z])/g, '! $1')
            .substring(0, 300)}
        </Typography>
      )}
      <style>{`
    .preview-title {
      line-height: 1.5em;
      max-height: 4.5em;
      overflow: hidden;
      position: relative;
    }
    .preview-text {
      line-height: 1.5em;
      max-height: 4.5em;
      overflow: hidden;
      position: relative;
      text-align: justify;
    }
    `}</style>
    </>
  );
};

export default Excerpt;
