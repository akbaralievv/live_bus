import { PhoneIcon, EnvelopeIcon, MapIcon } from '@heroicons/react/24/outline';

const cards = [
  {
    title: '996771007644',
    description: 'Вы можете позвонить по этому номеру или написать на WhatsApp.',
    icon: PhoneIcon,
  },
  {
    title: 'kgkgg28@gmail.com',
    description: 'Можете отправить письмо нам на почту.',
    icon: EnvelopeIcon,
  },
  {
    title: 'Калык Акиева 11',
    description: 'Мы находимся по этому адресу.',
    icon: MapIcon,
  },
];

function ContactsSection() {
  return (
    <div className="py-6 sm:py-8">
      <h3 className="text-3xl mb-8 font-semibold tracking-tight text-center">Наши контакты</h3>
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
  );
}

export default ContactsSection;
