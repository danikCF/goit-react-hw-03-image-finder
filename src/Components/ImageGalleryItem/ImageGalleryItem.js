import React, { Component } from 'react'

export default class ImageGalleryItem extends Component {

  getLargeImage = () => {
    this.props.onShowModal(this.props.webURL)
  }

  render() {
    const { webURL } = this.props;
    return (
      <>
        <li className="ImageGalleryItem">
          <img src={webURL}
            alt=""
            className="ImageGalleryItem-image"
            onClick={this.getLargeImage}
          />
        </li>

      </>
    )
  }
}