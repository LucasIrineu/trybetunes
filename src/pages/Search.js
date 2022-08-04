import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.onInputChange = this.onInputChange.bind(this);
    this.handleSearchButtonDisable = this.handleSearchButtonDisable.bind(this);

    this.state = {
      searchInput: '',
      isSearchButtonDisabled: true,
    };
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

  render() {
    const { searchInput, isSearchButtonDisabled } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            placeholder="Nome do Artista"
            name="searchInput"
            value={ searchInput }
            onChange={ this.onInputChange }
          />

          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isSearchButtonDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
