import React from "react";
import taskOneImage from "./images/task-1.png";
import taskTwoImage from "./images/task-2.png";
import taskThreeImage from "./images/task-3.png";
import { Link } from "react-router-dom";

export default function Main() {
  const tasks = [
    {
      id: 0,
      img: taskOneImage,
      title: "Num detector via color in grid",
      description:
        "Upon entering number the grid will sort it self by prime, even and odd numbers.",
      link: "/task1",
    },
    {
      id: 1,
      img: taskTwoImage,
      title: "Puzzle Grid",
      description: "Upon entering number the grid will sort it self by prime, even and odd numbers.",
      link: "/task2",
    },
    {
      id: 2,
      img: taskThreeImage,
      title: "Number Group",
      description: "Upon entering number the grid will sort it self by prime, even and odd numbers.",
      link: "/task3",
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-[1920px] mx-auto my-auto pt-10 px-4 sm:p-16 align-middle items-center">
      {/* Main Page Title and Description */}
      <h1 className="text-4xl md:text-5xl text-center font-extrabold md:font-bold mb-6 text-gray-800">
        Alphasquad Tasks for Dev’s
      </h1>
      <p className="text-center text-sm sm:text-base leading-4 font-normal text-gray-600 mb-8 sm:md-0">
        Here are list of task that dev’s will perform for the practice of their
        frontend.
      </p>

      <div className="w-full h-full flex flex-col sm:flex-row gap-8 max-w-[1920px] mx-auto my-auto sm:p-10 align-middle items-center justify-center">
        {/* Project Cards */}
        {tasks?.map((item, idx) => {
          return (
            <div
              key={idx * 1000 * Math.random()}
              class="max-w-[296px] max-h-[417px] overflow-hidden border border-gray-200 rounded-lg"
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
                    className="w-full block py-[10px] my-[10px] text-center text-sm font-semibold text-blue-600 leading-[21px] border border-blue-600 rounded-[4px] hover:text-white hover:bg-blue-600"
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
