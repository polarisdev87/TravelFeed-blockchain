import emojiFlags from 'emoji-flags';
import PropTypes from 'prop-types';
import React from 'react';
import BadgeCollection from './BadgeCollection';

const getBudgetBadge = budget => {
  let level;
  if (budget === 1)
    level = { name: 'Travels only in expensive countries', emoji: '🤑' };
  else if (budget === 2)
    level = { name: 'Travels to some expensive countries', emoji: '💰' };
  else if (budget === 3)
    level = { name: 'Travels in medium-budget countries', emoji: '💵' };
  else if (budget === 4)
    level = { name: 'Travels to many cheap destinations', emoji: '💱' };
  else level = { name: 'Travels in mostly low-budget countries', emoji: '👛' };
  return level;
};

const getExplorerBadge = regionsVisited => {
  let level;
  if (regionsVisited < 2)
    level = {
      name: 'Stay-at-home: Visited less than two regions',
      emoji: '🏠',
    };
  else if (regionsVisited > 12)
    level = {
      name: 'World traveler: Visited more than 12 regions',
      emoji: '🗺',
    };
  else if (regionsVisited > 8)
    level = { name: 'Traveler: Visited more than 8 regions', emoji: '✈️' };
  else if (regionsVisited > 5)
    level = { name: 'Nomad: Visited more than 5 regions', emoji: '🐫' };
  else level = { name: 'Backpacker: Visited less than 5 regions', emoji: '🎒' };
  return level;
};

const getFlagBadge = flagsCollected => {
  let level;
  if (flagsCollected < 8)
    level = {
      name: 'Less than 8 flags collected',
      emoji: '🏳',
    };
  else if (flagsCollected > 70)
    level = { name: 'More than 70 flags collected', emoji: '🏴‍' };
  else if (flagsCollected > 50)
    level = { name: 'More than 50 flags collected', emoji: '🏁' };
  else if (flagsCollected > 30)
    level = { name: ' More than 30 flags collected', emoji: '🎌' };
  else
    level = {
      name: 'More than 7 flags collected',
      emoji: '🚩',
    };
  return level;
};

const getBloggerBadge = totalPosts => {
  let level;
  if (totalPosts < 6)
    level = {
      name: 'Less than 6 posts published',
      emoji: '🥉',
    };
  else if (totalPosts > 70)
    level = { name: 'More than 70 posts published', emoji: '🥇' };
  else if (totalPosts > 50)
    level = { name: 'More than 50 posts published', emoji: '🏅' };
  else if (totalPosts > 30)
    level = { name: 'More than 30 posts published', emoji: '🎖️' };
  else level = { name: 'More than 5 posts published', emoji: '🥈' };
  return level;
};

const Badges = props => {
  const { countryCodes, regions, budget, totalPosts } = props;

  const countries = [];
  countryCodes.forEach(cc => {
    countries.push(emojiFlags.countryCode(cc.toUpperCase()));
  });
  let regionsVisited = 0;
  regions.forEach(r => {
    if (r.visited) regionsVisited += 1;
  });

  const explorerBadge = getExplorerBadge(regionsVisited);
  const flagBadge = getFlagBadge(countryCodes.length);
  const budgetBadge = getBudgetBadge(budget);
  const bloggerBadge = getBloggerBadge(totalPosts);

  return (
    <>
      <BadgeCollection
        badges={[explorerBadge, flagBadge, budgetBadge, bloggerBadge]}
        title="Badges"
      />
      <BadgeCollection
        badges={regions}
        title={`Regions visited: ${regionsVisited}`}
      />
      <BadgeCollection
        badges={countries}
        title={`Flags collected: ${countryCodes.length}`}
      />
    </>
  );
};

Badges.propTypes = {
  countryCodes: PropTypes.arrayOf(PropTypes.string).isRequired,
  regions: PropTypes.arrayOf(PropTypes.any).isRequired,
  budget: PropTypes.number.isRequired,
  totalPosts: PropTypes.number.isRequired,
};

export default Badges;
