import React from 'react';

const Navbar = ({ zoomPluginInstance, pageNavigationPluginInstance, handleRemovePdf }) => {
  const { ZoomInButton, ZoomOutButton } = zoomPluginInstance;
  const { CurrentPageLabel } = pageNavigationPluginInstance;

  return (
    <div className="w-[40%] z-10 flex flex-row justify-between items-center bg-slate-600/30 rounded-full py-1 px-8 m-4">
      <div className='flex flex-row'>
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