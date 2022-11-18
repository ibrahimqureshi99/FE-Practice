import React, { useState } from 'react'
import logo from './images/AP-logo.png'

export default function Task() {

    let gridValues = []

    // UseStates
    const [userValue, setUserValue] = useState('')
    const [gridArr, setGridArr] = useState()
    const [resetButtonVisible, setResetButtonVisible] = useState(false)
    const [tooltipVisible, setTooltipVisible] = useState(false)

    return (
        <div className='w-full'>
            <div className='w-full h-full md:max-w-[700px] lg:max-w-[800px] xl:max-w-[1080px] xxl:max-w-[1535px] mx-auto p-5 '>
                <img src={logo} alt="logo" className='mt-5 md:mt-0 mb-5 md:mb-0 md:max-w-[500px] xxl:mt-20 xxl:mb-[70px] xxl:max-w-[833px] xxl:max-h-[240px] mx-auto' />
                <div className=''>
                    <p className='xxl:text-2xl leading-6 font-medium mb-5 xxl:mb-14'>Task: Num detector via color in grid</p>
                    <p className='mb-3'>Enter number</p>
                    <div className='xs:flex justify-between'>
                        <div className='mb-5 xxl:mb-14 relative w-full sm:w-auto'>

                            {/* Input field that takes user input */}
                            <input
                                value={userValue}
                                type="number"
                                min='10'
                                max='30'
                                onChange={(e) => { setUserValue(e.target.value) }}
                                onFocus={() => { setTooltipVisible(false) }}
                                placeholder='Enter a numeric value up to 30!'
                                className='p-3 sm:p-4 border border-gray-200 rounded-[4px] w-full sm:w-[360px] sm:mr-8 mb-2 sm:mb-0'
                            />

                            {/* Custom Tooltip */}
                            <div className={`absolute -top-10 sm:top-10 sm:-bottom-6 left-20 sm:left-4 bg-red-100 text-red-500 border border-t-red-500 border-l-red-500 border-b-purple-500 border-r-purple-500  px-4 py-2 rounded-t-lg xs:rounded-t-0 xs:rounded-tr-lg xs:rounded-b-lg rounded-br-lg  shadow-md ${(tooltipVisible && `opacity-100`) || `opacity-0`} transition-opacity duration-300 `}>
                                <p>Please enter a value between 1 and 30!</p></div>

                            {/* Submit Button*/}
                            <button
                                type='submit'
                                onClick={() => {
                                    if (userValue > 30) {
                                        setTooltipVisible(true);
                                    }
                                    else if (userValue > 0) {
                                        setTooltipVisible(true);
                                        setTooltipVisible(false)
                                        for (let i = 1; i <= userValue; i++) {
                                            gridValues.push(i)
                                        };
                                        setGridArr(gridValues);
                                        setResetButtonVisible(true);
                                    }
                                }}
                                className='bg-blue-600 border border-transparent text-white 
                                sm:px-8 sm:py-4 sm:w-auto sm:rounded-[4px]
                                px-10 py-1 rounded-2xl ml-2 max-w-[130px]'
                            >
                                Submit
                            </button>

                            {/* Reset Button for mobile screen */}
                            {resetButtonVisible && <button
                                onClick={() => {
                                    setGridArr();
                                    setUserValue("");
                                    setResetButtonVisible(false)
                                }
                                }
                                className='sm:hidden text-blue-600 border border-blue-600 px-12 py-1 rounded-2xl mr-2 absolute right-0 self-end max-w-[130px]'>
                                Reset</button>}
                        </div>

                        {/* Reset Button for large screens */}
                        <div>{resetButtonVisible && <button
                            onClick={() => {
                                setGridArr();
                                setUserValue("");
                                setResetButtonVisible(false)
                            }
                            }
                            className='hidden sm:block text-blue-600 border border-blue-600 rounded-[4px] px-8 py-4 '>
                            Reset</button>}
                        </div>
                    </div>

                    {/* Number classification labels */}
                    <div className='mb-6'>
                        <ul className='flex flex-row gap-3 xs:gap-4'>
                            <li>
                                <p className='text-neutral-600 text-[11px] xs:text-xs leading-3'><span className='bg-amber-400 text-amber-400 rounded-full text-[10px] px-[7px] mr-1 xs:text-xs xs:px-2 xs:mr-2'></span>Prime Number</p>
                            </li>
                            <li>
                                <p className='text-neutral-600 text-[11px] xs:text-xs leading-3'><span className='bg-emerald-400 text-emerald-400 rounded-full text-[10px] px-[7px] mr-1 xs:text-xs xs:px-2 xs:mr-2'></span>Even Number</p>
                            </li>
                            <li>
                                <p className='text-neutral-600 text-[11px] xs:text-xs leading-3'><span className='bg-blue-400 text-blue-400 rounded-full text-[10px] px-[7px] mr-1 xs:text-xs xs:px-2 xs:mr-2'></span>Odd Number</p>
                            </li>
                        </ul>
                    </div>

                    {/* Grid container with fixed width and adjustable height */}
                    <div
                        className='bg-orange-100 border border-orange-600 min-h-[250px] md:min-h-[350px] xxl:min-h-[744px] xl:w-[1080] xxl:w-[1535px] rounded-3xl p-6 xxl:p-12 mx-auto justify-center'>
                        <div
                            className='flex flex-wrap gap-x-2 xxl:gap-x-8 gap-y-2 xxl:gap-y-4'>
                            {gridArr?.map((item, idx) => {
                                return (
                                    <div
                                        key={idx * 1000 * Math.random()}
                                        className={`flex items-center justify-center min-w-[50px] min-h-[50px]  text-white text-lg xxl:text-[32px] leading-8 text-center rounded-2xl 
                                        ${(item > 2 && item % 2 !== 0 && item % 3 !== 0 && 'bg-yellow-500') ||
                                            (((item === 2) || (item === 3) || (item === 5)) && 'bg-yellow-500') ||
                                            (item % 2 === 0 && 'bg-green-500') ||
                                            ('bg-blue-500')
                                            }`}
                                    >
                                        {item}
                                    </div>
                                )
                            }
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

