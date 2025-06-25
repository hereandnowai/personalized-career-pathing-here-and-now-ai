
import React from 'react';
import { BRAND_CONFIG } from '../constants';

const AdminView: React.FC = () => {
  return (
    <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-secondary dark:text-primary mb-6">
        Admin Dashboard - {BRAND_CONFIG.brand.organizationShortName}
      </h1>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Welcome to the Admin View for the Personalized Career Pathing application.
        This section is intended for HR administrators to manage the platform, view analytics, and gain insights into talent mobility and skill gaps.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-neutral-light dark:bg-gray-700 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-secondary dark:text-neutral-light mb-3">Talent Mobility Trends</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            (Placeholder for analytics on employee movement across roles, departments, etc.)
          </p>
          <div className="mt-4 h-48 bg-gray-300 dark:bg-gray-600 rounded flex items-center justify-center text-gray-500 dark:text-gray-400">
            Chart/Graph Area
          </div>
        </div>

        <div className="bg-neutral-light dark:bg-gray-700 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-secondary dark:text-neutral-light mb-3">Skill Gap Heatmaps</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            (Placeholder for visualizations showing prevalent skill gaps within the organization.)
          </p>
           <div className="mt-4 h-48 bg-gray-300 dark:bg-gray-600 rounded flex items-center justify-center text-gray-500 dark:text-gray-400">
            Heatmap/Visualization Area
          </div>
        </div>
      </div>

      <div className="mt-8 bg-neutral-light dark:bg-gray-700 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-secondary dark:text-neutral-light mb-3">Employee Nudges & Communication</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          (Placeholder for tools to send personalized nudges or communications to employees regarding their career development.)
        </p>
        <button className="mt-4 px-4 py-2 bg-primary text-secondary-dark font-semibold rounded-lg hover:bg-yellow-500 transition-colors">
          Send Nudge (Feature Coming Soon)
        </button>
      </div>

       <p className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
        Further admin functionalities such as role matrix management, skill taxonomy updates, and L&D resource configuration will be available in future versions.
      </p>
    </div>
  );
};

export default AdminView;
