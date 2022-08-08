import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl, trackId, saveFavoriteTrack } = this.props;
    // const { loading } = this.state;
    return (
      <div className="track-card">
        <h4>{ `${trackName}` }</h4>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>
            audio
          </code>
          .
        </audio>
        <label htmlFor={ trackId } data-testid={ `checkbox-music-${trackId}` }>
          <input type="checkbox" id={ trackId } onChange={ saveFavoriteTrack } />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  saveFavoriteTrack: PropTypes.func.isRequired,
};

export default MusicCard;
