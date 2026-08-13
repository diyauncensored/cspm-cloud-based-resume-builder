import React from 'react';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Code, 
  FolderGit2, 
  Award, 
  Palette 
} from 'lucide-react';

export const TABS = [
  { id: 'personal', label: 'Personal', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'custom', label: 'Custom', icon: Award },
  { id: 'styling', label: 'Design', icon: Palette }
];

export default function EditorTabs({ activeTab, setActiveTab }) {
  return (
    <div className="editor-tabs-container" role="tablist" aria-label="Resume sections">
      {TABS.map(tab => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={isActive}
            aria-controls={`panel-${tab.id}`}
            className={`editor-tab ${isActive ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            tabIndex={isActive ? 0 : -1}
          >
            <Icon size={15} aria-hidden="true" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

