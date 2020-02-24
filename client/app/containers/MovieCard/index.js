/**
 *
 * MovieCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
// import Link from '@material-ui/core/Link';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import reducer from './reducer';
import saga from './saga';
import CardComponent from '../../components/CardComponent';
import { selectAllMovies } from '../Home/selectors';
import { updateWatchList, getRatingForMovie } from './actions';

export function MovieCard(props) {
  useInjectReducer({ key: 'movieCard', reducer });
  useInjectSaga({ key: 'movieCard', saga });
  const { classes, movies, handleAddMovieToWishList, getRating } = props;

  const movieData = Object.values(movies);
  const isLoading = false;

  const [open, setOpen] = React.useState(false);
  const [cardModalId, setCardModalId] = React.useState(0);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOnCard = movieId => {
    if (movies[movieId] && movies[movieId].rating === undefined) {
      getRating(movieId);
    }
    setOpen(!open);
    setCardModalId(movieId);
  };

  function handleClickOnAddToWishlist(movieId) {
    const payload = {
      movieId,
      task: 'add',
    };
    handleAddMovieToWishList(payload);
  }

  return isLoading ? (
    <div style={{ textAlign: 'center' }}>
      <CircularProgress />
    </div>
  ) : (
    <Container className={classes.cardGrid} maxWidth="md">
      {movies && open ? (
        <Backdrop
          className={classes.backdrop}
          open={open}
          onClick={handleClose}
        >
          <CardComponent
            classes={classes}
            movie={movies[cardModalId]}
            use="modal"
            handleClickOnAddToWishlist={handleClickOnAddToWishlist}
          />
        </Backdrop>
      ) : (
        <Grid container spacing={4}>
          {movieData.map(movie => (
            <CardComponent
              classes={classes}
              movie={movie}
              handleClickOnCard={handleClickOnCard}
              use="component"
            />
          ))}
        </Grid>
      )}
    </Container>
  );
}

MovieCard.propTypes = {
  classes: PropTypes.object,
  movies: PropTypes.object,
  handleAddMovieToWishList: PropTypes.func,
  getRating: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  movies: selectAllMovies(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleAddMovieToWishList: payload => dispatch(updateWatchList(payload)),
    getRating: movieId => dispatch(getRatingForMovie(movieId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(MovieCard);
