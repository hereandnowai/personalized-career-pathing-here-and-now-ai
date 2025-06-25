
import React, { useState, useCallback, useEffect } from 'react';
import { EmployeeProfile, CareerPath, DevelopmentAction, AnalyzedSkills } from '../types';
import ProfileForm from '../components/ProfileForm';
import CareerPathCard from '../components/CareerPathCard';
import DevelopmentPlanSection from '../components/DevelopmentPlanSection';
import Dashboard from '../components/Dashboard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Chatbot from '../components/Chatbot';
import Button from '../components/common/Button';
import { 
  analyzeSkillsAndAspirations, 
  getCareerPathRecommendations, 
  generateDevelopmentPlan 
} from '../services/geminiService';

type ViewStep = 'profile' | 'paths' | 'plan' | 'dashboard';

const STEPS_CONFIG = [
  { id: 'profile', title: 'Your Profile' },
  { id: 'paths', title: 'Career Paths' },
  { id: 'plan', title: 'Development Plan' },
  { id: 'dashboard', title: 'Your Dashboard' },
];


const EmployeeView: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<ViewStep>('profile');
  const [profile, setProfile] = useState<EmployeeProfile | null>(null);
  const [analyzedSkills, setAnalyzedSkills] = useState<AnalyzedSkills | null>(null);
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);
  const [selectedPath, setSelectedPath] = useState<CareerPath | null>(null);
  const [developmentPlan, setDevelopmentPlan] = useState<DevelopmentAction[]>([]);
  
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [isLoadingPaths, setIsLoadingPaths] = useState(false);
  const [isLoadingPlan, setIsLoadingPlan] = useState(false);
  
  const [errorProfile, setErrorProfile] = useState<string | null>(null);
  const [errorPaths, setErrorPaths] = useState<string | null>(null);
  const [errorPlan, setErrorPlan] = useState<string | null>(null);

  const handleProfileSubmit = useCallback(async (submittedProfile: EmployeeProfile) => {
    setIsLoadingProfile(true);
    setErrorProfile(null);
    setProfile(submittedProfile);
    
    try {
      const analysisResult = await analyzeSkillsAndAspirations(submittedProfile);
      if (analysisResult) {
        setAnalyzedSkills(analysisResult);
        // Automatically fetch career paths after analysis
        setIsLoadingPaths(true);
        setErrorPaths(null);
        const pathsResult = await getCareerPathRecommendations(submittedProfile, analysisResult);
        if (pathsResult) {
          setCareerPaths(pathsResult);
          setCurrentStep('paths');
        } else {
          setErrorPaths("Could not retrieve career path recommendations. Please try again.");
          setCareerPaths([]); // Clear previous paths if any
        }
        setIsLoadingPaths(false);

      } else {
        setErrorProfile("Could not analyze profile. Please check your input or try again.");
      }
    } catch (error) {
      console.error("Error in profile submission flow:", error);
      setErrorProfile("An unexpected error occurred during profile analysis.");
    } finally {
      setIsLoadingProfile(false);
    }
  }, []);

  const handleSelectPath = useCallback(async (path: CareerPath) => {
    setSelectedPath(path);
    setCurrentStep('plan'); // Move to plan step
    setIsLoadingPlan(true);
    setErrorPlan(null);
    setDevelopmentPlan([]); // Clear previous plan

    if (profile) { // Ensure profile is available
      try {
        const planResult = await generateDevelopmentPlan(profile, path);
        if (planResult) {
          setDevelopmentPlan(planResult);
        } else {
          setErrorPlan("Could not generate a development plan for this path. You can still explore the dashboard.");
        }
      } catch (error) {
        console.error("Error fetching development plan:", error);
        setErrorPlan("An unexpected error occurred while generating the plan.");
      } finally {
        setIsLoadingPlan(false);
      }
    } else {
        setErrorPlan("User profile not found. Cannot generate development plan.");
        setIsLoadingPlan(false);
    }
  }, [profile]);
  
  const navigateToStep = (step: ViewStep) => {
    // Basic validation: cannot go to plan/dashboard without profile/paths
    if ((step === 'plan' || step === 'dashboard') && !selectedPath) {
        if (!profile) {
            setCurrentStep('profile');
            return;
        }
        if (careerPaths.length === 0) {
            setCurrentStep('paths'); // Or back to profile if paths depend on a new submission
            return;
        }
        // If paths exist but no specific path selected, maybe stay or go to paths
        setCurrentStep('paths');
        return;
    }
    if (step === 'paths' && !profile) {
        setCurrentStep('profile');
        return;
    }
    setCurrentStep(step);
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 'profile':
        return (
          <>
            {errorProfile && <p className="text-red-500 bg-red-100 dark:bg-red-900 p-3 rounded-md mb-4 text-center">{errorProfile}</p>}
            <ProfileForm onSubmit={handleProfileSubmit} isLoading={isLoadingProfile} />
          </>
        );
      case 'paths':
        if (isLoadingPaths) return <LoadingSpinner message="Finding suitable career paths for you..." className="my-12"/>;
        if (errorPaths) return <p className="text-red-500 bg-red-100 dark:bg-red-900 p-3 rounded-md mb-4 text-center">{errorPaths}</p>;
        if (careerPaths.length === 0 && !isLoadingPaths) return <p className="text-gray-600 dark:text-gray-300 text-center my-12">No career paths found based on your profile. Try adjusting your inputs.</p>;
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-secondary dark:text-primary mb-8">Recommended Career Paths</h2>
            {careerPaths.map(path => (
              <CareerPathCard 
                key={path.id} 
                path={path} 
                onSelectPath={handleSelectPath}
                isSelected={selectedPath?.id === path.id}
              />
            ))}
          </div>
        );
      case 'plan':
        return (
          <>
            {selectedPath && <CareerPathCard path={selectedPath} onSelectPath={() => {}} isSelected={true} />}
            <DevelopmentPlanSection 
                plan={developmentPlan} 
                selectedPath={selectedPath} 
                isLoading={isLoadingPlan}
                error={errorPlan}
            />
            {selectedPath && !isLoadingPlan && (
                 <div className="mt-8 text-center">
                    <Button onClick={() => navigateToStep('dashboard')} variant="primary" size="lg">
                        View My Dashboard
                    </Button>
                </div>
            )}
          </>
        );
      case 'dashboard':
        return <Dashboard selectedPath={selectedPath} developmentPlan={developmentPlan} />;
      default:
        return <p>Invalid step.</p>;
    }
  };

  const currentStepIndex = STEPS_CONFIG.findIndex(s => s.id === currentStep);

  return (
    <div className="container mx-auto py-8">
      {/* Stepper Navigation */}
      <div className="mb-12">
        <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
          {STEPS_CONFIG.map((step, index) => (
            <li
              key={step.id}
              onClick={() => {
                // Allow navigation only if steps are accessible
                if (index < currentStepIndex && step.id === 'paths' && careerPaths.length === 0) return; // don't go to empty paths
                if (index < currentStepIndex || step.id === currentStep || (step.id === 'paths' && profile) || (step.id === 'plan' && selectedPath) || (step.id === 'dashboard' && selectedPath)  ) {
                  navigateToStep(step.id as ViewStep);
                }
              }}
              className={`flex md:w-full items-center ${
                index <= currentStepIndex ? 'text-primary dark:text-yellow-300' : ''
              } sm:after:content-[''] after:w-full after:h-1 after:border-b ${
                index < currentStepIndex ? 'after:border-primary dark:after:border-yellow-400' : 'after:border-gray-200 dark:after:border-gray-700'
              } after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 cursor-pointer`}
            >
              <span className={`flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500 ${index <= currentStepIndex ? 'border-primary dark:border-yellow-400' : 'border-gray-200 dark:border-gray-700'} p-2 rounded-md sm:border-0`}>
                {index < currentStepIndex ? (
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                  </svg>
                ) : (
                  <span className="me-2">{index + 1}</span>
                )}
                {step.title}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {getStepContent()}
      <Chatbot />
    </div>
  );
};

export default EmployeeView;
