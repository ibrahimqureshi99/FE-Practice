import React from "react";
import taskOneImage from "./images/task-1.png";
import taskTwoImage from "./images/task-2.png";
import taskThreeImage from "./images/task-3.png";
import taskFourImage from "./images/task-4.png";
import { Link } from "react-router-dom";

export default function Main() {
  const tasks = [
    {
      id: 0,
      img: taskOneImage,
      title: "Number Detector",
      description:
        "Identification by colors of even, odd, and prime numbers in a sorted array.",
      link: "/task1",
    },
    {
      id: 1,
      img: taskTwoImage,
      title: "Puzzle Grid",
      description:
        "Grid with draggable tiles, shows alert on sorting grid in correct order.",
      link: "/task2",
    },
    {
      id: 2,
      img: taskThreeImage,
      title: "Number Group",
      description:
        "Filter grid to show either all numbers or only even, odd, or prime numbers.",
      link: "/task3",
    },
    {
      id: 4,
      img: taskFourImage,
      title: "Remove element at index",
      description:
        "Sorted grid where elements can be removed from specified indices.",
      link: "/task4",
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-[1920px] mx-auto my-auto pt-10 px-4 sm:p-20 align-middle items-center">
      {/* Main Page Title and Description */}
      <h1 className="text-4xl md:text-5xl text-center font-extrabold md:font-bold mb-6 text-gray-800">
        Alphasquad Tasks for Dev’s
      </h1>
      <p className="text-center text-sm sm:text-base leading-4 font-normal text-gray-600 mb-8 sm:md-0">
        Here are list of task that dev’s will perform for the practice of their
        frontend.
      </p>

      <div className="w-full h-full flex flex-col sm:flex-row  gap-8 max-w-[1920px] mx-auto my-auto align-middle items-center">
        {/* Project Cards */}
        {tasks?.map((item, idx) => {
          return (
            <div
              key={idx * 1000 * Math.random()}
              class="max-w-[296px] min-h-[417px] overflow-hidden border border-gray-200 rounded-lg flex-1"
            >
              <div class="pb-4">
                {/* Card Image */}
                <img
                  className="w-full object-cover mb-4 h-full max-h-[238px]"
                  src={item.img}
                  alt="Sunset in the mountains"
                />
                <div className="px-4">
                  {/* Card Title */}
                  <h2 className="text-base leading-4 font-bold text-gray-800 mb-3">
                    {item.title}
                  </h2>
                  {/* Card Description */}
                  <p className="text-sm font-normal text-gray-600 leading-[21px] mb-4">
                    {item.description}
                  </p>
                  {/* Card Button */}
                  <Link
                    to={item.link}
                    className="flex py-[10px] my-[10px] self-end justify-center text-center text-sm font-semibold text-blue-600 leading-[21px] border border-blue-600 rounded-[4px] hover:text-white hover:bg-blue-600"
                  >
                    View Task
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
