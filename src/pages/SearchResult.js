import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class SearchResult extends React.Component {
  render() {
    const { resultArray } = this.props;

    return (
      <div className="results-page">

        {resultArray.map((album) => {
          const { artistName, collectionName, releaseDate,
            trackCount, artworkUrl100, collectionId } = album;
          const releaseDateTextLength = 10;

          return (
            <div className="album-card" key={ collectionName }>
              <Link
                to={ `/album/${collectionId}` }
                data-testid={ `link-to-album-${collectionId}` }
              >
                <img
                  src={ artworkUrl100 }
                  alt={ collectionName }
                />
                <h3>
                  { collectionName }
                </h3>
                <h5>
                  { artistName }
                </h5>
                <p>
                  Data de Lançamento:
                  { releaseDate.substring(0, releaseDateTextLength) }
                </p>
                <p>
                  Número de Faixas:
                  { trackCount }
                </p>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}

SearchResult.propTypes = {
  resultArray: PropTypes.arrayOf(PropTypes.shape({
    artistName: PropTypes.string.isRequired,
    collectionName: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    trackCount: PropTypes.number.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
  })).isRequired,
};

export default SearchResult;
