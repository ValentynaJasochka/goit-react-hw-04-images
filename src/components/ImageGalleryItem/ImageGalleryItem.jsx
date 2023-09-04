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
