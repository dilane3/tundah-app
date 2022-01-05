import React from 'react';

function ContainerGray({ classe, children }) {
    return (
        <div className={`bg-gray-300 ${ classe }`}>
            { children }
        </div>
    );
}

export default ContainerGray;