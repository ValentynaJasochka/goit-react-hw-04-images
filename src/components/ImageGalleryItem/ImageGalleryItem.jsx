import { GalleryItem, GalleryImg } from './ImageGalleryItem.styled';
import { useState } from 'react';
import { Modal } from '../Modal/Modal';

export const ImageGalleryItem = ({ props }) => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    console.log('hoho');
    setShowModal(showModal => !showModal);
  };
  const { id, webformatURL, tags, largeImageURL } = props;
  return (
    <>
      <GalleryItem data-id={id} onClick={toggleModal}>
        <GalleryImg src={webformatURL} alt={tags} data-id={id} />
      </GalleryItem>
      {showModal && (
        <Modal onClose={toggleModal} largeImageURL={largeImageURL} alt={tags} />
      )}
    </>
  );
};

// export class ImageGalleryItem extends Component {
//   state = {
//     showModal: false,
//   };
//   toggleModal = () => {
//     console.log('hoho');
//     this.setState(({ showModal }) => ({ showModal: !showModal }));
//   };
//   render() {
//     const { id, webformatURL, tags, largeImageURL } = this.props.props;
//     const showModal = this.state.showModal;
//     return (
//       <>
//         <GalleryItem data-id={id} onClick={this.toggleModal}>
//           <GalleryImg src={webformatURL} alt={tags} data-id={id} />
//         </GalleryItem>
//         {showModal && (
//           <Modal
//             onClose={this.toggleModal}
//             largeImageURL={largeImageURL}
//             alt={tags}
//           />
//         )}
//       </>
//     );
//   }
// }
