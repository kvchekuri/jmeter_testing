import Carousel from 'react-bootstrap/Carousel';

export const CarouselsHome = () => {
  return (
    <div className="max-w-3xl mx-auto my-8 rounded-2xl overflow-hidden shadow-md">
      <Carousel data-bs-theme="dark">
        <Carousel.Item>
          <img
            className="w-full h-56 object-cover"
            src="https://www.thebesthalifax.com/wp-content/uploads/2025/02/event-spaces-halifax.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="w-full h-56 object-cover"
            src="https://cdn-cjhkj.nitrocdn.com/krXSsXVqwzhduXLVuGLToUwHLNnSxUxO/assets/images/optimized/rev-d98e8d7/spotme.com/wp-content/uploads/2020/07/Hero-1.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="w-full h-56 object-cover"
            src="https://halifaxevents.ca/wp-content/uploads/2023/10/HE-Link-Preview.png"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}