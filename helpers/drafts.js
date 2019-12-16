import getSlug from 'speakingurl';

export const generateDraftId = user => {
  return `${user}-${getSlug(new Date().toJSON()).replace(/-/g, '')}`;
};
