import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import DiscoverIcon from '@material-ui/icons/Explore';
import FeedIcon from '@material-ui/icons/Favorite';
import HotIcon from '@material-ui/icons/FlightTakeoff';
import NewIcon from '@material-ui/icons/Restore';
import FeaturedIcon from '@material-ui/icons/Star';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getUser } from '../../helpers/token';

const HomeOrderBySelect = props => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  return (
    <Paper square>
      <Tabs
        value={props.selection}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Link href="/created">
          <Tab icon={<NewIcon />} label="NEW" />
        </Link>
        <Link href="/hot">
          <Tab icon={<HotIcon />} label="TAKING OFF" />
        </Link>
        <Link href="/discover">
          <Tab icon={<DiscoverIcon />} label="DISCOVER" />
        </Link>
        <Link href="/">
          <Tab icon={<FeaturedIcon />} label="FEATURED" />
        </Link>
        {user && (
          <Link href="/feed">
            <Tab icon={<FeedIcon />} label="FEED" />
          </Link>
        )}
      </Tabs>
    </Paper>
  );
};

HomeOrderBySelect.propTypes = {
  selection: PropTypes.number.isRequired,
};

export default HomeOrderBySelect;
