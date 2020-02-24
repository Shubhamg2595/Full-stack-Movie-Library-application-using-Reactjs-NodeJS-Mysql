/**
 *
 * CardComponent
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const StyledRating = withStyles({
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
  },
})(Rating);

function CardComponent(props) {
  const {
    classes,
    movie,
    handleClickOnCard,
    use,
    handleClickOnAddToWishlist,
  } = props;

  return (
    <Grid item key={movie.movieId} xs={12} sm={6} md={4}>
      <Card
        className={classes.card}
        onClick={() => handleClickOnCard(movie.movieId)}
      >
        <CardMedia
          padding="200px"
          className={classes.cardMedia}
          image="https://source.unsplash.com/random"
          title="Image title"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {movie.title}
          </Typography>
          <Typography>
            <b> {movie.genres} </b>
          </Typography>
        </CardContent>

        {use === 'modal' ? (
          <>
            <Box component="fieldset" mb={3} borderColor="transparent">
              {movie.rating !== undefined ? (
                <StyledRating
                  style={{ marginLeft: '15px' }}
                  name="customized-color"
                  value={movie.rating}
                  icon={<FavoriteIcon fontSize="inherit" />}
                  readOnly
                />
              ) : null}
            </Box>
            <CardActions>
              {movie.watched === 0 ? (
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<CloudUploadIcon />}
                  onClick={e => {
                    e.stopPropagation();
                    handleClickOnAddToWishlist(movie.movieId);
                  }}
                >
                  Add to Watchlist
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  disabled
                >
                  Present in your Watchlist
                </Button>
              )}
            </CardActions>
          </>
        ) : null}
      </Card>
    </Grid>
  );
}

CardComponent.propTypes = {
  classes: PropTypes.object,
  movie: PropTypes.object,
  handleClickOnCard: PropTypes.func,
  handleClickOnAddToWishlist: PropTypes.func,
  use: PropTypes.string,
};

export default CardComponent;
