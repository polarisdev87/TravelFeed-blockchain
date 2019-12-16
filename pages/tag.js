import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import PhotoDetailHeader from '../components/General/PhotoDetailHeader';
import PostGrid from '../components/Grid/PostGrid';
import Header from '../components/Header/Header';
import capitalize from '../helpers/capitalize';

class TagPage extends Component {
  static async getInitialProps(props) {
    const { tags } = props.query;
    return {
      tags,
    };
  }

  render() {
    return (
      <Fragment>
        <Header active="tag" />
        <PhotoDetailHeader
          tag={this.props.tags}
          query={{ tag: this.props.tags }}
          title={capitalize(this.props.tags)}
        />
        <div className="pb-2">
          <div className="container" id="containerInvisibleOnMobile">
            <PostGrid
              active="topic"
              query={{
                tags: this.props.tags,
                orderby: 'curation_score DESC, total_votes',
                limit: 9,
              }}
              grid={{ lg: 4, md: 4, sm: 6, xs: 12 }}
              cardHeight={200}
              poststyle="grid"
            />
          </div>
        </div>
        <style>{`
        @media (max-width: 992px) {
          #containerInvisibleOnMobile {
            padding: 0;
            margin: 0;
          }
        }
        `}</style>
      </Fragment>
    );
  }
}

TagPage.propTypes = {
  tags: PropTypes.string.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  query: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TagPage;
