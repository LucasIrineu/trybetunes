import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.getTrackList = this.getTrackList.bind(this);
  }

  state = {
    albumTracks: [],
    albumInfo: {},
  }

  componentDidMount() {
    this.getTrackList();
  }

  componentDidUpdate() {
  }

  async getTrackList() {
    const URLPath = window.location.pathname;
    const idFromURLStartAt = 7;
    const albumId = URLPath.substring(idFromURLStartAt, (URLPath.length));
    const APIObj = await getMusics(albumId);
    this.setState({ albumTracks: APIObj, albumInfo: APIObj[0] });
  }

  render() {
    const { albumTracks, albumInfo } = this.state;
    const { artistName, collectionName } = albumInfo;

    return (
      <div data-testid="page-album">
        <Header />
        <h3 data-testid="artist-name">
          {artistName}
        </h3>
        <h4 data-testid="album-name">
          {collectionName}
        </h4>
        {albumTracks.map((track, index) => {
          if (index > 0) {
            const { trackName, previewUrl, trackId } = track;
            return (<MusicCard
              trackName={ trackName }
              previewUrl={ previewUrl }
              key={ trackId }
              // trackNumber={ index }
            />);
          }
          return null;
        })}
      </div>
    );
  }
}

export default Album;
