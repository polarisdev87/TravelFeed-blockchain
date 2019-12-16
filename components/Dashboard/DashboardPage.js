import React, { useEffect, useState } from 'react';
import { getUser } from '../../helpers/token';
import ErrorPage from '../General/ErrorPage';
import Head from '../Header/Head';
import DashboardMenu from './DashboardMenu';

const DashboardPage = props => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  const { open } = props;

  if (user !== null) {
    return (
      <>
        <Head
          title={`TravelBlog: ${props.label.charAt(0).toUpperCase() +
            props.label.slice(1)}`}
          noIndex
          includeMapbox={props.includeMapbox}
        />
        <DashboardMenu
          active={props.label}
          content={
            (!user && <ErrorPage statusCode="logged_out" />) || props.content
          }
          open={open}
        />
      </>
    );
  }
  return (
    <>
      <Head
        title={`TravelBlog: ${props.label.charAt(0).toUpperCase() +
          props.label.slice(1)}`}
        noIndex
      />
      <DashboardMenu active={props.label} content={<></>} open={open} />
    </>
  );
};

export default DashboardPage;
