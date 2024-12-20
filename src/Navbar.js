import React from 'react';

const Navbar = ({ zoomPluginInstance, pageNavigationPluginInstance, handleRemovePdf }) => {
  const { ZoomInButton, ZoomOutButton } = zoomPluginInstance;
  const { CurrentPageLabel } = pageNavigationPluginInstance;

  return (
    <div className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #ccc' }}>
      <div>
        <ZoomOutButton />
        <ZoomInButton />
      </div>
      <div>
        Page <CurrentPageLabel />
      </div>
      <button onClick={handleRemovePdf}>✖</button>
    </div>
  );
};

export default Navbar;