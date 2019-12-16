import parseBody from './parseBody';
import { allLinks, allMentions, imgFullSize } from './regex';

export const getImageList = body => {
  const matchList = [];
  let parsedBody = parseBody(body, { parseImages: false });
  let matches = imgFullSize.exec(parsedBody);
  while (matches !== null) {
    matches = imgFullSize.exec(parsedBody);
    if (matches !== null) {
      if (!matchList.includes(matches[1])) matchList.push(matches[1]);
      parsedBody = parsedBody.replace(matches[0], '');
    }
  }
  return matchList;
};

export const getLinkList = body => {
  const matchList = [];
  let parsedBody = parseBody(body, { secureLinks: false });
  let matches = allLinks.exec(parsedBody);
  while (matches !== null) {
    matches = allLinks.exec(parsedBody);
    if (matches !== null) {
      if (!matchList.includes(matches[1])) matchList.push(matches[1]);
      parsedBody = parsedBody.replace(matches[0], '');
    }
  }
  return matchList;
};

export const getMentionList = body => {
  const matchList = [];
  let parsedBody = body;
  let matches = allMentions.exec(parsedBody);
  while (matches !== null) {
    matches = allMentions.exec(parsedBody);
    if (matches !== null) {
      if (!matchList.includes(matches[1])) matchList.push(matches[1]);
      parsedBody = parsedBody.replace(matches[0], '');
    }
  }
  return matchList;
};
