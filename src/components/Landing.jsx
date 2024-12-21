import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import heroImage from "../assets/hero.svg";

const Landing = () => {
  return (
    <div className="flex flex-col w-screen h-screen">
      {/* Navigation Bar */}
      <div className="bg-blue-400">
        <nav className="bg-blue-800 p-4 rounded-full mx-4 mt-2 text-white flex justify-between">
          <div className="flex flex-row items-center ml-4">
            <p className="font-bold text-2xl">Scire</p>
            <p className=" font-bold text-2xl">AI</p>
          </div>
          <ul className="flex space-x-4 justify-self-end ">
            <li className="bg-white text-blue-900 font-semibold backdrop-blur-lg rounded-full px-4 py-2">
              <Link to="/Main">Chat</Link>
            </li>
            <li className="bg-white text-blue-900 font-semibold backdrop-blur-lg rounded-full px-4 py-2">
              <Link to="https://github.com/unknown7703/scireai">Github</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Hero/Welcome Section */}
      <div
        className="flex flex-row items-center justify-center px-20 h-3/5 text-white"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-white/20 p-10 rounded-2xl backdrop-blur-md">
          <h1 className="text-6xl font-bold">Welcome to ScireAI</h1>
          <p className="mt-2 justify-self-center">
            Enhance your research experience with your personalized research
            assistant
          </p>
          <div className="flex justify-center mt-14">
            <Link
              to="/main"
              className="bg-blue-600 text-white px-4 py-2 rounded-full  hover:bg-blue-700 transition-colors"
            >
              Get Started!
            </Link>
          </div>
        </div>
      </div>

      {/* Features Carousel */}
      <section className="flex flex-col items-center justify-center my-8">
        <h2 className="text-3xl text-gray-700 font-semibold mb-4">What We Offer</h2>
        <Carousel
          showThumbs={false}
          infiniteLoop
          useKeyboardArrows
          autoPlay
          showStatus={false}
        >
          <div className="p-4 bg-gray-200 rounded-lg">
            <h3 className="text-xl font-bold">Feature 1</h3>
            <p>Description of Feature 1</p>
          </div>
          <div className="p-4 bg-gray-200 rounded-lg">
            <h3 className="text-xl font-bold">Feature 2</h3>
            <p>Description of Feature 2</p>
          </div>
          <div className="p-4 bg-gray-200 rounded-lg">
            <h3 className="text-xl font-bold">Feature 3</h3>
            <p>Description of Feature 3</p>
          </div>
        </Carousel>
      </section>

      
    </div>
  );
};

export default Landing;
