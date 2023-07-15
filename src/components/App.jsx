import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { ColorRing } from  'react-loader-spinner'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getImages } from 'services/getImages';
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
        //-------1----------
        // .then(res => {
        //   if (!res.ok) {
        //     throw new Error(res.status)
        //   }
        //  return res.json()
        // })
        //-------2-------Репета
          .then(res => {
            if (res.ok) {
              return res.json()
            }
            return Promise.reject(
              new Error(`Not found ${inputSearch}`))
          })
        .then(data => {
          this.setState(prevState => ({
            hits: [...prevState.hits, ...data.hits]
          }));
        })
        //--------1----------
        // .catch(error => this.setState({ error: error.message }))
          //-------2-------Репета
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }))
    }
  }
  
  handleFormSubmit = inputSearch => {
    this.setState({inputSearch})
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }))
  }

  render() {
    const { hits, loading, error } = this.state;
    const showLoadMoreBtn = hits.length > 0;

    return (
      <div className={css.app}>
        {/* Репета */}
        {error && <h2>{error.message}</h2>}

        <Searchbar onSubmit={ this.handleFormSubmit} />

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