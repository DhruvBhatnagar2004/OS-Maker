import React from "react";
import { useNavigate } from "react-router-dom";

function Intro() {
  const navigate = useNavigate();

  return (
    <div className="mt-10 flex">
      <div className="flex-1 flex flex-col justify-center items-start p-12">
        <h2 className="text-4xl pb-6">Welcome to the OS Maker</h2>
        <p className="text-lg mb-4 text-justify">
          Welcome to OS Maker! OS Maker is a platform designed for both
          enthusiasts and developers, offering the opportunity to create a
          customized operating system tailored to individual needs. Whether
          you're a novice curious about OS architecture or an experienced
          developer looking to explore new frontiers, OS Maker provides the
          tools, resources, and community support to aid your journey. With
          features like modular components for customizable OS builds,
          collaborative opportunities within a vibrant community, and
          comprehensive educational resources, OS Maker empowers you to craft a
          unique OS experience from the ground up. Join us and embark on your
          journey to create your own operating system today!
        </p>
        <button
          onClick={() => {
            navigate("/custom-page");
          }}
          className="m-auto flex px-8 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-400"
        >
          Get Started
        </button>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <img
          src="https://i.ibb.co/DQd195v/png-transparent-penguin-tux-linux-linux-kernel-linux-user-group-opensource-software-tux-the-penguin.png"
          alt="Tux the Penguin"
          className="max-w-full h-auto" // Ensures the image scales properly
        />
      </div>
    </div>
  );
}

export default Intro;
