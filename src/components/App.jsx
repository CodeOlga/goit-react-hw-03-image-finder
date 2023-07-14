import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import { getImages } from 'services/getImages';
// import api from '../services/getImages';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
// import Button from './Button/Button';
// import Loader from './Loader/Loader';
// import Modal from './Modal/Modal';
import css from './App.module.css';
// import {ImSearch } from 'react-icons/im'

class App extends Component {
   state = {
     inputSearch: '',
      //  images: null,
     hits: [],
     id: '',
     webformatURL: '',
     largeImageURL: '',

   loading: false
  }
  // state = {
  //   images: null,
  //   loading: false
  // }


  // componentDidMount() {
    // console.log('mount')
    // this.setState({loading: true})
    // fetch('https://pixabay.com/api/?q=`${this.inputSearch}`&page=1&key=37056848-912ded0eb5e75838ece32e5ab&image_type=photo&orientation=horizontal&per_page=12')
    //   .then(res => res.json())
    //   .then(data => this.setState({ data }))
    //   .finally(() => this.setState({ loading: false }))
    // console.log(data)

    // const contacts = localStorage.getItem('contacts');
    // const parsedContacts = JSON.parse(contacts);

    // if (parsedContacts) {
    //   this.setState({contacts: parsedContacts})
    // }
  // }

  componentDidUpdate(_, prevState) {
        // console.log('update')
    // if (this.state.contacts !== prevState.contacts) {
    //   localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    // }
    // this.setState({ loading: true })
    if (this.state.inputSearch !== prevState.inputSearch) {
      // fetch('https://pixabay.com/api/?q=`${this.inputSearch}`&page=1&key=37056848-912ded0eb5e75838ece32e5ab&image_type=photo&orientation=horizontal&per_page=12')
      //   .then(res => res.json())
      //   .then(hits => this.setState({ hits }))
      //   .finally(() => this.setState({ loading: false }))
      getImages(this.state.inputSearch)
        .then(res => res.json())
        .then(hits => this.setState(hits));

    }
  }
  
  handleFormSubmit = inputSearch => {
   this.setState({inputSearch})
  }
  render() {
    const { hits } = this.state;
  
    return (
          // <div>
     <div className={css.app}> 
          <Searchbar onSubmit={ this.handleFormSubmit} />
          {/* {hits && hits.map(el => { return <li>{el.webformatURL}</li>})} */}
          {hits && (
          <ImageGallery>
              <ImageGalleryItem images={hits} />
          </ImageGallery>
          )}

          {/*  {this.state.loading && <h1>Loading...</h1>} */}
          {/* {this.state.images && <div>{this.state.images.hits[0].tags}</div>} */} 
        
          {/* <Button /> */}
          {/* <Loader /> */}
          {/* <Modal /> */}
          <ToastContainer autoClose={3000} />
    </div>
  );
  }

};
export default App;