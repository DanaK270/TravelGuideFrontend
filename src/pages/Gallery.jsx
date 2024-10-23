import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';

const Gallery = ({ user }) => {
  const images = [
    'https://thumbs.dreamstime.com/b/car-full-suitcases-bags-to-go-summer-vacation-road-trip-315608403.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLJMUhGKETycAiy6wisxPdswptky9t5g3kzw&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo0gSKBQCko9MoPCu5ek4Ux2dJqRuPC7UVJw&s'
  ];

  let navigate = useNavigate();

  // Custom Arrow Components
  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        className="custom-arrow next-arrow"
        onClick={onClick}
        style={nextArrowStyle}
      >
        ➡
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        className="custom-arrow prev-arrow"
        onClick={onClick}
        style={prevArrowStyle}
      >
        ⬅
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return user ? (
    <section className="gallery-container" style={galleryContainerStyle}>
      <h1>Gallery</h1>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Gallery Image ${index + 1}`}
              style={imageStyle}
            />
          </div>
        ))}
      </Slider>
    </section>
  ) : (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h3>Oops! You must be signed in to do that!</h3>
      <button onClick={() => navigate('/sign-in')} style={buttonStyle}>
        Sign In
      </button>
    </div>
  );
};

const galleryContainerStyle = {
  maxWidth: '600px',
  margin: 'auto',
  textAlign: 'center',
  marginTop: '50px',
};

const imageStyle = {
  width: '100%',
  borderRadius: '10px',
  objectFit: 'cover',
};

const buttonStyle = {
  marginTop: '20px',
  padding: '10px 20px',
  borderRadius: '25px',
  backgroundColor: '#6C85F7',
  color: 'black',
  border: 'none',
  cursor: 'pointer',
  fontSize: '16px',
};

// Custom Arrow Styles
const arrowBaseStyle = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 2, // Ensure the arrow is above the image
  cursor: 'pointer',
  fontSize: '30px', // Bigger arrow size
  color: '#6C85F7', // Matching earlier button color
  backgroundColor: 'rgba(255, 255, 255, 0.8)', // White background with transparency
  borderRadius: '50%', // Circle-shaped arrow button
  width: '50px',
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
};

const nextArrowStyle = {
  ...arrowBaseStyle,
  right: '10px',
};

const prevArrowStyle = {
  ...arrowBaseStyle,
  left: '10px',
};

export default Gallery;
