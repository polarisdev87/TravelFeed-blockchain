import React, { useEffect, useState } from 'react';
import { getRoles } from '../../helpers/token';
import AuthorBlacklist from './Actions/AuthorBlacklist';
import PostBlacklist from './Actions/PostBlacklist';
import CuratorMenu from './CuratorMenu';

const CommentMenu = props => {
  const [roles, setRoles] = useState(undefined);

  useEffect(() => {
    setRoles(getRoles());
  }, []);

  const isCurator = roles && roles.indexOf('curator') !== -1;

  const { author, permlink } = props;

  return (
    <>
      {isCurator && (
        <CuratorMenu
          component={
            <>
              <PostBlacklist author={author} permlink={permlink} />
              <AuthorBlacklist author={author} />
            </>
          }
        />
      )}
    </>
  );
};

export default CommentMenu;
