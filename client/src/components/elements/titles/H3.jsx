import React from 'react';

const H3 = (props) => {

  const {children, classe}=props;

  return (
    <h3 className={`
      text-sm sm:text-lg md:text-2xl 
      font-bold 
      font-primary
      leading-snug
      ${classe}
    `}>
      {children}
    </h3>
  );  
}

export default H3;
