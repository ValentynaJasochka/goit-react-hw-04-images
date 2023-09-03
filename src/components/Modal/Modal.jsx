import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalImg } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ largeImageURL, tags, onClose }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const onClickOverlay = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  return createPortal(
    <Overlay onClick={onClickOverlay}>
      <ModalImg>
        <img src={largeImageURL} alt={tags} />
      </ModalImg>
    </Overlay>,
    modalRoot
  );
};

// export class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }
//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }
//   handleKeyDown = event => {
//     if (event.code === 'Escape') {
//       this.props.onClose();
//     }
//   };
//   onClickOverlay = event => {
//     if (event.target === event.currentTarget) {
//       this.props.onClose();
//     }
//   };
//   render() {
//     const { largeImageURL, tags } = this.props;
//     return createPortal(
//       <Overlay onClick={this.onClickOverlay}>
//         <ModalImg>
//           <img src={largeImageURL} alt={tags} />
//         </ModalImg>
//       </Overlay>,
//       modalRoot
//     );
//   }
// }
