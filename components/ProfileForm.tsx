
import React, { useState } from 'react';
import { EmployeeProfile } from '../types';
import Input from './common/Input';
import TextArea from './common/TextArea';
import Button from './common/Button';

interface ProfileFormProps {
  onSubmit: (profile: EmployeeProfile) => void;
  isLoading: boolean;
  initialProfile?: Partial<EmployeeProfile>;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit, isLoading, initialProfile }) => {
  const [profile, setProfile] = useState<EmployeeProfile>({
    name: initialProfile?.name || '',
    currentRole: initialProfile?.currentRole || '',
    department: initialProfile?.department || '',
    skillsInput: initialProfile?.skillsInput || '',
    certificationsInput: initialProfile?.certificationsInput || '',
    interestsInput: initialProfile?.interestsInput || '',
    currentCareerLevel: initialProfile?.currentCareerLevel || '',
    aspirationsInput: initialProfile?.aspirationsInput || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(profile);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-secondary dark:text-primary mb-6 text-center">Your Career Profile</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="Full Name" name="name" value={profile.name} onChange={handleChange} placeholder="e.g., Alex Doe" required />
        <Input label="Current Role" name="currentRole" value={profile.currentRole} onChange={handleChange} placeholder="e.g., Software Engineer" required />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="Department" name="department" value={profile.department} onChange={handleChange} placeholder="e.g., Engineering" required />
        <Input label="Current Career Level" name="currentCareerLevel" value={profile.currentCareerLevel} onChange={handleChange} placeholder="e.g., L3, Senior, Mid-Level" />
      </div>

      <TextArea 
        label="Skills & Technologies" 
        name="skillsInput" 
        value={profile.skillsInput} 
        onChange={handleChange} 
        placeholder="List your skills, programming languages, tools, etc. (e.g., Python, React, Project Management, Agile)" 
      />
      <TextArea 
        label="Certifications & Qualifications" 
        name="certificationsInput" 
        value={profile.certificationsInput} 
        onChange={handleChange} 
        placeholder="List any relevant certifications (e.g., PMP, AWS Certified Developer)" 
      />
      <TextArea 
        label="Interests & Passions" 
        name="interestsInput" 
        value={profile.interestsInput} 
        onChange={handleChange} 
        placeholder="What are you passionate about? What kind of work excites you? (e.g., AI ethics, leading teams, data visualization)" 
      />
      <TextArea 
        label="Career Aspirations" 
        name="aspirationsInput" 
        value={profile.aspirationsInput} 
        onChange={handleChange} 
        placeholder="What are your long-term career goals? Any specific roles you aspire to?" 
        required 
      />
      
      <div className="pt-4">
        <Button type="submit" isLoading={isLoading} className="w-full" size="lg">
          {isLoading ? 'Analyzing Profile...' : 'Get Career Recommendations'}
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
