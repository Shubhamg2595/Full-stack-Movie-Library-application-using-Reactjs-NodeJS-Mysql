/**
 *
 * MovieCarousel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
// import CameraIcon from '@material-ui/icons/PhotoCamera';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
// import messages from './messages';

function MovieCarousel(props) {
  const { classes, handleClickOnWishList } = props;
  return (
    <div className={classes.heroContent}>
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Movie Xpress
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          “Today, I demand that a film express either the joy of making cinema
          or the agony of making cinema. I am not at all interested in anything
          in between; I am not interested in all those films that do not pulse.”
          ― Francois Truffaut, The Films in My Life
        </Typography>
        <div className={classes.heroButtons}>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleClickOnWishList}
              >
                Visit Your Personal Watchlist
              </Button>
            </Grid>
            {/* <Grid item>
              <Button variant="outlined" color="primary">
                Secondary action
              </Button>
            </Grid> */}
          </Grid>
        </div>
      </Container>
    </div>
  );
}

MovieCarousel.propTypes = {
  classes: PropTypes.object,
  handleClickOnWishList: PropTypes.func,
};

export default MovieCarousel;
