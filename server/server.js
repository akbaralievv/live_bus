import express from 'express';
import { Client, Databases, Query } from 'node-appwrite';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('665b617e0031776b4ed0')
  .setKey(
    '04df49508f528e158270543bf8608b08ceb2d6b821765ac8c57eb3d1c5fb002563a4567aca9833c337364c856d575cbe724556ef298ba5db36ec6911da20b0655925d2867e21b118ab84794e57fd884e71e3e48582d9990f7b2159d7f7966793020140f52dc44167640db84b1b31d5659625fa2fc0ccada5821eb228d99759ef',
  );
const database = new Databases(client);
const PORT = process.env.PORT || 5000;
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kgkgg28@gmail.com',
    pass: 'igvv lmoo jxsn homb',
  },
});

const createReceipt = (seatNumber, formData, date, typeBus) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="text-align: center;">Чек оплаты</h2>
      <p>Здравствуйте, ${formData.firstName} ${formData.lastName}</p>
      <p>Спасибо за покупку! Ниже приведены детали вашего заказа:</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <thead>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Детали</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Значение</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Номер места</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${seatNumber}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Тип автобуса</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${
              typeBus === 'economy'
                ? 'Эконом класс'
                : typeBus === 'comfort'
                ? 'Комфорт класс'
                : typeBus === 'business'
                ? 'Бизнес класс'
                : ''
            }</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Цена</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${formData.price} сом</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Дата</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${date}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">ФИО</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${formData.firstName} ${
    formData.lastName
  }</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Возраст</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${formData.age}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Пол</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${formData.gender}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Количество человек</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${formData.passengers}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Телефон</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${formData.phone}</td>
          </tr>
        </tbody>
      </table>
      <p style="margin-top: 20px;">Если у вас есть какие-либо вопросы, пожалуйста, свяжитесь с нами.</p>
      <p>С уважением,<br/>Live Bus</p>
    </div>
  `;
};

app.post('/update-seat-status', async (req, res) => {
  const { seatNumber, status, email, formData, typeBus } = req.body;

  try {
    const seatDocument = await database.listDocuments('database', 'seats_' + typeBus, [
      Query.equal('seat_number', seatNumber),
    ]);

    if (seatDocument.total > 0) {
      const documentId = seatDocument.documents[0].$id;
      await database.updateDocument('database', 'seats_' + typeBus, documentId, {
        status,
      });
      if (status === 'reserved') {
        setTimeout(async () => {
          const newStatus = status === 'occupied' ? 'occupied' : 'free';
          await database.updateDocument('database', 'seats_' + typeBus, documentId, {
            status: newStatus,
          });
        }, 1 * 60 * 1000);
      }
      if (status === 'occupied' && email) {
        const date = new Date().toLocaleDateString();
        const receiptHtml = createReceipt(seatNumber, formData, date, typeBus);
        const mailOptions = {
          from: 'kgkgg28@gmail.com',
          to: email,
          subject: 'Чек оплаты',
          html: receiptHtml,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log('Email sent: ' + info.response);
        });
      }
      res.status(200).send({ message: 'Seat status updated successfully' });
    } else {
      res.status(404).send({ message: 'Seat not found' });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
