
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import EmployeeView from './views/EmployeeView';
import AdminView from './views/AdminView'; // Placeholder
import { BRAND_CONFIG } from './constants';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-neutral-light dark:bg-neutral-dark text-secondary dark:text-neutral-light font-sans">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Navigate to="/employee" replace />} />
            <Route path="/employee" element={<EmployeeView />} />
            <Route path="/admin" element={<AdminView />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

// Set favicon dynamically from brand config
const faviconEl = document.getElementById('favicon') as HTMLLinkElement | null;
if (faviconEl) {
  faviconEl.href = BRAND_CONFIG.brand.logo.favicon;
}
document.title = `Personalized Career Pathing - ${BRAND_CONFIG.brand.organizationShortName}`;


export default App;
