import React from 'react';
import Link from '../../lib/Link';

const SliderTags = props => {
  const { tags } = props;

  return (
    <>
      <div className="textPrimary postcontent postCardContent">
        Topics:{' '}
        {tags &&
          tags.map(tag => {
            return (
              <Link
                color="textPrimary"
                as={`/topics/${tag}`}
                href={`/tag?tags=${tag}`}
                key={tag}
              >
                <span className="badge badge-secondary m-1 p-1 pl-2 pr-2 rounded">
                  {tag ? tag.toUpperCase() : 'TRAVELFEED'}
                </span>
              </Link>
            );
          })}
      </div>
      <style>{`
      @media (min-width: 768px) {
      .tags { text-align: right}
      }
      `}</style>
    </>
  );
};

export default SliderTags;
