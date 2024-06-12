import { Routes, Route } from 'react-router-dom';

import AboutUsSection from '../../layout/sections/aboutUsSection/AboutUsSection';
import PriceListSection from '../../layout/sections/priceList/PriceListSection';
import ManagementSection from '../../layout/sections/managementSection/ManagementSection';
import ContactsSection from '../../layout/sections/contactsSection/ContactsSection';

function AboutUs() {
  return (
    <div className="flex-1 mx-auto w-full max-w-7xl px-4">
      <Routes>
        <Route path="/" element={<AboutUsSection />} />
        <Route path="/priceList" element={<PriceListSection />} />
        <Route path="/management" element={<ManagementSection />} />
        <Route path="/contacts" element={<ContactsSection />} />
      </Routes>
    </div>
  );
}

export default AboutUs;
