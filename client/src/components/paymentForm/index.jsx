import { useState, useCallback, useEffect } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

export default function PaymentForm() {
  const [state, setState] = useState({
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  });
  const [errors, setErrors] = useState({
    cvc: null,
    expiry: null,
    name: null,
    number: null,
  });

  const handleInputFocus = useCallback(
    (e) => {
      setState({ ...state, focus: e.target.name });
    },
    [state],
  );

  const validateNumber = (number) => {
    return number.replace(/\D/g, '');
  };

  const validateName = (name) => {
    return name.replace(/[^a-zA-Z\s]/g, '');
  };

  const validateExpiry = (expiry) => {
    return expiry.replace(/\D/g, '').slice(0, 4);
  };

  const validateCVC = (cvc) => {
    return cvc.replace(/\D/g, '').slice(0, 4);
  };

  const validateInput = useCallback(
    (name, value) => {
      let errorMessage = null;
      switch (name) {
        case 'number':
          if (value && !/^\d{0,16}$/.test(value)) {
            errorMessage = 'Только цифры';
          }
          break;
        case 'name':
          if (value && !/^[a-zA-Z\s]*$/.test(value)) {
            errorMessage = 'Только буквы';
          }
          break;
        case 'expiry':
          if (value && !/^\d{0,4}$/.test(value)) {
            errorMessage = 'Только цифры';
          }
          break;
        case 'cvc':
          if (value && !/^\d{0,4}$/.test(value)) {
            errorMessage = 'Только цифры';
          }
          break;
        default:
          break;
      }
      setErrors({ ...errors, [name]: errorMessage });
    },
    [errors],
  );

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      validateInput(name, value);
      let validatedValue = value;
      switch (name) {
        case 'number':
          validatedValue = validateNumber(value);
          break;
        case 'name':
          validatedValue = validateName(value);
          break;
        case 'expiry':
          validatedValue = validateExpiry(value);
          break;
        case 'cvc':
          validatedValue = validateCVC(value);
          break;
        default:
          break;
      }
      setState({ ...state, [name]: validatedValue });
    },
    [state],
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasErrors = Object.values(errors).some((error) => error !== null);

    if (!hasErrors && state.cvc && state.name && state.number && state.expiry) {
      console.log('Form submitted:', state);
      alert('Оплачено');
      //API-запрос
    } else {
      console.log('Errors present. Cannot submit form.');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div id="PaymentForm">
        <Cards
          rccsSize={'500px'}
          cvc={state.cvc}
          expiry={state.expiry}
          focused={state.focus}
          name={state.name}
          number={state.number}
        />
        <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto flex flex-col gap-4">
          <div className="flex gap-4 justify-between">
            <div>
              <label
                htmlFor="number"
                className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                Номер карты
              </label>
              <input
                type="tel"
                name="number"
                id="number"
                placeholder="Введите номер карты"
                value={state.number}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                maxLength={16}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              />
              {errors.number && <span className="text-red-500">{errors.number}</span>}
            </div>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                Имя
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Введите ФИО"
                value={state.name}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                maxLength={30}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              />
              {errors.name && <span className="text-red-500">{errors.name}</span>}
            </div>
          </div>

          <div className="flex gap-4 justify-between">
            <div>
              <label
                htmlFor="expiry"
                className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                Дата
              </label>
              <input
                type="tel"
                name="expiry"
                id="expiry"
                placeholder="Введите дату"
                value={state.expiry}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                maxLength={4}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              />
              {errors.expiry && <span className="text-red-500">{errors.expiry}</span>}
            </div>
            <div>
              <label
                htmlFor="cvc"
                className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                CVC
              </label>
              <input
                type="tel"
                name="cvc"
                id="cvc"
                placeholder="Введите CVC"
                value={state.cvc}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                maxLength={4}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              />
              {errors.cvc && <span className="text-red-500">{errors.cvc}</span>}
            </div>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Оплатить
          </button>
        </form>
      </div>
    </div>
  );
}
