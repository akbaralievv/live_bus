import comfortBus from '../../../assets/images/buses/comfort.jpg';
import comfortSalon from '../../../assets/images/buses/comfortSalon.jpg';
import economyBus from '../../../assets/images/buses/economy.jpg';
import economySalon from '../../../assets/images/buses/economySalon.jpg';
import bussinesSalon1 from '../../../assets/images/buses/businessSalon.jpg';
import bussinesSalon2 from '../../../assets/images/buses/businessSalon1.jpg';
import bussinesBus from '../../../assets/images/buses/business.jpg';

const products = [
  {
    id: 1,
    name: 'Эконом класс',
    href: '#',
    imageSrc: economyBus,
    imageSrcSalon: economySalon,
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
    seats: 15,
  },
  {
    id: 2,
    name: 'Комфорт класс',
    href: '#',
    imageSrc: comfortBus,
    imageSrcSalon: comfortSalon,
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
    seats: 20,
  },
  {
    id: 3,
    name: 'Бизнес класс',
    href: '#',
    imageSrc: bussinesBus,
    imageSrcSalon: bussinesSalon1,
    imageSrcSalon1: bussinesSalon2,
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
    seats: 35,
  },
];

function PriceListSection() {
  return (
    <div className="bg-white">
      <h3 className="text-3xl mb-8 font-semibold tracking-tight text-center">Наши автобусы</h3>
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} href={product.href} className="group">
              <div className="w-full overflow-hidden rounded-lg bg-gray-200">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <div className="w-full mt-2 overflow-hidden rounded-lg flex gap-2">
                <img
                  src={product.imageSrcSalon}
                  alt={product.imageAlt}
                  className="w-1/2 rounded-lg"
                />
                {product.imageSrcSalon1 && (
                  <img
                    src={product.imageSrcSalon1}
                    alt={product.imageAlt}
                    className="w-1/2 rounded-lg"
                  />
                )}
              </div>
              <h3 className="mt-4 text-xl text-gray-700">{product.name}</h3>
              <p className="mt-1 text-xl font-medium text-gray-900">
                Количество мест: {product.seats}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PriceListSection;
