import React, { useCallback } from "react";
import styled from "styled-components";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../ThemeContext";

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--bg-secondary);
  border-radius: 20px;
  padding: 0.25rem;
  gap: 0.5rem;
`;

const ToggleButton = styled.button`
  background-color: ${({ active }) => (active ? "#4a90e2" : "transparent")};
  color: ${({ active }) => (active ? "white" : "#9d9d9d")};
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: ${({ active }) => (active ? "0px 4px 6px rgba(0, 0, 0, 0.2)" : "none")};

  &:hover {
    transform: scale(1.1);
  }
`;

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const handleToggle = useCallback(() => toggleTheme(), [toggleTheme]);

  return (
    <ToggleContainer>
      <ToggleButton active={!isDarkMode} onClick={handleToggle}>
        <Sun size={20} />
      </ToggleButton>
      <ToggleButton active={isDarkMode} onClick={handleToggle}>
        <Moon size={20} />
      </ToggleButton>
    </ToggleContainer>
  );
};

export default ThemeToggle;
