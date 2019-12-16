import red from '@material-ui/core/colors/red';
import IconButton from '@material-ui/core/IconButton';
import { createMuiTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import DownIcon from '@material-ui/icons/KeyboardArrowDown';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import arrayMove from 'array-move';
import { withSnackbar } from 'notistack';
import React from 'react';
import ConfirmBtn from './ConfirmBtn';
import PostSelectorInput from './PostSelectorInput';

const theme = createMuiTheme({
  palette: {
    primary: red,
  },
});

const PostSelector = props => {
  const { posts, setPosts, loading, setLoading } = props;

  const handlePostRemove = permlink => {
    let newPosts = posts;
    newPosts = newPosts.filter(item => item.permlink !== permlink);
    setPosts(newPosts);
  };

  const handleMoveUp = title => {
    setLoading(true);
    const index = posts
      .map(el => {
        return el.title;
      })
      .indexOf(title);
    const newposts = arrayMove(posts, index, index - 1);
    setPosts(newposts);
    setTimeout(() => setLoading(false), 1);
  };

  const handleMoveDown = title => {
    setLoading(true);
    const index = posts
      .map(el => {
        return el.title;
      })
      .indexOf(title);
    const newposts = arrayMove(posts, index, index + 1);
    setPosts(newposts);
    setTimeout(() => setLoading(false), 1);
  };

  return (
    <div style={{ overflowX: 'auto', wordWrap: 'normal', wordBreak: 'normal' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">Title</TableCell>
            <TableCell padding="checkbox">Author</TableCell>
            <TableCell padding="checkbox">Permlink</TableCell>
            <TableCell padding="checkbox" />
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading &&
            posts.map((b, i) => (
              <TableRow hover key={b.username}>
                <TableCell padding="checkbox">{b.title}</TableCell>
                <TableCell padding="checkbox">{b.author}</TableCell>
                <TableCell padding="checkbox">{b.permlink}</TableCell>
                <TableCell padding="checkbox">
                  <ConfirmBtn
                    btnText="Delete"
                    btntheme={theme}
                    icon={<DeleteIcon />}
                    dialogText="Delete this post?"
                    onConfirm={() => handlePostRemove(b.permlink)}
                  />
                  <IconButton
                    disabled={i === 0}
                    color="primary"
                    onClick={() => handleMoveUp(b.title)}
                  >
                    <UpIcon />
                  </IconButton>
                  <PostSelectorInput
                    isEdit
                    title={b.title}
                    author={b.author}
                    permlink={b.permlink}
                    excerpt={b.excerpt}
                    posts={posts}
                    setPosts={setPosts}
                    loading={loading}
                    setLoading={setLoading}
                  />
                  <IconButton
                    disabled={i === posts.length - 1}
                    color="primary"
                    onClick={() => handleMoveDown(b.title)}
                  >
                    <DownIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          <TableRow key="input">
            <TableCell padding="checkbox" />
            <TableCell padding="checkbox" />
            <TableCell padding="checkbox" />
            <TableCell padding="checkbox">
              <PostSelectorInput
                posts={posts}
                setPosts={setPosts}
                loading={loading}
                setLoading={setLoading}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default withSnackbar(PostSelector);
