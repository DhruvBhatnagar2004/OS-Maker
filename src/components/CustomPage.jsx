import React, { useState } from "react";

// Define your components for Predefined and Customization
function Predefined() {
  return (
    <div>
      <h1>You selected Predefined!</h1>
      <p>Here are some predefined options</p>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Minimal</span>
          <input
            type="radio"
            name="radio-10"
            className="radio checked:bg-red-500"
            defaultChecked
          />
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Standard</span>
          <input
            type="radio"
            name="radio-10"
            className="radio checked:bg-blue-500"
          />
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">RAM-Efficient</span>
          <input
            type="radio"
            name="radio-10"
            className="radio checked:bg-violet-500"
          />
        </label>
      </div>
    </div>
  );
}

function Customization() {
  return <div>Please enter your customization details.</div>;
}

function CustomPage() {
  const [selectedOption, setSelectedOption] = useState(""); // State to track the selected option
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to control dropdown visibility

  const handleSelection = (option) => {
    setSelectedOption(option); // Set the selected option
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <div>
        <h1 className="flex justify-center text-3xl p-4">Select Operating System </h1>
        <div className="flex justify-around w-[100vw]">
          <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img
                src="https://www.unixtutorial.org/images/software/ubuntu-linux.png"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Ubuntu</h2>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Select</button>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img
                src="https://colfaxresearch.com/wp-content/uploads/2015/06/archlinux-logo-800x350.jpg"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Arch-Linux</h2>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Select</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dropdown Button */}
      <div className="dropdown">
        <div
          tabIndex={0}
          role="button"
          className="btn m-1"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown visibility
        >
          Options
        </div>

        {/* Conditionally render the dropdown menu */}
        {isDropdownOpen && (
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li>
              <a onClick={() => handleSelection("predefined")}>Predefined</a>
            </li>
            <li>
              <a onClick={() => handleSelection("customization")}>
                Customization
              </a>
            </li>
          </ul>
        )}
      </div>

      {/* Conditionally render components based on the selection */}
      <div className="mt-6">
        {selectedOption === "predefined" && <Predefined />}
        {selectedOption === "customization" && <Customization />}
      </div>

      {/* Submit Button */}
      <button className="btn m-4">Submit</button>
    </div>
  );
}

export default CustomPage;
