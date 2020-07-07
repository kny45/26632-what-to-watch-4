import React from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";

import {ActionCreator} from "../../reducer.js";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";

import comments from "../../mocks/comments.js"; // временное решение

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentMovie: null,
      currentMovieComments: comments,
    };

    this.handleSmallMovieCardClick = this.handleSmallMovieCardClick.bind(this);
  }

  handleSmallMovieCardClick(movie) {
    this.setState({currentMovie: movie});
  }

  _renderApp() {
    const {
      promoMovieCard,
      currentGenre,
      moviesList,
      // currentMovie,
      // currentMovieComments,
      onSmallMovieCardClick,
      onGenreItemClick,
    } = this.props;
    const {
      currentMovie,
      currentMovieComments,
    } = this.state;

    if (currentMovie) {
      return (
        <MoviePage
          movieDetails = {currentMovie}
          movieComments = {currentMovieComments}
          moviesList = {moviesList}
          // onSmallMovieCardClick = {onSmallMovieCardClick}
          onSmallMovieCardClick = {(movie) => {
            onSmallMovieCardClick(movie);
            this.handleSmallMovieCardClick(movie);
          }}
        />
      );
    }

    return (
      <Main
        movieCard = {promoMovieCard}
        currentGenre = {currentGenre}
        moviesList = {moviesList}
        // onSmallMovieCardClick = {onSmallMovieCardClick}
        onSmallMovieCardClick = {(movie) => {
          onSmallMovieCardClick(movie);
          this.handleSmallMovieCardClick(movie);
        }}
        onGenreItemClick = {onGenreItemClick}
      />
    );
  }

  render() {
    const {
      moviesList,
      // currentMovieComments,
      onSmallMovieCardClick,
    } = this.props;
    const {
      currentMovie,
      currentMovieComments,
    } = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-film">
            <MoviePage
              movieDetails = {currentMovie}
              movieComments = {currentMovieComments}
              moviesList = {moviesList}
              // onSmallMovieCardClick = {onSmallMovieCardClick}
              onSmallMovieCardClick = {(movie) => {
                onSmallMovieCardClick(movie);
                this.handleSmallMovieCardClick(movie);
              }}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  promoMovieCard: PropTypes.shape({
    name: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    previewVideoLink: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    scoreCount: PropTypes.number.isRequired,
    director: PropTypes.string.isRequired,
    staring: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    runTime: PropTypes.number.isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired,
  }).isRequired,
  currentGenre: PropTypes.string.isRequired,
  moviesList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    previewVideoLink: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
  })).isRequired,
  // currentMovie: PropTypes.shape({
  //   name: PropTypes.string.isRequired,
  //   posterImage: PropTypes.string.isRequired,
  //   backgroundImage: PropTypes.string.isRequired,
  //   previewVideoLink: PropTypes.string.isRequired,
  //   description: PropTypes.string.isRequired,
  //   rating: PropTypes.number.isRequired,
  //   scoreCount: PropTypes.number.isRequired,
  //   director: PropTypes.string.isRequired,
  //   staring: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  //   runTime: PropTypes.number.isRequired,
  //   genre: PropTypes.string.isRequired,
  //   released: PropTypes.number.isRequired,
  // }).isRequired,
  // currentMovieComments: PropTypes.shape({
  //   id: PropTypes.number.isRequired,
  //   userId: PropTypes.number.isRequired,
  //   userName: PropTypes.string.isRequired,
  //   rating: PropTypes.number.isRequired,
  //   comment: PropTypes.string.isRequired,
  //   date: PropTypes.string.isRequired
  // }).isRequired,
  onSmallMovieCardClick: PropTypes.func.isRequired,
  onGenreItemClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  promoMovieCard: state.promoMovieCard,
  currentGenre: state.currentGenre,
  moviesList: state.moviesList,
  // currentMovie: state.currentMovie,
  // currentMovieComments: state.currentMovieComments,
});

const mapDispatchToProps = (dispatch) => ({
  onSmallMovieCardClick(movie) {
    dispatch(ActionCreator.changeCurrentMovie(movie));
  },
  onGenreItemClick(genre) {
    dispatch(ActionCreator.changeGenre(genre));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
