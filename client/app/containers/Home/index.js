/**
 *
 * Home
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import CameraIcon from '@material-ui/icons/PhotoCamera';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, fade } from '@material-ui/core/styles';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  getAllMovies,
  fetchNextSetOfMovies,
  fetchPrevSetOfMovies,
  getWatchList,
} from './actions';
import makeSelectHome, {
  selectHasMoreMovies,
  selectHasPrevMovies,
  selectCurrentPage,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

import Header from '../../components/Header';
import MovieCarousel from '../../components/MovieCarousel';
import MovieCard from '../MovieCard';
import Footer from '../../components/Footer';
import FullScreenDialogBox from '../../components/FullScreenDialogBox';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    float: 'left',
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}));

export function Home(props) {
  useInjectReducer({ key: 'home', reducer });
  useInjectSaga({ key: 'home', saga });

  const classes = useStyles();

  const {
    fetchMovies,
    hasMoreMovies,
    hasPrevMovies,
    handleClickOnNext,
    handleClickOnPrev,
    currentPage,
    fetchWatchList,
  } = props;

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    if (currentPage >= 1) {
      fetchMovies();
    }
  }, [currentPage]);

  /* util code to handle Watchlist dialogBox */

  const [openWatchList, setOpenWatchList] = React.useState(false);

  const handleClickOpenWatchlistDialog = () => {
    setOpenWatchList(true);
    fetchWatchList();
  };

  const handleCloseWatchlistDialog = () => {
    setOpenWatchList(false);
  };

  return (
    <>
      <CssBaseline />
      <Header classes={classes} />
      {openWatchList ? (
        <FullScreenDialogBox
          open={openWatchList}
          handleClose={handleCloseWatchlistDialog}
        />
      ) : (
        <>
          <main>
            <MovieCarousel
              classes={classes}
              handleClickOnWishList={handleClickOpenWatchlistDialog}
              handleClose={handleCloseWatchlistDialog}
            />
            <MovieCard classes={classes} />
          </main>
          <Footer
            classes={classes}
            hasMore={hasMoreMovies}
            hasPrev={hasPrevMovies}
            handleClickOnNext={handleClickOnNext}
            handleClickOnPrev={handleClickOnPrev}
          />
        </>
      )}
    </>
  );
}

Home.propTypes = {
  fetchMovies: PropTypes.func,
  hasMoreMovies: PropTypes.func,
  hasPrevMovies: PropTypes.func,
  handleClickOnNext: PropTypes.func,
  handleClickOnPrev: PropTypes.func,
  currentPage: PropTypes.number,
  fetchWatchList: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  home: makeSelectHome(),
  hasPrevMovies: selectHasPrevMovies(),
  hasMoreMovies: selectHasMoreMovies(),
  currentPage: selectCurrentPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchMovies: () => dispatch(getAllMovies()),
    fetchWatchList: () => dispatch(getWatchList()),
    handleClickOnNext: () => dispatch(fetchNextSetOfMovies()),
    handleClickOnPrev: () => dispatch(fetchPrevSetOfMovies()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Home);
