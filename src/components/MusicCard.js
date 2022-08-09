import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.saveFavoriteTrack = this.saveFavoriteTrack.bind(this);
    // this.handleCheck = this.handleCheck.bind(this);
    // this.getFavoriteTracks = this.getFavoriteTracks.bind(this);

    this.state = {
      shouldBeChecked: false,
    };
  }

  async componentDidMount() {
    const { loadingStarted, loadingEnded, trackId } = this.props;
    loadingStarted();
    const favoriteTracks = await getFavoriteSongs();
    this.setState({}, () => {
      this.setState({
        shouldBeChecked: favoriteTracks.some((element) => element.trackId === trackId),
      });
    });
    loadingEnded();
  }

  async saveFavoriteTrack(event) {
    const { loadingStarted, loadingEnded } = this.props;
    const { shouldBeChecked } = this.state;
    this.setState({ shouldBeChecked: !shouldBeChecked });
    const { target } = event;
    const { id } = target;
    loadingStarted();
    const obj = await getMusics(id);
    if (target.checked) {
      this.setState({ shouldBeChecked: true });
      await addSong(obj);
      loadingEnded();
    } else {
      await removeSong(obj);
      this.setState({ shouldBeChecked: false });
      loadingEnded();
    }
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
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
        <label htmlFor={ trackId } data-testid={ `checkbox-music-${trackId}` }>
          <input
            type="checkbox"
            id={ trackId }
            onChange={ this.saveFavoriteTrack }
            checked={ shouldBeChecked }
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  // trackViewUrlCard: PropTypes.string.isRequired,
  // saveFavoriteTrack: PropTypes.func.isRequired,
  loadingStarted: PropTypes.func.isRequired,
  loadingEnded: PropTypes.func.isRequired,
  // favoriteSongsList: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
  //  trackId: PropTypes.number.isRequired,
  // }))).isRequired,
};

export default MusicCard;
