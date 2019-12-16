import {
  faBiking,
  faCamera,
  faCampground,
  faFolderOpen,
  faInfo,
  faStarHalfAlt,
  faStore,
  faThumbsUp,
  faUtensils,
  faWifi,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import React, { useState } from 'react';

const allTopics = [
  {
    label: 'All Topics',
    tag: undefined,
    icon: (
      <FontAwesomeIcon
        style={{
          width: '22px',
          height: '22px',
          marginBottom: '5px',
        }}
        icon={faFolderOpen}
      />
    ),
  },
  {
    label: 'Advice',
    tag: 'traveladvice',
    icon: (
      <FontAwesomeIcon
        style={{
          width: '22px',
          height: '22px',
          marginBottom: '5px',
        }}
        icon={faInfo}
      />
    ),
  },
  {
    label: 'Photography',
    tag: 'photography',
    icon: (
      <FontAwesomeIcon
        style={{
          width: '22px',
          height: '22px',
          marginBottom: '5px',
        }}
        icon={faCamera}
      />
    ),
  },
  {
    label: 'Food',
    tag: 'foodoftheworld',
    icon: (
      <FontAwesomeIcon
        style={{
          width: '22px',
          height: '22px',
          marginBottom: '5px',
        }}
        icon={faUtensils}
      />
    ),
  },
  {
    label: 'Markets',
    tag: 'marketfriday',
    icon: (
      <FontAwesomeIcon
        style={{
          width: '22px',
          height: '22px',
          marginBottom: '5px',
        }}
        icon={faStore}
      />
    ),
  },
  {
    label: 'Digital Nomads',
    tag: 'digitalnomads',
    icon: (
      <FontAwesomeIcon
        style={{
          width: '22px',
          height: '22px',
          marginBottom: '5px',
        }}
        icon={faWifi}
      />
    ),
  },
  {
    label: 'Review',
    tag: 'review',
    icon: (
      <FontAwesomeIcon
        style={{
          width: '22px',
          height: '22px',
          marginBottom: '5px',
        }}
        icon={faStarHalfAlt}
      />
    ),
  },
  {
    label: 'Cycling',
    tag: 'cyclefeed',
    icon: (
      <FontAwesomeIcon
        style={{
          width: '22px',
          height: '22px',
          marginBottom: '5px',
        }}
        icon={faBiking}
      />
    ),
  },
  ,
  {
    label: 'Hitchhiking',
    tag: 'hitchhiking',
    icon: (
      <FontAwesomeIcon
        style={{
          width: '22px',
          height: '22px',
          marginBottom: '5px',
        }}
        icon={faThumbsUp}
      />
    ),
  },
  ,
  {
    label: 'Outdoor',
    tag: 'outdoor',
    icon: (
      <FontAwesomeIcon
        style={{
          width: '22px',
          height: '22px',
          marginBottom: '5px',
        }}
        icon={faCampground}
      />
    ),
  },
];

const TopicSelector = props => {
  const [value, setValue] = useState(0);

  const topics = JSON.parse(props.topics);
  const selectedTopics = [allTopics[0]];

  allTopics.forEach(topic => {
    if (topics.indexOf(topic.tag) !== -1) selectedTopics.push(topic);
  });

  return (
    <>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          props.onChange(selectedTopics[newValue].tag);
        }}
        showLabels
      >
        {selectedTopics.map(topic => {
          return (
            <BottomNavigationAction label={topic.label} icon={topic.icon} />
          );
        })}
      </BottomNavigation>
    </>
  );
};

export default TopicSelector;
