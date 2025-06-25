
import React from 'react';
import { DevelopmentAction, CareerPath } from '../types';
import LoadingSpinner from './common/LoadingSpinner';

interface DevelopmentPlanSectionProps {
  plan: DevelopmentAction[];
  selectedPath: CareerPath | null;
  isLoading: boolean;
  error?: string | null;
}

const DevelopmentPlanSection: React.FC<DevelopmentPlanSectionProps> = ({ plan, selectedPath, isLoading, error }) => {
  if (!selectedPath) {
    return null; // Or some placeholder if needed before a path is selected
  }

  if (isLoading) {
    return <LoadingSpinner message={`Generating development plan for ${selectedPath.title}...`} className="my-8" />;
  }

  if (error) {
    return <p className="text-red-500 text-center my-8">Error generating development plan: {error}</p>;
  }
  
  if (plan.length === 0) {
    return <p className="text-gray-600 dark:text-gray-300 text-center my-8">No specific development actions suggested at this time for {selectedPath.title}.</p>;
  }

  const getIconForActionType = (actionType: string) => {
    switch (actionType.toLowerCase()) {
      case 'training': return '🎓'; // Graduation Cap
      case 'mentorship': return '🤝'; // Handshake
      case 'project assignment': return '💼'; // Briefcase
      case 'shadowing': return '👀'; // Eyes
      case 'certification': return '📜'; // Scroll
      default: return '💡'; // Lightbulb
    }
  };


  return (
    <div className="mt-12 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-secondary dark:text-primary mb-2">
        Development Plan for <span className="text-primary dark:text-yellow-300">{selectedPath.title}</span>
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Here are some suggested actions to help you progress towards this role.
      </p>
      
      <div className="space-y-6">
        {plan.map(action => (
          <div key={action.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-neutral-light dark:bg-gray-700/50 shadow-sm">
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-3">{getIconForActionType(action.actionType)}</span>
              <h3 className="text-lg font-semibold text-secondary dark:text-neutral-light">{action.actionType}</h3>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">{action.description}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              <span className="font-medium">Resource:</span> {action.suggestedResource}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              <span className="font-medium">Effort:</span> {action.estimatedEffort}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DevelopmentPlanSection;
