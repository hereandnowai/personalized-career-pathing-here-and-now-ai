
import React from 'react';
import { CareerPath, DevelopmentAction } from '../types';

interface DashboardProps {
  selectedPath: CareerPath | null;
  developmentPlan: DevelopmentAction[];
}

const ProgressBar: React.FC<{ label: string; percentage: number; colorClass?: string }> = ({ label, percentage, colorClass = "bg-primary" }) => (
  <div className="mb-3">
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium text-secondary dark:text-neutral-light">{label}</span>
      <span className="text-sm font-medium text-primary dark:text-yellow-300">{percentage}%</span>
    </div>
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
      <div className={`${colorClass} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
    </div>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ selectedPath, developmentPlan }) => {
  if (!selectedPath) {
    return (
      <div className="mt-12 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-bold text-secondary dark:text-primary mb-4">Your Career Dashboard</h2>
        <p className="text-gray-600 dark:text-gray-300">Select a career path to see your personalized dashboard and track your progress.</p>
      </div>
    );
  }

  // Mock progress calculation
  const overallProgress = Math.floor(Math.random() * 50) + 10; // Random progress between 10-60%
  const skillsCompleted = Math.floor(selectedPath.requiredSkills.length * (overallProgress / 100));
  const actionsCompleted = Math.floor(developmentPlan.length * (overallProgress / 100));


  return (
    <div className="mt-12 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-secondary dark:text-primary mb-6">
        Your Dashboard: <span className="text-primary dark:text-yellow-300">{selectedPath.title}</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Path Overview & Progress */}
        <div>
          <h3 className="text-lg font-semibold text-secondary dark:text-neutral-light mb-3">Path Progress</h3>
          <ProgressBar label="Overall Path Completion" percentage={overallProgress} />
          <ProgressBar label="Required Skills Acquired" percentage={Math.floor((skillsCompleted / selectedPath.requiredSkills.length) * 100) || 5} colorClass="bg-green-500" />
          <ProgressBar label="Development Actions Started" percentage={Math.floor((actionsCompleted / (developmentPlan.length || 1)) * 100) || 5} colorClass="bg-blue-500" />
          
          <div className="mt-6">
            <h4 className="text-md font-semibold text-gray-700 dark:text-gray-200 mb-2">Key Milestones (Illustrative)</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300">
              <li>Complete foundational training for '{selectedPath.skillsToDevelop[0] || 'core skill'}'.</li>
              <li>Lead a small project utilizing '{selectedPath.skillsToDevelop[1] || 'another skill'}'.</li>
              <li>Seek mentorship from a senior in the '{selectedPath.title}' field.</li>
              <li>Achieve certification in '{selectedPath.requiredSkills[0] || 'key technology'}'.</li>
            </ul>
          </div>
        </div>

        {/* Right Column: Key Info & Next Steps */}
        <div>
          <h3 className="text-lg font-semibold text-secondary dark:text-neutral-light mb-3">Path Highlights</h3>
          <div className="space-y-3 text-sm">
            <p><strong className="text-gray-700 dark:text-gray-200">Target Role:</strong> {selectedPath.title}</p>
            <p><strong className="text-gray-700 dark:text-gray-200">Est. Time to Reach:</strong> {selectedPath.estimatedTimeToReach}</p>
            <p><strong className="text-gray-700 dark:text-gray-200">Growth Potential:</strong> <span className="font-semibold text-primary dark:text-yellow-300">{selectedPath.growthPotential}</span></p>
            <p><strong className="text-gray-700 dark:text-gray-200">Skills to Focus:</strong> {selectedPath.skillsToDevelop.slice(0,3).join(', ')}{selectedPath.skillsToDevelop.length > 3 ? '...' : ''}</p>
          </div>

          <div className="mt-6">
            <h4 className="text-md font-semibold text-gray-700 dark:text-gray-200 mb-2">Next Suggested Actions:</h4>
            {developmentPlan.length > 0 ? (
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300">
                {developmentPlan.slice(0, 2).map(action => (
                  <li key={action.id}>{action.actionType}: {action.description.substring(0,50)}...</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">No specific actions in your plan yet. Explore learning resources!</p>
            )}
          </div>

          <div className="mt-6">
             <h4 className="text-md font-semibold text-gray-700 dark:text-gray-200 mb-2">Internal Mobility:</h4>
             <p className="text-sm text-gray-600 dark:text-gray-300">Keep an eye on internal job postings for roles like "{selectedPath.title}" or related positions. Shadowing opportunities may also be available.</p>
             {/* Placeholder for actual links or features */}
             <button className="mt-2 text-sm text-primary dark:text-yellow-300 hover:underline">
                View current openings (mock)
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
