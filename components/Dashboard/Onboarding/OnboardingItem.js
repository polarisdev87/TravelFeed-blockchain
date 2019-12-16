import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import DetailedExpansionPanel from '../../Editor/DetailedExpansionPanel';
import EditorPreview from '../../Editor/EditorPreview';
import AuthorProfileHeader from '../../Profile/AuthorProfileHeader';
import ReviewButton from './ReviewButton';

const OnboardingItem = props => {
  const [show, setShow] = useState(true);
  const { acc } = props;
  const accountMetadata = JSON.parse(acc.accountMetadata);
  const { post } = acc;
  const tags = JSON.parse(acc.tags);
  const { name, about, profile_image, cover_image } = accountMetadata;
  return (
    <>
      {show && (
        <DetailedExpansionPanel
          fullWidth
          title={acc.email}
          selector={
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-xl-8 col-lg-9 col-md-10 col-sm-12 col-12">
                  <Typography
                    variant="h4"
                    className="textSecondary"
                    align="center"
                    gutterBottom
                  >
                    Profile
                  </Typography>
                  <div>
                    <AuthorProfileHeader
                      data={{
                        display_name: name,
                        about,
                        cover_image,
                        profile_image,
                      }}
                    />
                  </div>
                  <Typography
                    variant="h4"
                    className="textSecondary"
                    align="center"
                    gutterBottom
                  >
                    Post
                  </Typography>
                  <EditorPreview
                    author="null"
                    fullsize
                    img_url={cover_image}
                    title={`Introducing myself to TravelFeed: ${name}`}
                    // permlink={permlink}
                    readtime={{ words: 0, text: '0 min read' }}
                    content={post}
                    tags={tags}
                  />
                </div>
              </div>
            </div>
          }
          actions={
            <>
              <ReviewButton
                email={acc.email}
                isApproved={false}
                text="reject"
                onDelete={() => setShow(false)}
              />
              <ReviewButton
                email={acc.email}
                isApproved
                text="approve"
                onDelete={() => setShow(false)}
              />
            </>
          }
        />
      )}
    </>
  );
};

export default OnboardingItem;
