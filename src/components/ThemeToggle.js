import React from 'react';
import styled from 'styled-components';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../ThemeContext';

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  background-color:var(--bg-secondary);
  border-radius: 20px;
  padding: 0.25rem;
`;

const ToggleButton = styled.button`
  background-color: ${props => props.active ? '#4a90e2' : 'transparent'};
  color: ${props => props.active ? 'white' : '#9d9d9d'};
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <ToggleContainer>
      <ToggleButton 
        active={!isDarkMode} 
        onClick={() => toggleTheme()}
      >
        <Sun size={20} />
      </ToggleButton>
      <ToggleButton 
        active={isDarkMode} 
        onClick={() => toggleTheme()}
      >
        <Moon size={20} />
      </ToggleButton>
    </ToggleContainer>
  );
};

export default ThemeToggle;