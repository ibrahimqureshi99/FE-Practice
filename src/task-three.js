import React, { useState, useRef } from "react";
import logo from "./images/AP-logo.png";

export default function TaskThree() {
  // Variable declarations
  let gridValues = [];

  //useRefs
  const dragItem = useRef();
  const dragOverItem = useRef();

  // UseStates
  const [userValue, setUserValue] = useState(""); //for input value
  const [gridArr, setGridArr] = useState(); //for the grid mapped to grid container
  const [defaultArr, setDefaultArr] = useState(); //to keep copy of original, reverts to this when a new label is clicked
  const [resetButtonVisible, setResetButtonVisible] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [inputFieldDisabled, setInputFieldDisabled] = useState(false);
  const [valueType, setValueType] = useState("all"); //if value is even, odd, or prime
  const [isDraggable, setIsDraggable] = useState(true); //draggable only on "all" tab, otherwise not draggable
  const [activeTab, setActiveTab] = useState(false); //sets the "all" tab as selected by default on pressing submit
  const [clickable, setClickable] = useState(false);

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
    setDefaultArr(gridValues);
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

    // Switch elements of selected tiles
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setGridArr(copyListItems);
    setDefaultArr(copyListItems);

    // Comparison with sorted array
    let sorted = sortGridArr(gridArr);
    if (JSON.stringify(copyListItems) === JSON.stringify(sorted)) {
      setTimeout(alert("Task completed successfully!"), 20000);
    }
  };

  function sortGridArr(arr) {
    arr.sort(function (a, b) {
      return a - b;
    });
    return arr;
  }

  return (
    <div className="w-full h-full xxl:min-h-[1555px] pb-10 sm:pb-14 md:pb-20 xxl:pb-[169px]">
      <div className="w-full h-full md:max-w-[700px] lg:max-w-[800px] xl:max-w-[980px] xxl:max-w-[1535px] mx-auto p-4">
        <img
          src={logo}
          alt="logo"
          className="mt-5 md:mt-0 mb-5 md:mb-0 md:max-w-[500px] xxl:mt-20 xxl:mb-[70px] xxl:max-w-[833px] xxl:max-h-[240px] mx-auto"
        />
        <div className="">
          <p className="xxl:text-2xl leading-6 font-bold mb-5 xxl:mb-14">
            Task: Num detector via color in grid
          </p>
          <p className="mb-3">Enter number</p>
          <div className="xs320:flex justify-between">
            <div className="mb-8 xxl:mb-14 relative w-full sm:w-auto">
              {/* Input field that takes user input */}
              <input
                value={userValue}
                type="number"
                onChange={getInputValue}
                onFocus={() => {
                  setTooltipVisible(false);
                }}
                placeholder="Enter a number!"
                className="p-3 sm:p-4 border border-gray-200 rounded-[4px] w-full sm:w-[340px] sm:mr-8 mb-4 sm:mb-0"
                disabled={inputFieldDisabled}
              />

              {/* Custom Tooltip */}
              <div
                className={`absolute -top-14 sm:top-10 sm:-bottom-6 left-20 sm:left-4 bg-red-100 text-red-500 border border-t-red-500 border-l-red-500 border-b-purple-500 border-r-purple-500  px-4 py-2 rounded-t-lg xs320:rounded-t-0 xs320:rounded-tr-lg xs320:rounded-b-lg rounded-br-lg  shadow-md ${
                  (tooltipVisible && `opacity-100`) || `opacity-0`
                } transition-opacity duration-300 `}
              >
                <p>Please enter a value from 1 to 6!</p>
              </div>

              {/* Submit Button*/}
              <button
                type="submit"
                onClick={() => {
                  if (userValue > 6) {
                    setTooltipVisible(true);
                  } else if (userValue > 0) {
                    setTooltipVisible(true);
                    setTooltipVisible(false);
                    createGridValues(userValue * userValue);
                    setResetButtonVisible(true);
                    setInputFieldDisabled(true);
                    setActiveTab(true);
                    setClickable(true);
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
                    setValueType("all");
                    setActiveTab(false);
                  }}
                  // className='sm:hidden text-blue-600 border border-blue-600 px-12 py-1 rounded-2xl mr-2 absolute right-0 self-end w-full max-w-[130px] xs375:max-w-[150px] xs375:py-1.5  xs425:max-w-[180px] xs425:py-2'>
                  className={`sm:hidden border ${
                    valueType === "all"
                      ? "text-blue-600 border-blue-600"
                      : valueType === "prime"
                      ? "text-violet-500 border-violet-500"
                      : valueType === "even"
                      ? "text-green-500 border-green-500"
                      : valueType === "odd"
                      ? "text-red-500 border-red-500"
                      : ""
                  } py-[14px] px-8 text-sm leading-[14px] rounded w-full mt-2`}
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
                    setValueType("all");
                    setActiveTab(false);
                  }}
                  className={`hidden sm:block border ${
                    valueType === "all"
                      ? "text-blue-600 border-blue-600"
                      : valueType === "prime"
                      ? "text-violet-500 border-violet-500"
                      : valueType === "even"
                      ? "text-green-500 border-green-500"
                      : valueType === "odd"
                      ? "text-red-500 border-red-500"
                      : ""
                  } rounded-[4px] px-8 py-4`}
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Number classification labels */}
          <div className="mb-6">
            <ul className="flex flex-row whitespace-nowrap p-0 gap-4 xs320:gap-3 border-b border-gray-200 md:max-w-[410px] overflow-x-scroll md:overflow-hidden">
              <li>
                <button
                  onClick={() => {
                    setGridArr(defaultArr);
                    setValueType("all");
                    setIsDraggable(true);
                  }}
                  className={`pb-3 px-[15px] text-neutral-600 text-[10px] xs375:text-[12px] xs425:text-[14px] sm:text-xs leading-3 focus:font-bold focus:border-b-[3px] focus:border-gray-800 ${
                    activeTab
                      ? "font-bold border-b-[3px] border-gray-800"
                      : null
                  }`}
                  disabled={!clickable}
                >
                  All
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    // setGridArr(defaultArr);
                    const copyArr = [...defaultArr];
                    const primeArr = copyArr.filter(
                      (val) =>
                        val === 2 ||
                        val === 3 ||
                        val === 5 ||
                        (val % 2 !== 0 &&
                          val % 3 !== 0 &&
                          val % 5 !== 0 &&
                          val % 7 !== 0)
                    );
                    setGridArr(primeArr);
                    setValueType("prime");
                    setIsDraggable(false);
                    setActiveTab(false);
                    // console.log(primeArr);
                  }}
                  className="pb-3 text-neutral-600 text-[10px] xs375:text-[12px] xs425:text-[14px] sm:text-xs leading-3 focus:font-bold focus:border-b-[3px] focus:border-violet-500"
                  disabled={!clickable}
                >
                  {/* Label icon */}
                  <span className="bg-violet-500 text-violet-500 rounded-full text-[8px] px-[5px] mr-1 xs375:text-[11px] xs375:px-[7px] xs425:text-[14px] xs425:px-[9px] xs375:mr-1.5 sm:text-xs sm:px-2 sm:mr-2"></span>
                  {/* Label text */}
                  Prime Number
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    // setGridArr(defaultArr);
                    const copyArr = [...defaultArr];
                    const evenArr = copyArr.filter((val) => val % 2 === 0);
                    setGridArr(evenArr);
                    setValueType("even");
                    setIsDraggable(false);
                    setActiveTab(false);
                  }}
                  className="pb-3 text-neutral-600 text-[10px] xs375:text-[12px] xs425:text-[14px] sm:text-xs leading-3 focus:font-bold focus:border-b-[3px] focus:border-emerald-400"
                  disabled={!clickable}
                >
                  {/* Label icon */}
                  <span className="bg-emerald-400 text-emerald-400 rounded-full text-[8px] px-[5px] mr-1 xs375:text-[11px] xs375:px-[7px] xs425:text-[14px] xs425:px-[9px] xs375:mr-1.5 sm:text-xs sm:px-2 sm:mr-2"></span>
                  {/* Label text */}
                  Even Number
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    // setDefaultArr(gridArr)
                    const copyArr = [...defaultArr];
                    const oddArr = copyArr.filter((val) => val % 2 !== 0);
                    setGridArr(oddArr);
                    setValueType("odd");
                    setIsDraggable(false);
                    setActiveTab(false);
                  }}
                  className="pb-3 text-neutral-600 text-[10px] xs375:text-[12px] xs425:text-[14px] sm:text-xs leading-3 focus:font-bold focus:border-b-[3px] focus:border-red-800"
                  disabled={!clickable}
                >
                  {/* Label icon */}
                  <span className="bg-red-500 text-red-500 rounded-full text-[8px] px-[5px] mr-1 xs375:text-[11px] xs375:px-[7px] xs425:text-[14px] xs425:px-[9px] xs375:mr-1.5 sm:text-xs sm:px-2 sm:mr-2"></span>
                  {/* Label text */}
                  Odd Number
                </button>
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
                    key={idx * 1000 * Math.random()}
                    // className={`flex items-center justify-center min-w-[50px] min-h-[50px] xs320:w-[70px] xs320:h-[70px] xs375:w-[89px] xs375:h-[87px] xs425:w-[75px] xs425:h-[75px] sm:w-[125px] sm:h-[125px] md:w-[145px] md:h-[150px] lg:w-[171px] lg:h-[150px] xxl:w-[212px] xxl:h-[150px] text-white text-lg xxl:text-[32px] leading-8 text-center rounded-2xl
                    className={`flex items-center justify-center text-white text-lg xxl:text-[32px] leading-8 text-center rounded-2xl min-h-[50px]  xs320:h-[70px] xs375:h-[87px] xs425:h-[75px] sm:h-[125px] md:h-[150px] lg:h-[150px] xxl:h-[150px]
                                        ${
                                          valueType === "all"
                                            ? (item > 2 &&
                                                item % 2 !== 0 &&
                                                item % 3 !== 0 &&
                                                item % 5 !== 0 &&
                                                item % 7 !== 0 &&
                                                "bg-violet-500") ||
                                              ((item === 2 ||
                                                item === 3 ||
                                                item === 5) &&
                                                "bg-violet-500") ||
                                              (item % 2 === 0 &&
                                                "bg-green-500") ||
                                              "bg-rose-500"
                                            : valueType === "even"
                                            ? "bg-green-500"
                                            : valueType === "odd"
                                            ? "bg-rose-500"
                                            : valueType === "prime"
                                            ? "bg-violet-500"
                                            : ""
                                        }`}
                    // Drag functions
                    draggable={isDraggable}
                    onDragStart={(e) =>
                      isDraggable ? dragStart(e, idx) : null
                    }
                    onDragEnter={(e) =>
                      isDraggable ? dragEnter(e, idx) : null
                    }
                    onDragEnd={isDraggable ? drop : null}
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
