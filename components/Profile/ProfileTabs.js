import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { Query } from 'react-apollo';
import { GET_GEOJSON } from '../../helpers/graphql/geojson';
import { GET_AUTHOR_POST_LOCATIONS } from '../../helpers/graphql/posts';
import PostGrid from '../Grid/PostGrid';
import MapCluster from '../Maps/MapCluster';
import Badges from './Badges';

const TabPanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      <Box>{children}</Box>
    </Typography>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = index => {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
};

const LinkTab = props => {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
    />
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.dark,
  },
}));

const ProfileTabs = props => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { author } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Blog" {...a11yProps(0)} />
          <LinkTab label="Map" {...a11yProps(1)} />
          <LinkTab label="Badges" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <Query
        query={GET_AUTHOR_POST_LOCATIONS}
        variables={{ author, limit: Infinity }}
      >
        {({ data }) => {
          const country_codes = [];
          if (data && data.posts) {
            data.posts.forEach(d => {
              if (
                d.country_code &&
                country_codes.indexOf(d.country_code) === -1
              )
                country_codes.push(d.country_code);
            });
          }
          return (
            <Query
              query={GET_GEOJSON}
              variables={{ countryList: country_codes }}
            >
              {res => {
                let dataLayer;
                if (res.data && res.data.geojson) {
                  const features = JSON.parse(res.data.geojson.features);
                  dataLayer = {
                    type: 'FeatureCollection',
                    features,
                  };
                  return (
                    <>
                      <TabPanel value={value} index={0}>
                        <div
                          className="container pt-1 pb-2"
                          id="containerInvisibleOnMobile"
                        >
                          <PostGrid
                            active="blog"
                            query={{ author, limit: 12 }}
                            grid={{ lg: 4, md: 4, sm: 6, xs: 12 }}
                            cardHeight={220}
                          />
                        </div>
                        <style>{`
                        @media (max-width: 992px) {
                          #containerInvisibleOnMobile {
                            padding: 0;
                            margin: 0;
                          }
                        }
                        `}</style>
                      </TabPanel>
                      <TabPanel value={value} index={1}>
                        <div className="w-100">
                          <div style={{ overflowX: 'hidden' }}>
                            <div
                              style={{
                                flexDirection: 'row',
                                transition: 'all 0s ease 0s',
                                direction: 'ltr',
                                display: 'flex',
                                willChange: 'transform',
                                transform: 'translate(0%, 0px)',
                              }}
                            >
                              <div
                                aria-hidden="false"
                                style={{
                                  width: '100%',
                                  flexShrink: 0,
                                  overflow: 'auto',
                                }}
                              >
                                <div
                                  style={{ height: '500px', width: '100%' }}
                                  className="w-100 p-0 m-0"
                                >
                                  <MapCluster
                                    dataLayer={dataLayer}
                                    showControls={false}
                                    height="530px"
                                    className="w-100 h-100"
                                    data={data && data.posts}
                                    dark={theme.palette.type === 'dark'}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabPanel>
                      <TabPanel value={value} index={2}>
                        <div className="container pt-2 pb-4">
                          <Badges
                            countryCodes={country_codes}
                            regions={res.data.geojson.regions}
                            budget={res.data.geojson.budget}
                            totalPosts={data && data.posts.length}
                          />
                        </div>
                      </TabPanel>
                    </>
                  );
                }
                return <></>;
              }}
            </Query>
          );
        }}
      </Query>
    </div>
  );
};

ProfileTabs.propTypes = {
  author: PropTypes.string,
};

export default ProfileTabs;
