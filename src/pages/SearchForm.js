import React from 'react';
import PropTypes from 'prop-types';

class SearchForm extends React.Component {
  render() {
    const { searchInput, isSearchButtonDisabled,
      onInputChange, searchAlbum } = this.props;
    return (
      <form>
        <input
          type="text"
          data-testid="search-artist-input"
          placeholder="Nome do Artista"
          name="searchInput"
          value={ searchInput }
          onChange={ onInputChange }
        />

        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ isSearchButtonDisabled }
          onClick={ searchAlbum }
        >
          Pesquisar
        </button>
      </form>
    );
  }
}

SearchForm.propTypes = {
  searchInput: PropTypes.string.isRequired,
  isSearchButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  searchAlbum: PropTypes.func.isRequired,
};

export default SearchForm;
