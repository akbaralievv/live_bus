import { Routes, Route } from 'react-router-dom';

import Layout from './layout';
import Tickets from './pages/tickets';
import RoutesBus from './pages/routesBus';
import DetailTicket from './pages/detailTicket';
import Payment from './pages/payment';
import AboutUs from './pages/aboutUs';
import DetailRoutes from './pages/detailRoutes/DetailRoutes';

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Tickets />} />
          <Route path="/routesBus" element={<RoutesBus />} />
          <Route path="/detailTicket" element={<DetailTicket />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/aboutUs/*" element={<AboutUs />} />
          <Route path="/detailRoutes" element={<DetailRoutes />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
