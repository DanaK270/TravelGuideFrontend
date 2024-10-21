import React from 'react';


const Gallery = () => {
  const images = [
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUSExIVFRUV...', // shortened for brevity
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLJMUhGKETycAiy6wisxPdswptky9t5g3kzw&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo0gSKBQCko9MoPCu5ek4Ux2dJqRuPC7UVJw&s',
  ];

  return (
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
  );
};

export default Gallery;
