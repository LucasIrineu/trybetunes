import React from 'react';
import PropTypes from 'prop-types';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state={
    favoriteSongsList: [],
    shouldBeChecked: false,
  }

  async componentDidMount() {
    const { loadingStarted, loadingEnded } = this.props;
    loadingStarted();
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ favoriteSongsList: favoriteSongs });
    this.handleCheck();
    loadingEnded();
  }

  componentDidUpdate() {
    // this.handleCheck();
  }

  handleCheck() {
    const { cardTrackId } = this.props;
    const { favoriteSongsList } = this.state;
    const checkResult = favoriteSongsList.some((element) => {
      const { trackId } = element;
      return trackId === cardTrackId;
    });
    if (checkResult) {
      return this.setState({ shouldBeChecked: true });
    }
    this.setState({ shouldBeChecked: false });
  }

  render() {
    const { trackName, previewUrl, cardTrackId, saveFavoriteTrack } = this.props;
    const { shouldBeChecked } = this.state;
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
        <label htmlFor={ cardTrackId } data-testid={ `checkbox-music-${cardTrackId}` }>
          <input
            type="checkbox"
            id={ cardTrackId }
            onChange={ saveFavoriteTrack }
            checked={ shouldBeChecked }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  cardTrackId: PropTypes.number.isRequired,
  saveFavoriteTrack: PropTypes.func.isRequired,
  loadingStarted: PropTypes.func.isRequired,
  loadingEnded: PropTypes.func.isRequired,
  // favoriteSongsList: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
  //  trackId: PropTypes.number.isRequired,
  // }))).isRequired,
};

export default MusicCard;
