import { createContext, useContext, useState, useEffect } from 'react';

const SelectedSkillsContext = createContext(null);

const STORAGE_KEY = 'careergraph.selectedSkills';

export function SelectedSkillsProvider({ children }) {
  const [selectedSkills, setSelectedSkills] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedSkills));
    } catch {
      /* ignore storage errors */
    }
  }, [selectedSkills]);

  const addSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.some((s) => s.id === skill.id) ? prev : [...prev, skill]
    );
  };

  const removeSkill = (id) => {
    setSelectedSkills((prev) => prev.filter((s) => s.id !== id));
  };

  const clearSkills = () => setSelectedSkills([]);

  const setSkills = (skills) => setSelectedSkills(skills);

  return (
    <SelectedSkillsContext.Provider
      value={{ selectedSkills, addSkill, removeSkill, clearSkills, setSkills }}
    >
      {children}
    </SelectedSkillsContext.Provider>
  );
}

export function useSelectedSkills() {
  const ctx = useContext(SelectedSkillsContext);
  if (!ctx) {
    throw new Error('useSelectedSkills must be used within SelectedSkillsProvider');
  }
  return ctx;
}
