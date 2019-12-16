import React, { useEffect, useState } from 'react';
import { getRoles } from '../../helpers/token';
import AuthorBlacklist from './Actions/AuthorBlacklist';
import ChangeRoles from './Actions/ChangeRoles';
import CuratorMenu from './CuratorMenu';

const BlogMenu = props => {
  const [roles, setRoles] = useState(undefined);

  useEffect(() => {
    setRoles(getRoles());
  }, []);

  const isCurator = roles && roles.indexOf('curator') !== -1;
  const isAdmin = roles && roles.indexOf('admin') !== -1;

  const { author } = props;

  return (
    <>
      {isCurator && (
        <CuratorMenu
          component={
            <>
              <AuthorBlacklist author={author} />
              {isAdmin && (
                <ChangeRoles author={author} isCurator={props.isCurator} />
              )}
            </>
          }
        />
      )}
    </>
  );
};

export default BlogMenu;
