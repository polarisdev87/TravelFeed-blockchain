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
import UpdatesSelectorInput from './UpdatesSelectorInput';

const theme = createMuiTheme({
  palette: {
    primary: red,
  },
});

const UpdatesSelector = props => {
  const { updates, setUpdates, loading, setLoading } = props;

  const handleUpdateRemove = title => {
    let newUpdates = updates;
    newUpdates = newUpdates.filter(item => item.title !== title);
    setUpdates(newUpdates);
  };

  const handleMoveUp = title => {
    setLoading(true);
    const index = updates
      .map(el => {
        return el.title;
      })
      .indexOf(title);
    const newUpdates = arrayMove(updates, index, index - 1);
    setUpdates(newUpdates);
    setTimeout(() => setLoading(false), 1);
  };

  const handleMoveDown = title => {
    setLoading(true);
    const index = updates
      .map(el => {
        return el.title;
      })
      .indexOf(title);
    const newUpdates = arrayMove(updates, index, index + 1);
    setUpdates(newUpdates);
    setTimeout(() => setLoading(false), 1);
  };

  return (
    <div style={{ overflowX: 'auto', wordWrap: 'normal', wordBreak: 'normal' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">Title</TableCell>
            <TableCell padding="checkbox">Text</TableCell>
            <TableCell padding="checkbox" />
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading &&
            updates.map((b, i) => (
              <TableRow hover key={b.username}>
                <TableCell padding="checkbox">{b.title}</TableCell>
                <TableCell padding="checkbox">{b.text}</TableCell>
                <TableCell padding="checkbox">
                  <ConfirmBtn
                    btnText="Delete"
                    btntheme={theme}
                    icon={<DeleteIcon />}
                    dialogText="Delete this update?"
                    onConfirm={() => handleUpdateRemove(b.title)}
                  />
                  <IconButton
                    disabled={i === 0}
                    color="primary"
                    onClick={() => handleMoveUp(b.title)}
                  >
                    <UpIcon />
                  </IconButton>
                  <UpdatesSelectorInput
                    isEdit
                    title={b.title}
                    image={b.image}
                    text={b.text}
                    link={b.link}
                    button={b.button}
                    updates={updates}
                    setUpdates={setUpdates}
                    loading={loading}
                    setLoading={setLoading}
                  />
                  <IconButton
                    disabled={i === updates.length - 1}
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
            <TableCell padding="checkbox">
              <UpdatesSelectorInput
                updates={updates}
                setUpdates={setUpdates}
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

export default withSnackbar(UpdatesSelector);
