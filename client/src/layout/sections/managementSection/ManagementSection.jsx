import { ShoppingCartIcon, UsersIcon, CreditCardIcon } from '@heroicons/react/20/solid';

import image from '../../../assets/images/managementSection/image.png';

const features = [
  {
    name: 'Нажимаете на "Купить билет".',
    description: 'Вас переведет на страницу с выбором мест в автобусе.',
    icon: ShoppingCartIcon,
  },
  {
    name: 'Заполняете форму, выбираете места в зависимости от количества человек.',
    description:
      'Снизу будет кнопка "Перейти к оплате". Она переведет вас на страницу оплаты банковской картой',
    icon: UsersIcon,
  },
  {
    name: 'Заполните данные банковской карты.',
    description:
      'После заполнения и успешной транзакции, к вам на почту придет чек оплаты. Можете этот чек показать водителю автобуса.',
    icon: CreditCardIcon,
  },
];

function ManagementSection() {
  return (
    <div className="overflow-hidden bg-white py-6 sm:py-8">
      <h3 className="text-3xl mb-12 font-semibold tracking-tight text-center">Наши автобусы</h3>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">
                Забронируйте место
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Как купить билет?
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Выполняйте пошаговую инструкцию чтобы купить билет.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon
                        className="absolute left-1 top-1 h-5 w-5 text-indigo-600"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            src={image}
            alt="Product screenshot"
            className="w-full max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
    </div>
  );
}

export default ManagementSection;
