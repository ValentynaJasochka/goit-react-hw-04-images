import { useState } from 'react';
import { toast } from 'react-toastify';
import { BsSearch } from 'react-icons/bs';
import {
  SearchbarStyle,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleNameSearch = event => {
    setSearch(event.currentTarget.value.trim().toLowerCase());
  };
  const handleSubmit = event => {
    event.preventDefault();
    if (search === '') {
      toast.warn('Enter your request, please!');
      return;
    }
    onSubmit(search);
    setSearch('');
  };
  return (
    <SearchbarStyle>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton>
          <BsSearch color="black" />
        </SearchFormButton>

        <SearchFormInput
          type="text"
          name="search"
          value={search}
          autoComplete="off"
          onChange={handleNameSearch}
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarStyle>
  );
};
