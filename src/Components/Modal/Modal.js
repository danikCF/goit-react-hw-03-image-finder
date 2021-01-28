import React, { Component } from 'react'

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("click", this.handleCloseOverlay);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("click", this.handleCloseOverlay); 
  }

  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.onCloseModal(null);
    }
  };

  handleCloseOverlay = (e) => {
    console.dir(e.target);
    if (e.target.className.includes("Overlay")) {
      this.props.onCloseModal(null);
    }
  };

  render() {
    const { largeImageURL } = this.props;
    return (
      <div className="Overlay">
      <div className="Modal">
        <img src={largeImageURL} alt="" />
      </div>
    </div>
    );
  }
}