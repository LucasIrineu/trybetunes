import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import SearchForm from './SearchForm';
import SearchResult from './SearchResult';

class Search extends React.Component {
  constructor() {
    super();
    this.onInputChange = this.onInputChange.bind(this);
    this.handleSearchButtonDisable = this.handleSearchButtonDisable.bind(this);
    this.loadingStarted = this.loadingStarted.bind(this);
    this.loadingEnded = this.loadingEnded.bind(this);
    this.searchAlbum = this.searchAlbum.bind(this);

    this.state = {
      searchInput: '',
      isSearchButtonDisabled: true,
      loading: true,
      thereIsASearchResult: false,
      resultArray: [],
      lastArtistSearched: '',
    };
  }

  componentDidMount() {
    this.loadingEnded();
  }

  handleSearchButtonDisable() {
    const { searchInput } = this.state;
    const NAME_MIN_LENGTH = 2;

    if (searchInput.length >= NAME_MIN_LENGTH) {
      this.setState({ isSearchButtonDisabled: false });
    } else {
      this.setState({ isSearchButtonDisabled: true });
    }
  }

  onInputChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, () => {
      this.handleSearchButtonDisable();
    });
  }

  async searchAlbum() {
    const { searchInput } = this.state;
    this.loadingStarted();
    const APIResult = await searchAlbumsAPI(searchInput);

    this.setState({
      resultArray: APIResult,
      thereIsASearchResult: true,
      lastArtistSearched: searchInput,
      searchInput: '',
    });

    this.loadingEnded();
  }

  loadingStarted() {
    this.setState({ loading: true });
  }

  loadingEnded() {
    this.setState({ loading: false });
  }

  render() {
    const { searchInput, isSearchButtonDisabled, loading,
      thereIsASearchResult, resultArray, lastArtistSearched } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        {loading ? <Loading />
          : (
            <SearchForm
              searchInput={ searchInput }
              isSearchButtonDisabled={ isSearchButtonDisabled }
              onInputChange={ this.onInputChange }
              searchAlbum={ this.searchAlbum }
            />)}
        {(resultArray.length === 0 && thereIsASearchResult) && (
          <p>
            Nenhum álbum foi encontrado
          </p>)}

        {resultArray.length > 0 && thereIsASearchResult && (
          <div>
            <p>{`Resultado de álbuns de: ${lastArtistSearched}`}</p>
            <SearchResult
              resultArray={ resultArray }
              searchInput={ searchInput }
            />
          </div>
        )}
      </div>
    );
  }
}

export default Search;
