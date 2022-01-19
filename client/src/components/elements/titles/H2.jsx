import React from 'react';

const H2 = (props) => {

  const {children, classe}=props;

  return (
    <h2 className={`
      ${classe}
      text-2xl md:text-3xl lg:text-4xl 
      font-extrabold 
      font-primary
      leading-snug
    `}>
      {children}
    </h2>
  );  
}

export default H2;
