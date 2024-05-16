import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState } from 'react';

const cards = [
  {
    className: 'bg-bishkek',
    title: 'Бишкек',
    price: 'от 1000 сом',
  },
  {
    className: 'bg-batken',
    title: 'Баткен',
    price: 'от 1000 сом',
  },
  {
    className: 'bg-jalalabad',
    title: 'Джалал-Абад',
    price: 'от 1000 сом',
  },
  {
    className: 'bg-osh',
    title: 'Ош',
    price: 'от 1000 сом',
  },
  {
    className: 'bg-talas',
    title: 'Талас',
    price: 'от 1000 сом',
  },
  {
    className: 'bg-issykkol',
    title: 'Ыссык-Кол',
    price: 'от 1000 сом',
  },
  {
    className: 'bg-naryn',
    title: 'Нарын',
    price: 'от 1000 сом',
  },
];

function SliderRoutes() {
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 4,
    speed: 500,
    afterChange: (index) => setActiveSlide(index),
  };

  return (
    <div className="slider-container cursor-grab active:cursor-grabbing">
      <Slider {...settings}>
        {cards.map((item, index) => (
          <div
            key={index}
            className={`${item.className} slider-card relative  rounded-2xl w-80 h-96 flex flex-col justify-end p-4 text-white bg-cover bg-center`}>
            {activeSlide !== index && (
              <div className="absolute inset-0 bg-black opacity-50 rounded-2xl"></div>
            )}
            <h3 className="text-lg">{item.title}</h3>
            <p className="text-base">{item.price}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SliderRoutes;
