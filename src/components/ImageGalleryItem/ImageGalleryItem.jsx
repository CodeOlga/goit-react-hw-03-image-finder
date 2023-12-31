import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ images, onImageClick }) => {
  return (
    <>
      {images.map(({ id, webformatURL,tags}) => {
        return (
          <li key={id} className={css.imageGalleryItem}>
            <img
              className={css.imageGalleryItemImage}
              src={webformatURL}
              alt={tags}
              onClick={() => onImageClick(webformatURL)}/>
          </li>
        )
    })}
    </>
  )
}

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      webformatURL: PropTypes.string,
      tags: PropTypes.string,
    })
  ),
  onImageClick: PropTypes.func.isRequired
};

export default ImageGalleryItem;