import { useTheme } from '@material-ui/styles';
import React from 'react';

const HrCaption = props => {
  const theme = useTheme();

  return (
    <>
      <hr className="hr-text" data-content={props.text.toUpperCase()} />
      <style jsx>{`
        .hr-text {
          line-height: 1em;
          position: relative;
          outline: 0;
          border: 0;
          color: black;
          text-align: center;
          height: 1.5em;
          opacity: 0.5;
        }
        .hr-text:before {
          content: '';
          background: linear-gradient(
            to right,
            transparent,
            #818078,
            transparent
          );
          position: absolute;
          left: 0;
          top: 50%;
          width: 100%;
          height: 1px;
        }
        .hr-text:after {
          content: attr(data-content);
          position: relative;
          display: inline-block;
          color: black;
          padding: 0 0.5em;
          line-height: 1.5em;
          color: #818078;
          background-color: ${theme.palette.background.paper};
        }
      `}</style>
    </>
  );
};

export default HrCaption;
