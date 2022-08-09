import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.getTrackList = this.getTrackList.bind(this);
    this.loadingStarted = this.loadingStarted.bind(this);
    this.loadingEnded = this.loadingEnded.bind(this);
    // this.saveFavoriteTrack = this.saveFavoriteTrack.bind(this);

    this.state = {
      albumTracks: [],
      albumInfo: {},
      loading: false,
    };
  }

  async componentDidMount() {
    this.getTrackList();
    this.loadingEnded();
  }

  async getTrackList() {
    const URLPath = window.location.pathname;
    const idFromURLStartAt = 7;
    const albumId = URLPath.substring(idFromURLStartAt, (URLPath.length));
    this.loadingStarted();
    const APIObj = await getMusics(albumId);
    this.setState({ albumTracks: APIObj, albumInfo: APIObj[0] });
    this.loadingEnded();
  }

  loadingStarted() {
    this.setState({ loading: true });
  }

  loadingEnded() {
    this.setState({ loading: false });
  }

  render() {
    const { albumTracks, albumInfo, loading } = this.state;
    const { artistName, collectionName } = albumInfo;

    return (
      <div data-testid="page-album">
        <Header />
        {loading && <Loading />}
        <h3 data-testid="artist-name">
          {!loading && artistName}
        </h3>
        <h4 data-testid="album-name">
          {!loading && collectionName}
        </h4>
        {albumTracks.map((track, index) => {
          if (index > 0) {
            const { trackName, previewUrl, trackId, trackViewUrl } = track;
            return (<MusicCard
              trackName={ trackName }
              previewUrl={ previewUrl }
              key={ trackId }
              trackId={ trackId }
              saveFavoriteTrack={ this.saveFavoriteTrack }
              loading={ loading }
              handleCheck={ this.handleCheck }
              loadingStarted={ this.loadingStarted }
              loadingEnded={ this.loadingEnded }
              trackViewUrlCard={ trackViewUrl }
              trackNumber={ index }
            />);
          }
          return null;
        })}
      </div>
    );
  }
}

export default Album;
