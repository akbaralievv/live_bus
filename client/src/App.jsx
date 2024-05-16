import { Routes, Route } from 'react-router-dom';

import Layout from './layout';
import Main from './pages/main';
import RoutesBus from './pages/routesBus';
import Weather from './pages/weather';

function App() {
  // useEffect(() => {
  //   fetch('/api')
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // }, []);

  return (
    <div className="flex flex-col h-screen">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/routesBus" element={<RoutesBus />} />
          <Route path="/weather" element={<Weather />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
