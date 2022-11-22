import React from "react";
import logo from "./images/AP-logo.png";
import { Link } from "react-router-dom";

export default function Main() {
  return (
    <div className="w-full h-full flex flex-col justify-around max-w-[1920px] mx-auto my-auto p-10 align-middle items-center">
      <h1 className="text-4xl font-bold">My Frontend Practice</h1>
      <div className="w-full h-full flex justify-around max-w-[1920px] mx-auto my-auto p-10 align-middle items-center">
        <div class="max-w-sm rounded overflow-hidden border hover:shadow-lg hover:border hover:border-t-red-600 hover:border-l-red-600 hover:border-r-purple-600 hover:border-b-purple-600 transition duration-600 shadow shadow-red-600">
          <div class="px-6 py-4">
            <Link to="/task1" class="font-bold text-xl mb-2">
              <img
                className="w-full object-cover border-b mb-4"
                src={logo}
                alt="Sunset in the mountains"
              />
              Task 1: Number Detector
            </Link>
          </div>
        </div>
        <div class="max-w-sm rounded overflow-hidden border hover:shadow-lg hover:border hover:border-t-red-600 hover:border-l-red-600 hover:border-r-purple-600 hover:border-b-purple-600 transition duration-600 shadow shadow-purple-600">
          <div class="px-6 py-4">
            <Link to="/task2" class="font-bold text-xl mb-2">
              <img
                className="w-full object-cover border-b mb-4"
                src={logo}
                alt="Sunset in the mountains"
              />
              Task 2: Puzzle Grid
            </Link>
          </div>
        </div>
        <div class="max-w-sm rounded overflow-hidden border hover:shadow-lg hover:border hover:border-t-red-600 hover:border-l-red-600 hover:border-r-purple-600 hover:border-b-purple-600 transition duration-600 shadow shadow-red-600">
          <div class="px-6 py-4">
            <Link to="/task3" class="font-bold text-xl mb-2">
              <img
                className="w-full object-cover border-b mb-4"
                src={logo}
                alt="Sunset in the mountains"
              />
              Task 3: Number Group
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
