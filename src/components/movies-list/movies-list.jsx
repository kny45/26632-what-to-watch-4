import React from "react";
import PropTypes from "prop-types";

import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";

const MoviesList = (props) => {
  const {
    moviesList,
    activeItem,
    onActiveItemChange,
    onSmallMovieCardClick,
  } = props;
  return (
    <div className="catalog__movies-list">
      {
        moviesList.map((movie, index) => {
          return (
            <SmallMovieCard
              key = {`${index}-${movie.name}`}
              movieCard = {movie}
              onActiveItemChange = {onActiveItemChange}
              onSmallMovieCardClick = {onSmallMovieCardClick}
              isPlaying = {(activeItem === movie) ? true : false}
            />
          );
        })
      }
    </div>
  );
};

MoviesList.propTypes = {
  moviesList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    previewVideoLink: PropTypes.string.isRequired,
  })).isRequired,
  activeItem: PropTypes.shape({
    name: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    previewVideoLink: PropTypes.string.isRequired,
  }),
  onActiveItemChange: PropTypes.func.isRequired,
  onSmallMovieCardClick: PropTypes.func.isRequired,
};

export default MoviesList;
