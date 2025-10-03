import React from 'react';
import { Year, EraTheme } from '../types';
import { AVAILABLE_YEARS } from '../constants';

interface YearSelectorProps {
  selectedYear: Year;
  onYearChange: (year: Year) => void;
  theme: EraTheme;
  disabled?: boolean;
}

const YearSelector: React.FC<YearSelectorProps> = ({ selectedYear, onYearChange, theme, disabled }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onYearChange(Number(event.target.value) as Year);
  };

  const selectClasses = `p-2 border-2 rounded-md focus:outline-none focus:ring-2 
    ${theme.accentColor} 
    ${theme.textColor} 
    ${theme.mainContainerClasses.split(' ').find(c => c.startsWith('bg-')) || 'bg-white'} 
    ${theme.font}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${theme.buttonClasses ? theme.buttonClasses.replace(/px-\d+|py-\d+/, '') : ''} // Use button base but remove padding
    ${theme.buttonHoverClasses ? theme.buttonHoverClasses.replace('hover:','focus:') : ''} // Use hover for focus
  `;

  // Determine option background and text color based on main container to ensure readability
  const optionBgClass = theme.mainContainerClasses.includes('bg-black') || theme.mainContainerClasses.includes('bg-gray-800') || theme.mainContainerClasses.includes('bg-gray-900') || theme.mainContainerClasses.includes('bg-purple-800') ? 'bg-gray-700' : 'bg-white';
  const optionTextClass = theme.mainContainerClasses.includes('bg-black') || theme.mainContainerClasses.includes('bg-gray-800') || theme.mainContainerClasses.includes('bg-gray-900') || theme.mainContainerClasses.includes('bg-purple-800')  ? 'text-gray-200' : 'text-black';


  return (
    <div className="flex items-center space-x-2 sm:space-x-3">
      <label htmlFor="year-select" className={`text-sm sm:text-lg font-semibold ${theme.textColor} ${theme.pixelFontFamily && selectedYear === 1985 ? theme.pixelFontFamily : ''}`}>
        Travel to:
      </label>
      <select
        id="year-select"
        value={selectedYear}
        onChange={handleChange}
        disabled={disabled}
        className={selectClasses}
        aria-label="Select year to travel to"
      >
        {AVAILABLE_YEARS.map((year) => (
          <option key={year} value={year} className={`${optionBgClass} ${optionTextClass} ${theme.font}`}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default YearSelector;