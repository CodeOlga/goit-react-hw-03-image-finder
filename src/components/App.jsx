import { Component } from 'react';
import { ColorRing } from  'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getImages } from 'services/getImages';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
import Loader from './Loader/Loader';
// import Modal from './Modal/Modal';
import css from './App.module.css';

class App extends Component {
  state = {
    inputSearch: '',
    hits: [],
    page: 1,
    loading: false,
    error: null
  }

  componentDidUpdate(_, prevState) {
    const { inputSearch, page } = this.state;

    if (inputSearch !== prevState.inputSearch || page !== prevState.page) {
          this.setState({ loading: true, error: null })

      getImages(inputSearch, page)
          .then(res => {
            if (res.ok) {
              return res.json()
            }
            return Promise.reject(
              new Error(`Not found ${inputSearch}`))
          })
        .then(data => {
          if (!data.totalHits) {
            return toast.error(`No results found for ${inputSearch}`);
          }
          this.setState(prevState => ({
            hits: [...prevState.hits, ...data.hits]
          }));
        })
        .catch(error => {
          // this.setState({ error: error.message })
          return toast.error(`Failed, try later`)
        })
        .finally(() => this.setState({ loading: false }))
    }
  }
  
  handleFormSubmit = inputSearch => {
    //потрібно очищувати hits, щоб при новому пошуку оновлювався запит
    this.setState({ inputSearch, page: 1, hits: [], error: null });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }))
  }

  render() {
    // const { hits, loading, error } = this.state;
    const { hits, loading } = this.state;
    const showLoadMoreBtn = hits.length > 0;

    return (
      <div className={css.app}>

        <Searchbar onSubmit={ this.handleFormSubmit} />

        {/* //якщо кастомний текст */}
        {/* {error && <h2>{error}</h2>} */}
        {loading && 
          <Loader>
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        </Loader>}

        {hits && 
          <ImageGallery>
              <ImageGalleryItem images={hits} />
          </ImageGallery>
          }

        {showLoadMoreBtn && 
          <Button onBtnClick={() => this.handleLoadMore()} />
        }

        {/* <Modal /> */}
        <ToastContainer autoClose={3000} />
    </div>
  );
  }
};

export default App;