import React from 'react';

const Navbar = ({ zoomPluginInstance, pageNavigationPluginInstance, handleRemovePdf }) => {
  const { ZoomInButton, ZoomOutButton } = zoomPluginInstance;
  const { CurrentPageLabel } = pageNavigationPluginInstance;

  return (
     <div className='w-full justify-center flex my-4'>
      <div class="font-montserrat w-[40%] z-10 flex h-full border-4 border-blue-500 justify-between bg-white rounded-full px-4 items-center back font-medium">
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