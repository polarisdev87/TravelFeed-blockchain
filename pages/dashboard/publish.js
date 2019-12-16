import dynamic from 'next/dynamic';
import React from 'react';
import DashboardPage from '../../components/Dashboard/DashboardPage';

const PublishPage = props => {
  const { open, permlink, draftId, clone } = props;

  const Publish = dynamic(() => import('../../components/Dashboard/Publish'), {
    ssr: false,
  });

  return (
    <DashboardPage
      includeMapbox
      open={open}
      label="publish"
      content={<Publish permlink={permlink} draftId={draftId} clone={clone} />}
    />
  );
};

PublishPage.getInitialProps = props => {
  const { permlink, draftId, open, clone } = props.query;
  return {
    permlink,
    draftId,
    clone,
    open,
  };
};

export default PublishPage;
