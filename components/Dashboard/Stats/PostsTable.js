// https://material-ui.com/demos/tables/#tables
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/styles';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Link from '../../../lib/Link';
import PostsTableHead from './PostsTableHead';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const styles = () => ({
  table: {
    minWidth: 200,
  },
  tableWrapper: {
    overflowX: 'auto',
    wordWrap: 'normal',
    wordBreak: 'normal',
  },
});

class PostsTable extends React.Component {
  constructor(props) {
    super(props);
    this.fullWidth = React.createRef();
  }

  state = {
    order: 'desc',
    orderBy: 'created_at',
    selected: [],
    data: this.props.data,
    page: 0,
    rowsPerPage: 5,
    cardWidth: undefined,
  };

  componentDidMount() {
    if (this.fullWidth.current && !this.state.cardWidth) {
      const cardWidth =
        Math.floor(this.fullWidth.current.offsetWidth / 10) * 10;
      this.setState({ cardWidth });
    }
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Fragment>
        <div ref={this.fullWidth} className="w-100">
          {this.state.cardWidth && (
            <div
              className={`p-2 ${classes.tableWrapper}`}
              style={{ width: this.state.cardWidth }}
            >
              <Table className={classes.table} aria-labelledby="tableTitle">
                <PostsTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={this.handleSelectAllClick}
                  onRequestSort={this.handleRequestSort}
                  rowCount={data.length}
                />
                <TableBody>
                  {stableSort(data, getSorting(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(n => {
                      const isSelected = this.isSelected(n.id);
                      let titleUri = '';
                      try {
                        titleUri = encodeURIComponent(n.title);
                      } catch {
                        console.log('Could not encode URI');
                      }
                      return (
                        <TableRow
                          hover
                          onClick={event => this.handleClick(event, n.id)}
                          role="checkbox"
                          aria-checked={isSelected}
                          tabIndex={-1}
                          key={n.post_id}
                          selected={isSelected}
                        >
                          <TableCell component="th" scope="row" padding="none">
                            <Link
                              color="textPrimary"
                              as={`/@${n.author}/${n.permlink}`}
                              href={`/post?author=${n.author}&permlink=${n.permlink}&depth=0&title=${titleUri}`}
                            >
                              {n.title}
                            </Link>
                          </TableCell>
                          <TableCell align="right">
                            {dayjs(n.created_at).format('MMMM DD YYYY')}
                          </TableCell>
                          <TableCell align="right">{n.total_votes}</TableCell>
                          <TableCell align="right">
                            {(n.is_paidout &&
                              `$${
                                // hard fork 21 reduces author rewards to 50%
                                new Date(n.created_at) <
                                new Date('August 27, 2019 15:00:00')
                                  ? (n.payout * 0.75).toFixed(2)
                                  : (n.payout * 0.5).toFixed(2)
                              }`) ||
                              'Pending'}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 49 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </div>
      </Fragment>
    );
  }
}

PostsTable.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default withStyles(styles)(PostsTable);
