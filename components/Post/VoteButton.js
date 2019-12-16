import React from 'react';

const VoteButton = props => {
  const { weight } = props;

  return (
    <>
      {(weight < -8 && (
        <span className="emoji" role="img" aria-label="Down">
          🤬
        </span>
      )) ||
        (weight < -6 && (
          <span className="emoji" role="img" aria-label="Down">
            😤
          </span>
        )) ||
        (weight < -4 && (
          <span className="emoji" role="img" aria-label="Down">
            😟
          </span>
        )) ||
        (weight < -2 && (
          <span className="emoji" role="img" aria-label="Down">
            🙁
          </span>
        )) ||
        (weight < 0 && (
          <span className="emoji" role="img" aria-label="Down">
            😕
          </span>
        )) ||
        (weight < 3 && (
          <span className="emoji" role="img" aria-label="Up">
            🙂
          </span>
        )) ||
        (weight < 5 && (
          <span className="emoji" role="img" aria-label="Up">
            😊
          </span>
        )) ||
        (weight < 7 && (
          <span className="emoji" role="img" aria-label="Up">
            😃
          </span>
        )) ||
        (weight < 9 && (
          <span className="emoji" role="img" aria-label="Up">
            😁
          </span>
        )) || (
          <span className="emoji" role="img" aria-label="Up">
            😍
          </span>
        )}
      <style jsx>{`
        .emoji {
          // Override any img styles to ensure Emojis are displayed inline
          margin: 0px !important;
          display: inline !important;
          height: auto;
          font-size: ${props.size}px;
          vertical-align: middle;
          line-height: 1;
        }
      `}</style>
    </>
  );
};

export default VoteButton;
