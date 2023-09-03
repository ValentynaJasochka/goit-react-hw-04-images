import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';

import { fetchPhoto, onFetchError } from './fetchApi';

import { Button } from './Button/Button';

const perPage = 12;
export const App = () => {
  const [search, setSearch] = useState('');
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [btnLoadMore, setBtnLoadMore] = useState(false);

  const handleFormSummit = searchValue => {
    setSearch(searchValue);
    setPhotos([]);
    setPage(1);
  };

  // const fetchPage = async (search, page) => {
  //   setLoading(true);
  //   try {
  //     console.log('RENDER NEWPAGE');
  //     const { totalHits, hits } = await fetchPhoto(search, page, perPage);
  //     if (!hits.length) {
  //       setBtnLoadMore(false);
  //       toast.warn(
  //         'Sorry, there are no images matching your search query. Please try again.'
  //       );
  //       setLoading(false);
  //     } else {
  //       const arrPhotos = hits.map(
  //         ({ id, webformatURL, largeImageURL, tags }) => ({
  //           id,
  //           largeImageURL,
  //           tags,
  //           webformatURL,
  //         })
  //       );
  //       setPhotos([...photos, ...arrPhotos]);
  //       setLoading(false);
  //       setBtnLoadMore(Math.ceil(totalHits / perPage) > page);
  //     }
  //   } catch (error) {
  //     onFetchError();
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    const fetchPage = async (search, page) => {
      setLoading(true);
      try {
        console.log('RENDER NEWPAGE');
        const { totalHits, hits } = await fetchPhoto(search, page, perPage);
        if (!hits.length) {
          setBtnLoadMore(false);
          toast.warn(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          setLoading(false);
        } else {
          const arrPhotos = hits.map(
            ({ id, webformatURL, largeImageURL, tags }) => ({
              id,
              largeImageURL,
              tags,
              webformatURL,
            })
          );
          setPhotos(prevPhotos => [...prevPhotos, ...arrPhotos]);
          setLoading(false);
          setBtnLoadMore(Math.ceil(totalHits / perPage) > page);
        }
      } catch (error) {
        onFetchError();
        setLoading(false);
      }
    };
    if (search) {
      fetchPage(search, page);
    }
  }, [search, page]);

  const onClickLoadMore = () => {
    setPage(page => page + 1);
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSummit} />
      <ToastContainer autoClose={2000} position="top-center" />
      {loading && <Loader />}
      {!!photos.length && <ImageGallery photos={photos} />}
      {btnLoadMore && <Button onClickRender={onClickLoadMore} />}
    </>
  );
};
// export class App extends Component {
//   state = {
//     search: '',
//     photos: [],
//     page: 1,
//     loading: false,
//     btnLoadMore: false,
//   };

//   handleFormSummit = searchValue => {
//     this.setState({
//       search: searchValue,
//       page: 1,
//       photos: [],
//     });
//   };

//   componentDidUpdate = async (_, prevState) => {
//     const { page: prevPage, search: prevSearch } = prevState;
//     const { page: newPage, search: newSearch } = this.state;

//     if (prevPage !== newPage || prevSearch !== newSearch) {
//       this.setState({ loading: true });
//       try {
//         console.log('RENDER NEWPAGE');
//         const { totalHits, hits } = await fetchPhoto(
//           newSearch,
//           newPage,
//           perPage
//         );
//         if (!hits.length) {
//           toast.warn(
//             'Sorry, there are no images matching your search query. Please try again.'
//           );
//         } else {
//           const arrPhotos = hits.map(
//             ({ id, webformatURL, largeImageURL, tags }) => ({
//               id,
//               largeImageURL,
//               tags,
//               webformatURL,
//             })
//           );
//           this.setState(prevState => ({
//             photos: [...prevState.photos, ...arrPhotos],
//             loading: false,
//             btnLoadMore: Math.ceil(totalHits / perPage) > newPage,
//           }));
//         }
//       } catch (error) {
//         onFetchError();
//         this.setState({ loading: false });
//       }
//     }
//   };
//   onClickLoadMore = () => {
//     this.setState(({ page }) => ({ page: page + 1 }));
//   };

//   render() {
//     const { photos, loading, btnLoadMore } = this.state;

//     return (
//       <>
//         <Searchbar onSubmit={this.handleFormSummit} />
//         <ToastContainer autoClose={2000} position="top-center" />
//         {loading && <Loader />}
//         {!!photos.length && <ImageGallery photos={photos} />}
//         {btnLoadMore && <Button onClickRender={this.onClickLoadMore} />}
//       </>
//     );
//   }
// }
