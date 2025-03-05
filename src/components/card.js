import React from 'react';

function Card({ index, date, fileName }) {
 
  return (
    <div className=" p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 relative">
        <div className='w-10 absolute top-3 right-4 rounded-full p-2 bg-gray-500 text-white'>{index}</div>
        <div>
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Date:</h5>
            
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                {date}
            </p>
        </div>

        <div>
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                File name:
            </h5>
            
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400"> {fileName}
            </p>
        </div>
    </div>
  );
}

export default Card;
