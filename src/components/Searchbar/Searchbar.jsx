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
// export class Searchbar extends Component {
//   state = {
//     search: '',
//   };
//   handleNameSearch = event => {
//     const searchValue = event.currentTarget.value.trim().toLowerCase();
//     this.setState({
//       search: searchValue,
//     });
//   };

//   handleSubmit = event => {
//     event.preventDefault();
//     const searchValue = this.state.search;
//     if (searchValue === '') {
//       toast.warn('Enter your request, please!');
//       return;
//     }
//     this.props.onSubmit(searchValue);
//     event.currentTarget.reset();
//     this.setState({
//       search: '',
//     });
//   };

//   render() {
//     return (
//       <SearchbarStyle>
//         <SearchForm onSubmit={this.handleSubmit}>
//           <SearchFormButton>
//             <BsSearch color="black" />
//           </SearchFormButton>

//           <SearchFormInput
//             type="text"
//             name="search"
//             autoComplete="off"
//             onChange={this.handleNameSearch}
//             autoFocus
//             placeholder="Search images and photos"
//           />
//         </SearchForm>
//       </SearchbarStyle>
//     );
//   }
// }
