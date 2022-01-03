import React from 'react';

const H1 = (props) => {

  const {children, classe}=props;

  return (
    <h1 className={`
      text-2xl md:text-4xl lg:text-5xl 
      font-extrabold 
      font-primary
      leading-snug
      capitalize 
      ${classe}
    `}>
      {children}
    </h1>
  );  
}

export default H1;
