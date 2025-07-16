// src/components/AdBanner.jsx
import React from 'react';

const AdBanner = ({ adCode }) => {
  return (
    <div
      className="ad-banner-container"
      dangerouslySetInnerHTML={{ __html: adCode }}
    />
  );
};

export default AdBanner;