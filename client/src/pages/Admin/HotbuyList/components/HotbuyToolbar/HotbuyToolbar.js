import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import { Button, IconButton } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import styles from './styles';

class HotbuysToolbar extends Component {
  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    selectedHotbuys: PropTypes.array
  };

  static defaultProps = {
    selectedHotbuys: []
  };

  render() {
    const {
      classes,
      className,
      selectedHotbuys,
      toggleDialog,
      deleteHotbuy
    } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <div className={rootClassName}>
        <div className={classes.row}>
          <div>
            {selectedHotbuys.length > 0 && (
              <IconButton
                className={classes.deleteButton}
                onClick={deleteHotbuy}>
                <DeleteIcon />
              </IconButton>
            )}

            <Button
              onClick={() => toggleDialog()}
              color="primary"
              size="small"
              variant="outlined">
              {selectedHotbuys.length === 1 ? 'Edit' : 'Add'}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(HotbuysToolbar);
