import React from 'react';

function BigContainer({ classe, children }) {
    return (
        <div className={`bg-gray-200 h-full min-h-screen ${ classe }`}>
            { children }
        </div>
    );
}

export default BigContainer;