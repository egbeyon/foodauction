import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination
} from '@material-ui/core';

import { Portlet, PortletContent } from '../../../../../components';
import styles from './styles';

class ReservesTable extends Component {
  state = {
    rowsPerPage: 10,
    page: 0
  };

  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    onSelect: PropTypes.func,
    onShowDetails: PropTypes.func,
    reserves: PropTypes.array.isRequired,
    products: PropTypes.array.isRequired,
    farms: PropTypes.array.isRequired
  };

  static defaultProps = {
    reserves: [],
    products: [],
    farms: [],
    onSelect: () => {},
    onShowDetails: () => {}
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  onFindAttr = (id, list, attr) => {
    const item = list.find(item => item._id === id);
    return item ? item[attr] : `Not ${attr} Found`;
  };

  render() {
    const { classes, className, reserves, products, farms } = this.props;
    const { rowsPerPage, page } = this.state;
    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet className={rootClassName}>
        <PortletContent noPadding>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Product</TableCell>
                <TableCell align="left">Farm</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Start At</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reserves
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(reserve => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={reserve._id}>
                    <TableCell className={classes.tableCell}>
                      {this.onFindAttr(reserve.productId, products, 'name')}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {this.onFindAttr(reserve.farmId, farms, 'name')}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {new Date(reserve.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {reserve.startAt}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {reserve.productPrice}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {reserve.total}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            backIconButtonProps={{
              'aria-label': 'Previous Page'
            }}
            component="div"
            count={reserves.length}
            nextIconButtonProps={{
              'aria-label': 'Next Page'
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </PortletContent>
      </Portlet>
    );
  }
}

export default withStyles(styles)(ReservesTable);
