import React, { useState } from 'react';
import { Toggle } from '../ui/toggle';

const colors = {
  primary: '#007bff',
  background: '#fff',
  backgroundDark: '#e9ecef',
  text: '#343a40',
};

const MyComponent = () => {
  const [pressed, setPressed] = useState(false);

  return (
    <div>
      <Toggle
        onChange={() => setPressed(!pressed)}
        className={`
          data-[state=on]:bg-[${colors.primary}] 
          data-[state=on]:text-[${colors.background}] 
          text-[${colors.text}] 
          hover:bg-[${colors.backgroundDark}] 
          hover:text-[${colors.primary}] 
          transition
          bg-transparent
          ${pressed ? `bg-[${colors.primary}] text-[${colors.background}]` : ''}
        `}
      />
    </div>
  );
};

export default MyComponent;

