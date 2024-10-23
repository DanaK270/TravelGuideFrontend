import React from 'react'

const Gallery = ({ user }) => {
  const images = [
    'https://thumbs.dreamstime.com/b/car-full-suitcases-bags-to-go-summer-vacation-road-trip-315608403.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLJMUhGKETycAiy6wisxPdswptky9t5g3kzw&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo0gSKBQCko9MoPCu5ek4Ux2dJqRuPC7UVJw&s'
  ]

  return user ? (
    <section className="gallery-container">
      <h1>Gallery</h1>
      <div className="gallery">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Gallery Image ${index + 1}`}
            className="gallery-image"
          />
        ))}
      </div>
    </section>
  ) : (
    <>
      <h3>Oops! You must be signed in to do that!</h3>
      <button onClick={() => navigate('/sign-in')}>Sign In</button>
    </>
  )
}

export default Gallery
