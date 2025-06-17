import PropTypes from "prop-types";

const SliderItem = ({ slide }) => {
  const linkUrl = slide.buttonLink || slide.link || "#";

  return (
    <div className="slider-item fade">
      <div className="slider-background">
        <img src={slide.image} className="img-fluid" alt={slide.title} />
        <div className="slider-overlay"></div>
      </div>
      <div className="container">
        <div className="slider-content">
          <p className="slider-subtitle">{slide.subtitle}</p>
          <h1 className="slider-title">{slide.title}</h1>
          <p className="slider-description">{slide.description}</p>
          {slide.buttonText && (
            <a href={linkUrl} className="btn btn-lg btn-primary">
              {slide.buttonText}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default SliderItem;

SliderItem.propTypes = {
  slide: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    description: PropTypes.string,
    buttonText: PropTypes.string,
    buttonLink: PropTypes.string,
    link: PropTypes.string,
  }).isRequired,
};
