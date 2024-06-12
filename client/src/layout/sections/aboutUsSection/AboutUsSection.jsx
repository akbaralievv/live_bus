import {
  MapIcon,
  CursorArrowRaysIcon,
  ShieldCheckIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';

const cards = [
  {
    title: 'Широкий выбор маршрутов',
    description:
      'Мы сотрудничаем с ведущими автобусными перевозчиками, что позволяет нам предлагать вам множество маршрутов по доступным ценам.',
    icon: MapIcon,
  },
  {
    title: 'Удобство и простота',
    description:
      'Наш интуитивно понятный интерфейс позволяет легко найти и забронировать билеты всего за несколько кликов.',
    icon: CursorArrowRaysIcon,
  },
  {
    title: 'Безопасность',
    description:
      'Мы гарантируем безопасность ваших данных и защиту каждой транзакции, чтобы вы могли покупать билеты с уверенностью.',
    icon: ShieldCheckIcon,
  },
  {
    title: 'Поддержка клиентов',
    description:
      'Наша служба поддержки всегда готова помочь вам с любыми вопросами и предоставить необходимую информацию.',
    icon: PhoneIcon,
  },
];

function AboutUsSection() {
  return (
    <div className="py-6 sm:py-8">
      <h3 className="text-3xl mb-10 font-semibold tracking-tight text-center">Описание</h3>
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight">
          Добро пожаловать на наш сайт — ваш надежный партнер в планировании автобусных путешествий!
        </h1>
        <p className="mt-6 text-lg leading-6 text-gray-600">
          Мы предоставляем удобный и простой способ покупки билетов на автобусы по различным
          направлениям.
        </p>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold leading-8 mb-2">Почему выбирают нас?</h2>
        <div className="flex gap-4 flex-wrap justify-center">
          {cards.map((info, id) => (
            <div
              key={id}
              className="w-72 items-start p-4 bg-opacity-5 bg-gray-900 rounded-lg shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                  <info.icon
                    className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-medium text-lg">{info.title}</h3>
              </div>
              <p className="text-gray-600">{info.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutUsSection;
