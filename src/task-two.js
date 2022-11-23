import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "./images/AP-logo.png";

export default function TaskTwo() {
  // Variable declarations
  let gridValues = [];
  let xPosClient = 0;
  let yPosClient = 0;
  let xPosScreen = 0;
  let yPosScreen = 0;
  let xPosPage = 0;
  let yPosPage = 0;
  // let xPosOffset = 0
  // let yPosOffset = 0

  //useRefs
  const dragItem = useRef();
  const dragOverItem = useRef();
  // const touchOverItem = useRef();

  // UseStates
  const [userValue, setUserValue] = useState("");
  const [gridArr, setGridArr] = useState();
  const [resetButtonVisible, setResetButtonVisible] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [inputFieldDisabled, setInputFieldDisabled] = useState(false);
  const [dragCursor, setDragCursor] = useState("cursor-grab")

  // Get value from input field
  const getInputValue = (event) => {
    // let dup = Math.max(min, Math.min(max, Number(event.target.value)))
    let dup = event.target.value;
    // let dup = event.target.value
    setUserValue(dup);

    // Sets number of columns and rows for grid
    document.documentElement.style.setProperty("--col-num", dup);
    document.documentElement.style.setProperty("--row-num", dup);
  };

  function createGridValues(cols) {
    for (let i = 0; i < cols; i++) {
      let num = Math.floor(Math.random() * cols) + 1;
      if (gridValues.includes(num)) {
        i = i - 1;
      } else {
        gridValues.push(num);
      }
    }
    setGridArr(gridValues);
  }

  // Draggable Items on desktop
  const dragStart = (e, idx) => {
    dragItem.current = idx;
    console.log("first ", dragItem.current);
  };

  const dragEnter = (e, idx) => {
    dragOverItem.current = idx;
    console.log("second ", dragOverItem.current);
  };
  
  const drop = (e) => {
    const copyListItems = [...gridArr];
    const dragItemContent = copyListItems[dragItem.current];
    
    e.preventDefault();
    // Switch elements of selected tiles
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setGridArr(copyListItems);
    setDragCursor("cursor-grab")

    // Comparison with sorted array and reset grid
    let sorted = sortGridArr(gridArr);
    if (JSON.stringify(copyListItems) === JSON.stringify(sorted)) {
      setTimeout(
        alert("Task completed successfully!")
      , 2000);
      setGridArr();
      setUserValue("");
      setResetButtonVisible(false);
      setInputFieldDisabled(false);
    }
  };

  function sortGridArr(arr) {
    arr.sort(function (a, b) {
      return a - b;
    });
    return arr;
  }

  return (
    <div className="font-KohSantepheap w-full h-full xxl:min-h-[1555px] pb-10 sm:pb-14 md:pb-20 xxl:pb-[169px]">
      <div className="w-full h-full md:max-w-[700px] lg:max-w-[800px] xl:max-w-[980px] xxl:max-w-[1535px] mx-auto p-4">
        <img
          src={logo}
          alt="logo"
          className="mt-5 md:mt-0 mb-5 md:mb-0 md:max-w-[500px] xxl:mt-20 xxl:mb-[70px] xxl:max-w-[833px] xxl:max-h-[240px] mx-auto"
        />
        <div className="">
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
            <p className="ml-2">Go back</p>
          </Link>
          <p className="xxl:text-2xl leading-6 font-bold mb-5 xxl:mb-14">
            Task: Puzzle Grid
          </p>
          <p className="mb-3">Enter number</p>
          <div className="xs320:flex justify-between">
            <div className="mb-8 xxl:mb-14 relative w-full sm:w-auto md:flex">
              {/* Input field that takes user input */}
              <input
                value={userValue}
                type="number"
                onChange={getInputValue}
                onFocus={() => {
                  setTooltipVisible(false);
                }}
                placeholder="Enter a number!"
                className="p-3 sm:p-4 border border-gray-200 rounded-[4px] w-full sm:w-[340px] sm:mr-8 mb-4 sm:mb-0 max-h-[48px]"
                disabled={inputFieldDisabled}
              />

              {/* Custom Tooltip */}
              <div
                className={`absolute -top-14 sm:top-10 sm:-bottom-6 left-20 sm:left-4 bg-red-100 text-red-500 border border-t-red-500 border-l-red-500 border-b-purple-500 border-r-purple-500  px-4 py-2 rounded-t-lg xs320:rounded-t-0 xs320:rounded-tr-lg xs320:rounded-b-lg rounded-br-lg  shadow-md ${
                  (tooltipVisible && `opacity-100`) || `opacity-0`
                } transition-opacity duration-300 `}
              >
                <p>Please enter a value from 2 to 6!</p>
              </div>

              {/* Submit Button*/}
              <button
                type="submit"
                onClick={() => {
                  if (userValue < 2 || userValue > 6) {
                    setTooltipVisible(true);
                  } else if (userValue > 0) {
                    setTooltipVisible(true);
                    setTooltipVisible(false);
                    createGridValues(userValue * userValue);
                    setResetButtonVisible(true);
                    setInputFieldDisabled(true);
                  }
                }}
                className="bg-blue-600 border border-transparent text-white w-full rounded
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
                    setInputFieldDisabled(false);
                  }}
                  // className='sm:hidden text-blue-600 border border-blue-600 px-12 py-1 rounded-2xl mr-2 absolute right-0 self-end w-full max-w-[130px] xs375:max-w-[150px] xs375:py-1.5  xs425:max-w-[180px] xs425:py-2'>
                  className="sm:hidden text-blue-600 border border-blue-600 py-[14px] px-8 text-sm leading-[14px] rounded w-full mt-2"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Reset Button for large screens */}
            <div>
              {resetButtonVisible && (
                <button
                  onClick={() => {
                    setGridArr();
                    setUserValue("");
                    setResetButtonVisible(false);
                    setInputFieldDisabled(false);
                  }}
                  className="hidden sm:block text-blue-600 border border-blue-600 rounded-[4px] px-8 py-4 "
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Number classification labels */}
          <div className="mb-6">
            <ul className="flex flex-row gap-3 xs320:gap-4">
              <li>
                <p className="text-neutral-600 text-[10px] xs375:text-[12px] xs425:text-[14px] sm:text-xs leading-3">
                  {/* Label icon */}
                  <span className="bg-amber-400 text-amber-400 rounded-full text-[8px] px-[5px] mr-1 xs375:text-[11px] xs375:px-[7px] xs425:text-[14px] xs425:px-[9px] xs375:mr-1.5 sm:text-xs sm:px-2 sm:mr-2"></span>
                  {/* Label text */}
                  Prime Number
                </p>
              </li>
              <li>
                <p className="text-neutral-600 text-[10px] xs375:text-[12px] xs425:text-[14px] sm:text-xs leading-3">
                  {/* Label icon */}
                  <span className="bg-emerald-400 text-emerald-400 rounded-full text-[8px] px-[5px] mr-1 xs375:text-[11px] xs375:px-[7px] xs425:text-[14px] xs425:px-[9px] xs375:mr-1.5 sm:text-xs sm:px-2 sm:mr-2"></span>
                  {/* Label text */}
                  Even Number
                </p>
              </li>
              <li>
                <p className="text-neutral-600 text-[10px] xs375:text-[12px] xs425:text-[14px] sm:text-xs leading-3">
                  {/* Label icon */}
                  <span className="bg-blue-400 text-blue-400 rounded-full text-[8px] px-[5px] mr-1 xs375:text-[11px] xs375:px-[7px] xs425:text-[14px] xs425:px-[9px] xs375:mr-1.5 sm:text-xs sm:px-2 sm:mr-2"></span>
                  {/* Label text */}
                  Odd Number
                </p>
              </li>
            </ul>
          </div>

          {/* Grid container with fixed width and adjustable height */}
          <div className="bg-orange-100 border border-orange-600 min-h-[250px] md:min-h-[350px] xxl:min-h-[744px] xl:w-[1080] xxl:max-w-[1535px] rounded-3xl p-6 xxl:p-12 mx-auto">
            <div
              style={{ gridTemplateColumns: `repeat(${userValue}, 1fr` }}
              className={`grid grid-cols-${userValue} gap-x-2 xxl:gap-x-8 gap-y-2 xxl:gap-y-4 mx-auto w-full`}
              //   className="grid flex flex-wrap gap-x-2 xxl:gap-x-8 gap-y-2 xxl:gap-y-4 mx-auto w-full"
            >
              {gridArr?.map((item, idx) => {
                return (
                  <div
                    id="mob-drag"
                    key={idx * 1000 * Math.random()}// className={`flex items-center justify-center min-w-[50px] min-h-[50px] xs320:w-[70px] xs320:h-[70px] xs375:w-[89px] xs375:h-[87px] xs425:w-[75px] xs425:h-[75px] sm:w-[125px] sm:h-[125px] md:w-[145px] md:h-[150px] lg:w-[171px] lg:h-[150px] xxl:w-[212px] xxl:h-[150px] text-white text-lg xxl:text-[32px] leading-8 text-center rounded-2xl
                    className={`flex items-center justify-center text-white text-lg xxl:text-[32px] leading-8 text-center rounded-2xl min-h-[50px]  xs320:h-[70px] xs375:h-[87px] xs425:h-[75px] sm:h-[125px] md:h-[150px] lg:h-[150px] xxl:h-[150px]
                                        ${
                                          (item > 2 &&
                                            item % 2 !== 0 &&
                                            item % 3 !== 0 &&
                                            item % 5 !== 0 &&
                                            item % 7 !== 0 &&
                                            "bg-yellow-500") ||
                                          ((item === 2 ||
                                            item === 3 ||
                                            item === 5) &&
                                            "bg-yellow-500") ||
                                          (item % 2 === 0 && "bg-green-500") ||
                                          "bg-blue-500"
                                        } ${dragCursor}`}
                    // Drag functions
                    onDragStart={(e) => {dragStart(e, idx); e.dataTransfer.effectAllowed = "copyMove";}}
                    onDragEnter={(e) => {dragEnter(e, idx); e.dataTransfer.dropEffect = "copy";}}
                    onDragEnd={drop}
                    draggable
                    // Touch functions
                    onTouchStart={(e) => {
                      // dragStart(e, idx);
                      // console.log(e.touches[0].clientX, e.touches[0].clientY)
                      // xPos = e.touches[0].pageX + 100
                      xPosClient = e.touches[0].clientX;
                      xPosScreen = e.touches[0].screenX;
                      xPosPage = e.touches[0].pageX;
                      // xPosOffset = e.touches[0].offsetX
                      // e.target.current = idx
                      // console.log("first", e.target.current)
                    }}
                    // onTouchMove={(e) => dragEnter(e, idx)}
                    onTouchMove={(e) => {
                      // console.log("third ", e.target.innerHTML);
                      // let test = e.target.innerHTML
                      // console.log("third ", e.changedTouches[0].pageX);
                      // yPos = e.changedTouches[0].pageX + 100
                      yPosClient = e.touches[0].clientY;
                      yPosScreen = e.touches[0].screenY;
                      yPosPage = e.touches[0].pageY;
                      // yPosOffset = e.touches[0].offsetY
                      // e.target.current = idx
                      // const test = e.idx.getBoundingClientRect()
                      // console.log("test", test.top)
                      // console.log("second", e.target.current)
                      console.log("xClient ", xPosClient);
                      console.log("xScreen ", xPosScreen);
                      console.log("xPage ", xPosPage);
                      // console.log("xOffset ", xPosOffset)
                      console.log("yClient ", yPosClient);
                      console.log("yScreen ", yPosScreen);
                      console.log("yPage ", yPosPage);
                      // console.log("yOffset ", yPosOffset)
                      // let doc = document.getElementById('mob-drag')
                      console.log(
                        "element ",
                        document.elementFromPoint(xPosClient, yPosPage)
                      );
                      // console.log("element ", document.elementFromPoint(xPos, yPos))
                      // console.log("element ", document.elementFromPoint(xPos, yPos))
                      // console.log("element ", document.elementFromPoint(xPos, yPos))
                      // e.targetTouches.current = idx;
                      // e.target.current = idx;
                      // console.log("third ", e.targetTouches.idx);
                      // console.log("fourth ", e.target.idx);
                      // console.log(e.touches[0].clientX, e.touches[0].clientY)
                    }}
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
