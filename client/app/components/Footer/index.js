/**
 *
 * Footer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
// import CameraIcon from '@material-ui/icons/PhotoCamera';
import Grid from '@material-ui/core/Grid';

// import styled from 'styled-components';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function Footer(props) {
  const {
    classes,
    hasMore,
    hasPrev,
    handleClickOnNext,
    handleClickOnPrev,
  } = props;
  return (
    <footer className={classes.footer}>
      <div className={classes.heroButtons}>
        <Grid container spacing={2} justify="center">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              disabled={!hasPrev}
              onClick={handleClickOnPrev}
            >
              Previous
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              disabled={!hasMore}
              onClick={handleClickOnNext}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object,
  hasMore: PropTypes.bool,
  hasPrev: PropTypes.bool,
  handleClickOnNext: PropTypes.func,
  handleClickOnPrev: PropTypes.func,
};

export default Footer;
