
import React from 'react';
import { CareerPath } from '../types';
import Button from './common/Button';

interface CareerPathCardProps {
  path: CareerPath;
  onSelectPath: (path: CareerPath) => void;
  isSelected?: boolean;
}

const Tag: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${className}`}>
    {children}
  </span>
);

const CareerPathCard: React.FC<CareerPathCardProps> = ({ path, onSelectPath, isSelected }) => {
  const getScoreColor = (score: number) => {
    if (score >= 75) return 'bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100';
    if (score >= 50) return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-600 dark:text-yellow-100';
    return 'bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100';
  };
  
  const getQualitativeColor = (level: string) => {
    const l = level.toLowerCase();
    if (l === 'high') return 'bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100';
    if (l === 'medium') return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-600 dark:text-yellow-100';
    return 'bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100'; // Low or other
  }

  return (
    <div className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-2 ${isSelected ? 'border-primary dark:border-yellow-400' : 'border-transparent dark:border-gray-700'} transition-all duration-200 hover:shadow-xl`}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-secondary dark:text-primary">{path.title}</h3>
        <Tag className={getScoreColor(path.matchScore)}>Match: {path.matchScore}%</Tag>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{path.description}</p>

      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Key Required Skills:</h4>
        <div className="flex flex-wrap gap-2">
          {path.requiredSkills.slice(0, 5).map(skill => <Tag key={skill} className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">{skill}</Tag>)}
          {path.requiredSkills.length > 5 && <Tag className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">+{path.requiredSkills.length - 5} more</Tag>}
        </div>
      </div>
      
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Skills to Develop:</h4>
        <div className="flex flex-wrap gap-2">
          {path.skillsToDevelop.slice(0,4).map(skill => <Tag key={skill} className="bg-yellow-100 dark:bg-yellow-700 text-yellow-700 dark:text-yellow-100">{skill}</Tag>)}
           {path.skillsToDevelop.length > 4 && <Tag className="bg-yellow-100 dark:bg-yellow-700 text-yellow-700 dark:text-yellow-100">+{path.skillsToDevelop.length - 4} more</Tag>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm mb-6">
        <div>
          <span className="font-semibold text-gray-700 dark:text-gray-200">Time to Reach: </span>
          <Tag className="bg-blue-100 dark:bg-blue-700 text-blue-700 dark:text-blue-100">{path.estimatedTimeToReach}</Tag>
        </div>
        <div>
          <span className="font-semibold text-gray-700 dark:text-gray-200">Growth Potential: </span>
          <Tag className={getQualitativeColor(path.growthPotential)}>{path.growthPotential}</Tag>
        </div>
        <div>
          <span className="font-semibold text-gray-700 dark:text-gray-200">Interest Align: </span>
          <Tag className={getQualitativeColor(path.interestAlignment)}>{path.interestAlignment}</Tag>
        </div>
      </div>
      
      <Button 
        onClick={() => onSelectPath(path)} 
        variant={isSelected ? 'secondary' : 'primary'}
        className="w-full"
      >
        {isSelected ? 'Path Selected' : 'View Development Plan'}
      </Button>
    </div>
  );
};

export default CareerPathCard;
