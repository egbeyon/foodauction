import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core';

import { Portlet, PortletContent } from '../../../../../components';
import styles from './styles';

class HotbuyTable extends Component {
  state = {
    rowsPerPage: 10,
    page: 0
  };

  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    onSelect: PropTypes.func,
    onShowDetails: PropTypes.func,
    showtimes: PropTypes.array.isRequired
  };

  static defaultProps = {
    showtimes: [],
    onSelect: () => {},
    onShowDetails: () => {}
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const {
      classes,
      className,
      hotbuys,
      onSelectHotbuy,
      selectedHotbuys,
      selectAllHotbuys
    } = this.props;
    const { rowsPerPage, page } = this.state;

    const rootClassName = classNames(classes.root, className);
    return (
      <Portlet className={rootClassName}>
        <PortletContent noPadding>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <Checkbox
                    checked={selectedHotbuys.length === hotbuys.length}
                    color="primary"
                    indeterminate={
                      selectedHotbuys.length > 0 &&
                      selectedHotbuys.length < hotbuys.length
                    }
                    onChange={selectAllHotbuys}
                  />
                  ID
                </TableCell>
                <TableCell align="left">Product</TableCell>
                <TableCell align="left">Farm</TableCell>
                <TableCell align="left">Start Date</TableCell>
                <TableCell align="left">End Date</TableCell>
                <TableCell align="left">Quantity</TableCell>
                <TableCell align="left">Metric</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hotbuys
                .filter(hotbuy => {
                  return hotbuy;
                })
                .slice(0, rowsPerPage)
                .map(hotbuy => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={hotbuy._id}
                    selected={selectedHotbuys.indexOf(hotbuy._id) !== -1}>
                    <TableCell className={classes.tableCell}>
                      <div className={classes.tableCellInner}>
                        <Checkbox
                          checked={
                            selectedHotbuys.indexOf(hotbuy._id) !== -1
                          }
                          color="primary"
                          onChange={() => onSelectHotbuy(hotbuy._id)}
                          value="true"
                        />
                        <Typography
                          className={classes.nameText}
                          variant="body1">
                          {hotbuy._id}
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {hotbuy.productId}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {hotbuy.farmId}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {moment(hotbuy.startDate).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {moment(hotbuy.endDate).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {hotbuy.quantity}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {hotbuy.metric}
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
            count={hotbuys.length}
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

export default withStyles(styles)(HotbuyTable);
