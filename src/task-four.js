import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "./images/AP-logo.png";

export default function TaskFour() {
  // Variable declarations
  let gridValues = [];

  //useRefs
  const dragItem = useRef();
  const dragOverItem = useRef();

  // UseStates
  const [userValue, setUserValue] = useState(""); //for input value
  const [removeIndex, setRemoveIndex] = useState(); //for index to be removed
  const [gridArr, setGridArr] = useState(); //for the grid mapped to grid container
  const [resetButtonVisible, setResetButtonVisible] = useState(false);
  const [inputTooltipVisible, setInputTooltipVisible] = useState(false);
  const [removeTooltipVisible, setRemoveTooltipVisible] = useState(false);
  const [removeElementInputVisible, setRemoveElementInputVisible] =
    useState(false);

  return (
    <div className="font-Lato w-full h-full xxl:min-h-[1555px] pb-10 sm:pb-14 md:pb-20 xxl:pb-[169px]">
      <div className="w-full h-full md:max-w-[700px] lg:max-w-[800px] xl:max-w-[980px] xxl:max-w-[1535px] mx-auto p-4">
        <img
          src={logo}
          alt="logo"
          className="mt-5 md:mt-0 mb-5 md:mb-0 md:max-w-[500px] xxl:mt-20 xxl:mb-[70px] xxl:max-w-[833px] xxl:max-h-[240px] mx-auto"
        />
        <div className="">
          {/* Go back link */}
          <Link to={"/"} className="flex mb-4 sm:mb-14 h-full items-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full"
            >
              <g clip-path="url(#clip0_640_6378)">
                <path
                  d="M3.33331 8H12.6666"
                  stroke="#2C3E50"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3.33331 8L5.99998 10.6667"
                  stroke="#2C3E50"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3.33331 8.00004L5.99998 5.33337"
                  stroke="#2C3E50"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_640_6378">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <p className="ml-2 underline underline-offset-4">Go back</p>
          </Link>

          {/* Task Title */}
          <p className="xxl:text-2xl leading-6 font-medium mb-5 xxl:mb-6">
            <span className="font-bold">Task:</span> Enter index to
            remove/delete box in the given grid.
          </p>
          <p className="mb-3">{`${
            (removeElementInputVisible && "Remove numbers") || "Enter number"
          }`}</p>

          {/* Task Title, Input fields and buttons */}

          <div className="xs320:flex justify-between">
            {!removeElementInputVisible && (
              <div className="mb-8 xxl:mb-14 relative w-full sm:w-auto">
                {/* Input field that takes user input */}
                <input
                  value={userValue}
                  type="number"
                  onChange={(e) => {
                    setUserValue(e.target.value);
                  }}
                  onFocus={() => {
                    setInputTooltipVisible(false);
                  }}
                  placeholder="Enter number to generate grid"
                  className="p-3 sm:p-4 border border-gray-200 rounded-[4px] w-full sm:w-[340px] sm:mr-8 mb-4 sm:mb-0"
                />

                {/* Custom Tooltip for creating grid*/}
                <div
                  className={`absolute -top-14 sm:top-10 sm:-bottom-6 left-20 sm:left-4 bg-red-100 text-red-500 border border-t-red-500 border-l-red-500 border-b-purple-500 border-r-purple-500  px-4 py-2 rounded-t-lg xs320:rounded-t-0 xs320:rounded-tr-lg xs320:rounded-b-lg rounded-br-lg  shadow-md ${
                    (inputTooltipVisible && `opacity-100`) || `opacity-0`
                  } transition-opacity duration-300 `}
                >
                  <p>Please enter a value from 1 to 30!</p>
                </div>

                {/* Submit Button to create grid*/}
                <button
                  type="submit"
                  onClick={() => {
                    if (userValue > 30) {
                      setInputTooltipVisible(true);
                    } else if (userValue > 0) {
                      setInputTooltipVisible(false);
                      for (let i = 1; i <= userValue; i++) {
                        gridValues.push(i);
                      }
                      setGridArr(gridValues);
                      setResetButtonVisible(true);
                      setRemoveElementInputVisible(true);
                    }
                  }}
                  className="bg-cyan-600 border border-transparent text-white w-full rounded
                                py-[14px] px-8 text-sm leading-[14px] 
                                sm:px-8 sm:py-4 sm:w-auto sm:rounded-[4px]"
                >
                  Submit
                </button>
              </div>
            )}

            {removeElementInputVisible && (
              <div className="mb-8 xxl:mb-14 relative w-full sm:w-auto">
                {/* Input field that takes index to remove element */}
                <input
                  type="number"
                  onChange={(e) => {
                    setRemoveIndex(e.target.value);
                  }}
                  onFocus={() => {
                    setRemoveTooltipVisible(false);
                  }}
                  placeholder="Enter index to remove the box"
                  className="p-3 sm:p-4 border border-gray-200 rounded-[4px] w-full sm:w-[340px] sm:mr-8 mb-4 sm:mb-0"
                  // disabled={inputFieldDisabled}
                />

                {/* Custom Tooltip */}
                <div
                  className={`absolute -top-14 sm:top-10 sm:-bottom-6 left-20 sm:left-4 bg-red-100 text-red-500 border border-t-red-500 border-l-red-500 border-b-purple-500 border-r-purple-500  px-4 py-2 rounded-t-lg xs320:rounded-t-0 xs320:rounded-tr-lg xs320:rounded-b-lg rounded-br-lg  shadow-md ${
                    (removeTooltipVisible && `opacity-100`) || `opacity-0`
                  } transition-opacity duration-300 `}
                >
                  {gridArr.length > 0 && <p>{`Please enter an index value up to ${
                    gridArr.length - 1
                  }`}</p> || <p>There is no element in the array!</p>}
                </div>

                {/* Submit Button to remove item*/}
                <button
                  type="submit"
                  onClick={() => {
                    if (removeIndex > gridArr.length - 1) {
                      setRemoveTooltipVisible(true);
                    } else if (removeIndex >= 0) {
                      setRemoveTooltipVisible(false);
                      const newArr = [...gridArr];
                      newArr.splice(removeIndex - 1, 1);
                      setGridArr(newArr);
                      setResetButtonVisible(true);
                    }
                  }}
                  className="bg-cyan-600 border border-transparent text-white w-full rounded
                                py-[14px] px-8 text-sm leading-[14px] 
                                sm:px-8 sm:py-4 sm:w-auto sm:rounded-[4px]"
                >
                  Submit
                </button>

                {/* Reset Button for mobile screen */}
                {resetButtonVisible && (
                  <button
                    onClick={() => {
                      setGridArr();
                      setUserValue("");
                      setResetButtonVisible(false);
                      setRemoveElementInputVisible(false);
                    }}
                    // className='sm:hidden text-blue-600 border border-blue-600 px-12 py-1 rounded-2xl mr-2 absolute right-0 self-end w-full max-w-[130px] xs375:max-w-[150px] xs375:py-1.5  xs425:max-w-[180px] xs425:py-2'>
                    className="sm:hidden border text-blue-600 border-blue-600 py-[14px] px-8 text-sm leading-[14px] rounded w-full mt-2"
                  >
                    Reset
                  </button>
                )}
              </div>
            )}

            {/* Reset Button for large screens */}
            <div>
              {resetButtonVisible && (
                <button
                  onClick={() => {
                    setGridArr();
                    setUserValue("");
                    setResetButtonVisible(false);
                    setRemoveElementInputVisible(false);
                  }}
                  className="hidden sm:block border text-blue-600 border-blue-600 rounded-[4px] px-8 py-4"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Grid container with fixed width and adjustable height */}
          <div
            className={` ${
              (resetButtonVisible && "bg-green-50 custom-border-after") ||
              "bg-slate-50 custom-border-before"
            } min-h-[250px] md:min-h-[350px] xxl:min-h-[744px] xl:w-[1080] xxl:max-w-[1535px] rounded-3xl p-6 xxl:p-12 mx-auto`}
          >
            <div
              className={`flex flex-wrap gap-x-2 xxl:gap-x-8 gap-y-2 xxl:gap-y-4 mx-auto w-full`}
            >
              {gridArr?.map((item, idx) => {
                return (
                  <div
                    id="mob-drag"
                    key={idx * 1000 * Math.random()}
                    className="flex items-center justify-center min-w-[50px] min-h-[50px] xs320:w-[70px] xs320:h-[70px] xs375:w-[89px] xs375:h-[87px] xs425:w-[79px] xs425:h-[75px] sm:w-[125px] sm:h-[125px] md:w-[148px] md:h-[150px] lg:w-[171px] lg:h-[150px] xxl:w-[207px] xxl:h-[150px] text-white text-lg sm:text-[32px] leading-8 text-center rounded-2xl  bg-emerald-600 custom-box-shadow"
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
