import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

function SliderRoutes() {
  const { routesData } = useSelector((state) => state.routesSlice);

  const settings = {
    className: 'center',
    infinite: true,
    centerPadding: '0px',
    slidesToShow: 4,
    speed: 500,
  };

  return (
    <div className="slider-container cursor-grab active:cursor-grabbing">
      <Slider {...settings}>
        {routesData?.map((item, index) => (
          <NavLink
            to="/detailRoutes"
            state={{ state: item }}
            key={index}
            className={`${
              item.name === 'Бишкек'
                ? 'bg-bishkek'
                : item.name === 'Ош'
                ? 'bg-osh'
                : item.name === 'Джалал-Абад'
                ? 'bg-jalalabad'
                : item.name === 'Алма-Ата'
                ? 'bg-almaty'
                : item.name === 'Нарын'
                ? 'bg-naryn'
                : ''
            } slider-card relative  rounded-2xl w-80 h-96 flex flex-col justify-end p-4 text-white bg-cover bg-center`}>
            <h3 className="text-lg">{item.name}</h3>
          </NavLink>
        ))}
      </Slider>
    </div>
  );
}

export default SliderRoutes;
