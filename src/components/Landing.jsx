import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import heroImage from "../assets/hero.svg";
import feat1Video from '../assets/feat1.webm';
import mainlogo from '../assets/logomain.svg';
const Landing = () => {
  return (
    <div className="flex flex-col w-full h-full overflow-y-auto">
      {/* Navigation Bar */}
      <div className="bg-blue-400">
        <nav className="bg-white border-[1px] border-[#0062CC] px-4 py-2 rounded-full mx-4 mt-4 text-black flex justify-between">
          <div className="flex flex-row items-center ml-4">
          <img src={mainlogo} alt="logo" className="w-8 h-8 mr-2" />
            <p className="font-bold text-2xl">Scire</p>
            <p className=" font-bold text-2xl">AI</p>
            
          </div>
          <ul className="flex space-x-4 justify-self-end ">
            <li className="bg-white border-2 border-[#0062CC] text-black font-semibold backdrop-blur-lg rounded-full px-4 py-2 hover:bg-[#0062CC] hover:text-white">
              <Link to="/Main">Chat</Link>
            </li>
            <li className="bg-[#0062CC] text-white font-semibold backdrop-blur-lg rounded-full px-4 py-2 hover:bg-white hover:text-[#0062CC] hover:border-[#0062CC] hover:border-2"> 
              <Link to="https://github.com/unknown7703/scireai">Github</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Hero/Welcome Section */}
      <div
        className="flex flex-row items-center justify-center py-10 px-20 text-white min-h-[600px]"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)),url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-blue-200/20 p-10 drop-shadow-md rounded-2xl backdrop-blur-md w-[70%]">
          <h1 className=" max-w-[80%] justify-self-center text-center text-7xl font-bold">Reimagine the way you research with <p className="italic font-extrabold">ScireAI</p></h1>
          
          <p className="text-white stroke-slate-900 text-lg max-w-[70%] mt-8 tracking-wide text-center justify-self-center">
          Research faster without leaving the window with AI-powered features like Look Up and Chat          </p>
          <div className="flex justify-center mt-14">
            <Link
              to="/main"
              className="bg-blue-600 font-bold text-lg text-white px-8 py-4 rounded-full hover:bg-white hover:text-blue-700 hover:drop-shadow-lg"
            >
              Get Started!
            </Link>
          </div>
        </div>
      </div>

      {/* Features Carousel */}
      <section className="flex flex-col items-center justify-center mt-48 mb-44 my-8">
        <h2 className="text-4xl text-black tracking-wide font-bold mb-16">Our Features </h2>
        <Carousel
          showThumbs={false}
          infiniteLoop
          useKeyboardArrows
          autoPlay
          showStatus={false}
          interval={5000} // 5 seconds delay
          className="w-[90%] md:w-2/3 "
        >
          <div className="p-4 bg-[#FCBF22] rounded-lg text-white">
            <h3 className="text-xl font-semibold my-2 mb-8">Feature 1</h3>
            <video className="w-full rounded-lg" autoPlay muted loop playbackRate="2">
              <source src={feat1Video} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="p-4 bg-[#FA575A] rounded-lg">
            <h3 className="text-xl font-bold">Feature 2</h3>
            <p>Description of Feature 2</p>
          </div>
          <div className="p-4 bg-[#0077FC] rounded-lg">
            <h3 className="text-xl font-bold">Feature 3</h3>
            <p>Description of Feature 3</p>
          </div>
        </Carousel>
      </section>
    </div>
  );
};

export default Landing;
