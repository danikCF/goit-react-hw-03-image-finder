import React, { Component } from 'react'
import Searchbar from './Searchbar/Searchbar'
import Button from './Button/Button'
import Modal from './Modal/Modal'
import fetchPhotos from '../Services/Api'
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Loader from "./Loader/Loader";






export default class App extends Component {
  state = {
    photos: [],
    loading: false,
    query: "",
    error: null,
    page: 0,
    largeImageURL: null,
  };
  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;

    if (prevQuery !== nextQuery) {
      this.fetchPhotosService();
    }
  }
handleSearchBar = (search) => {
  const { query } = search;
  this.setState({
    query: query,
    photos: [],
    page: 1,
  });
};
onShowModal = (webURL) => {
  this.setState({ largeImageURL: webURL});
};

toggleModal = (e) => {
  this.setState({
    largeImageURL: e,
  });
};

fetchPhotosService = () => {
  const { page, query } = this.state;
  this.setState({ loading: true });

  fetchPhotos(query, page)
    .then((photos) =>
      this.setState((prevState) => ({
        photos: [...prevState.photos, ...photos],
        page: prevState.page + 1,
      }))
    )
    .catch((error) => this.setState({ error }))
    .finally(() => {
      this.setState({ loading: false });
      if (page > 1) {
        this.scrollToEnd()
      }
    });
};
scrollToEnd = () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
  });
};

  render() {
    const { photos, loading, error, largeImageURL } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearchBar} />
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {loading ? (
          <Loader />
        ) : (
          <ImageGallery>
            {photos.map(({ id, webformatURL, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                webURL={webformatURL}
                largeImageURL={largeImageURL}
                onShowModal={this.onShowModal}
              />
            ))}
          </ImageGallery>
        )}
        {photos.length > 11 && !loading && (
          <Button onLoadMore={this.fetchPhotosService} />
        )}
        {largeImageURL && (
          <Modal
            largeImageURL={largeImageURL}
            onCloseModal={this.toggleModal}
          />
        )}
      </div>
    );
  }
}