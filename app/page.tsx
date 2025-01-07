'use client'
import React from 'react';
import StationMap from './components/StationMap';

const Page: React.FC = () => {
  return (
    <div className="px-2 lg:px-20 py-6 lg:py-10">
      <StationMap />
    </div>
  );
}

export default Page;
