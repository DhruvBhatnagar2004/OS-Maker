import React from "react";
import { useNavigate } from "react-router-dom";
import pengu from "../images/pengu.png";

function Intro() {
  const navigate = useNavigate();

  return (
    <div className="mt-10 flex mx-auto px-8 space-x-8 gap-20 justify-between">
      <div className="w-1/2 flex flex-col items-start">
        <h2 className="text-4xl pb-6">Welcome to the OS Maker</h2>
        <p className="text-lg mb-4 text-justify">
          Welcome to OS Maker! It's a platform designed for both enthusiasts and
          developers, offering the opportunity to create a customized operating
          system tailored to individual needs.
        </p>
        <p className="text-lg mb-4 text-justify">
          Whether you're a novice curious about OS architecture or an
          experienced developer looking to explore new frontiers, OS Maker
          provides the tools, resources, and community support to aid your
          journey.
        </p>
        <p className="text-lg mb-4 text-justify">
          With features like modular components for customizable OS builds,
          collaborative opportunities within a vibrant community, and
          comprehensive educational resources, OS Maker empowers you to craft a
          unique OS experience from the ground up.
        </p>
        <p className="text-lg mb-4 text-justify">
          Join us and embark on your journey to create your own operating system
          today!
        </p>
        <button
          onClick={() => navigate("/custom-page")}
          className="mt-6 px-8 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-400"
        >
          Get Started
        </button>
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <img
          src={pengu}
          alt="Illustration of Tux the Penguin, the mascot of Linux"
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
}

export default Intro;
