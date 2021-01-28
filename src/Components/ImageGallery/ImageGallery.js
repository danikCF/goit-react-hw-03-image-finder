import React from 'react'

export default function ImageGallery({children}) {
  return (
    <div className="container">
      <ul className="ImageGallery">
        {children}
      </ul>
    </div>
  )
}
