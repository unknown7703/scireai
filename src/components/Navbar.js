import React from 'react';

const Navbar = ({ zoomPluginInstance, pageNavigationPluginInstance, handleRemovePdf }) => {
  const { ZoomInButton, ZoomOutButton } = zoomPluginInstance;
  const { CurrentPageLabel } = pageNavigationPluginInstance;

  return (
    <div className="font-montserrat w-[40%] z-10 flex flex-row justify-self-center  bg-gradient-to-r from-blue-500 via-cyan-500 to-violet-500 rounded-full py-1 px-1 m-4">
     
     <div class="flex h-full w-full justify-between bg-white rounded-full px-4 items-center back font-medium">
     <div className='flex flex-row'>
     <ZoomInButton />
        <ZoomOutButton />
        
      </div>
      <div className='mr-8'>
        Page <CurrentPageLabel />
      </div>
      <button onClick={handleRemovePdf}>✖</button>
    </div>
    </div> 
  );
};

export default Navbar;