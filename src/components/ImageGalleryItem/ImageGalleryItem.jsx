import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ images }) => {
  return (
    <>
      {images.map(({ id, webformatURL,tags}) => {
        return (
          <li key={id} className={css.imageGalleryItem}>
            <img className={css.imageGalleryItemImage} src={webformatURL} alt={tags} />
          </li>
        )
    })}
    </>
  )
}

ImageGalleryItem.propTypes = {
    id: PropTypes.number,
    webformatURL: PropTypes.string,
    tags: PropTypes.string
}
export default ImageGalleryItem;