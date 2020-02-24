/**
 *
 * WatchList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';

// import tileData from './tileData';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
import reducer from './reducer';
import saga from './saga';
import { updateWatchList } from '../MovieCard/actions';
import { selectWatchList } from '../Home/selectors';
// import messages from './messages';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 2000,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export function WatchList(props) {
  useInjectReducer({ key: 'watchList', reducer });
  useInjectSaga({ key: 'watchList', saga });

  const classes = useStyles();

  const { watchList, handleRemoveMovieFromWishList } = props;

  function handleClickOnRemove(movieId) {
    const payload = {
      movieId,
      task: 'remove',
    };

    handleRemoveMovieFromWishList(payload);
  }

  return (
    <>
      <List className={classes.root}>
        {watchList &&
          Object.values(watchList).length > 0 &&
          Object.values(watchList).map(movie => (
            <>
              <ListItem alignItems="flex-start" key={movie.movieId}>
                <ListItemAvatar>
                  <Avatar
                    alt={movie.title.charAt(0)}
                    src="/static/images/avatar/1.jpg"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={movie.title}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {movie.genres}
                      </Typography>
                    </React.Fragment>
                  }
                />

                <ListItemSecondaryAction>
                  <Tooltip
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                    title="Remove from wishlist"
                    placement="top"
                  >
                    <IconButton
                      edge="start"
                      aria-label="delete"
                      onClick={() => handleClickOnRemove(movie.movieId)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider variant="inset" component="li" />
            </>
          ))}
      </List>
    </>
  );
}

WatchList.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  watchList: PropTypes.object,
  handleRemoveMovieFromWishList: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  watchList: selectWatchList(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleRemoveMovieFromWishList: payload =>
      dispatch(updateWatchList(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(WatchList);
