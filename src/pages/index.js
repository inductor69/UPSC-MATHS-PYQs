import Head from "next/head";
import { useRef, useState, useEffect } from "react";

import "katex/dist/katex.min.css";
import katex from "katex";

import Latex from "react-latex";

import ReactDOM from "react-dom";

if (typeof window !== "undefined") {
  function startsearch() {
    fetch("upsc.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => searchQuestion(data));
  }

  const searchBar = document.getElementById("search-bar");

  const searchbtn = document.getElementById("search-btn");
  if (searchbtn) {
    searchbtn.addEventListener("click", startsearch);
  }

  let yearfilter = [
    {
      year: 2020,
      state: 0,
    },
    {
      year: 2019,
      state: 0,
    },
    {
      year: 2018,
      state: 0,
    },
    {
      year: 2017,
      state: 0,
    },
    {
      year: 2016,
      state: 0,
    },
    {
      year: 2015,
      state: 0,
    },
    {
      year: 2014,
      state: 0,
    },
    {
      year: 2013,
      state: 0,
    },
    {
      year: 2012,
      state: 0,
    },
    {
      year: 2011,
      state: 0,
    },
    {
      year: 2010,
      state: 0,
    },
    {
      year: 2009,
      state: 0,
    },
    {
      year: 2008,
      state: 0,
    },
    {
      year: 2007,
      state: 0,
    },
    {
      year: 2006,
      state: 0,
    },
    {
      year: 2005,
      state: 0,
    },
    {
      year: 2004,
      state: 0,
    },
    {
      year: 2003,
      state: 0,
    },
    {
      year: 2002,
      state: 0,
    },
    {
      year: 2001,
      state: 0,
    },
    {
      year: 2000,
      state: 0,
    },
    {
      year: 1999,
      state: 0,
    },
    {
      year: 1998,
      state: 0,
    },
    {
      year: 1997,
      state: 0,
    },
    {
      year: 1996,
      state: 0,
    },
    {
      year: 1995,
      state: 0,
    },
    {
      year: 1994,
      state: 0,
    },
    {
      year: 1993,
      state: 0,
    },
    {
      year: 1992,
      state: 0,
    },
    {
      year: 1991,
      state: 0,
    },
    {
      year: 1990,
      state: 0,
    },
  ];

  // let filterswitch=0;

  function checkfilterswitch() {
    let n = 0;
    yearfilter.forEach((y) => {
      if (y.state) {
        n = 1;
      }
    });
    if (n) {
      return 1;
    } else {
      return 0;
    }
  }

  //0: All 1:GS-I 2:GS-II 3:GS-III 4:GS-IV 5:Math
  let papercode = 1;

  function searchQuestion(data) {
    removeQuestions();
    let query = getQuery().toLowerCase();
    let dataSize = 0;
    let filterdata = [];
    switch (papercode) {
      case 1:
        dataSize = data.CALCULUS.length;
        filterdata = data.CALCULUS;
        break;
      case 2:
        dataSize = data.LA.length;
        filterdata = data.LA;
        break;
      case 3:
        dataSize = data.AG.length;
        filterdata = data.AG;
        break;
    }
    // console.log(dataSize);
    let ques = "";

    for (let i = 0; i < dataSize; i++) {
      ques = filterdata[i].Question.toLowerCase();
      let n = ques.search(query);
      if (n >= 0) {
        // console.log(data.GSI[i].Question);
        if (checkfilterswitch()) {
          yearfilter.forEach((y) => {
            if (y.state) {
              if (y.year == filterdata[i].Year) {
                displayQuestions(filterdata[i]);
              }
            }
          });
        } else {
          displayQuestions(filterdata[i]);
        }
      }
    }
  }
  function getQuery() {
    return searchBar.value;
    // console.log(searchBar.value);
  }

  // Execute a function when the user presses a key on the keyboard
  if (searchBar) {
    searchBar.addEventListener("keypress", function (event) {
      // If the user presses the "Enter" key on the keyboard
      if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        searchbtn.click();
      }
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      event.preventDefault();
      removeQuestions();
      // alert("Clicked!");
    }
  });

  const filterbtn = document.getElementById("filter-btn");
  const filterbox = document.getElementsByClassName("filter-box");
  if (filterbtn) {
    filterbtn.addEventListener("click", function () {
      filterbox[0].classList.toggle("filter-box-open");
    });
  }

  const filtertags = document.querySelectorAll(".filter-tags");
  const papertags = document.querySelectorAll(".paper-tags");

  filtertags.forEach((element) => {
    element.addEventListener("click", function () {
      element.classList.toggle("filter-tags-clicked");
      yearfilter.forEach((y) => {
        if (element.innerText == y.year) {
          if (y.state) {
            y.state = 0;
          } else {
            y.state = 1;
          }
        }
      });
    });
  });

  let paperfilters = [
    {
      paper: "Calculus",
      state: 0,
    },
    {
      paper: "Linear Algebra",
      state: 0,
    },
    {
      paper: "Analytical Geometry",
      state: 0,
    },
  ];

  papertags.forEach((element) => {
    element.addEventListener("click", function () {
      papertags.forEach((item) => {
        if (element.innerText == item.innerText) {
          item.classList.add("paper-tags-clicked");
        } else {
          item.classList.remove("paper-tags-clicked");
        }
      });
      paperfilters.forEach((item) => {
        if (item.paper == element.innerText) {
          item.state = 0;
          switch (item.paper) {
            case "Calculus":
              papercode = 1;
              break;
            case "Linear Algebra":
              papercode = 2;
              break;
            case "Analytical Geometry":
              papercode = 3;
              break;
          }
        } else {
          item.state = 0;
        }
      });
    });
  });

  const questionsList = document.getElementById("questions-list");
  function displayQuestions(item) {
    const questionBox = document.createElement("div");
    questionBox.classList.add("question-box");
    ReactDOM.render(
      <div>
        <p>
          <Latex>{item.Question}</Latex>
        </p>
        <div className="qinfo">
          <div className="qinfo-items">Paper: {item.Paper}</div>
          <div className="qinfo-items">Year: {item.Year}</div>
          <div className="qinfo-items">Marks: {item.Marks}</div>
        </div>
      </div>,
      questionBox
    );

    questionsList.appendChild(questionBox);

    let qinfoBox = document.querySelectorAll(".qinfo");
  }

  function removeQuestions() {
    let t = questionsList.childElementCount;
    for (var i = 0; i < t; i++) {
      questionsList.removeChild(questionsList.children[0]);
    }
  }

  function copyquestion(element) {
    // alert(element.dataset.question);
    // navigator.clipboard.writeText(element.dataset.question);
    copyText(element.dataset.question);
    element.innerText = "Copied";
  }

  function copyText(textToCopy) {
    this.copied = false;

    // Create textarea element
    const textarea = document.createElement("textarea");

    // Set the value of the text
    textarea.value = textToCopy;

    // Make sure we cant change the text of the textarea
    textarea.setAttribute("readonly", "");

    // Hide the textarea off the screnn
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";

    // Add the textarea to the page
    document.body.appendChild(textarea);

    // Copy the textarea
    textarea.select();

    try {
      var successful = document.execCommand("copy");
      this.copied = true;
    } catch (err) {
      this.copied = false;
    }

    textarea.remove();
  }
}

const Home = () => {
  const ref = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const years = [
    1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001,
    2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013,
    2014, 2015, 2016, 2017, 2018, 2019,
  ];

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/upsc.json")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  const toggleSectionVisibility = () => {
    setIsSectionVisible(!isSectionVisible);
  };

  const [laData, setLaData] = useState(null);
  const [agData, setAgData] = useState(null);
  const [calData, setCalData] = useState(null);
  const [odeData, setOdeData] = useState(null);
  const [sdData, setSdData] = useState(null);

  const handleLAButtonClick = () => {
    const laData = data.LA.filter((item) => item.Paper === "Linear Algebra");
    setLaData(laData);
    setAgData(null);
    setCalData(null);
    setOdeData(null);
    setSdData(null);
  };
  const handleAGButtonClick = () => {
    const agData = data.AG.filter(
      (item) => item.Paper === "Analytical Geometry"
    );
    setAgData(agData);
    setLaData(null);
    setCalData(null);
    setOdeData(null);
    setSdData(null);
  };

  const handleCALButtonClick = () => {
    const calData = data.CALCULUS.filter((item) => item.Paper === "Calculus");
    setCalData(calData);
    setLaData(null);
    setAgData(null);
    setOdeData(null);
    setSdData(null);
  };

  const handleSdButtonClick = () => {
    const sdData = data.SD.filter((item) => item.Paper === "Static & Dynamics");
    setSdData(sdData);
    setLaData(null);
    setAgData(null);
    setCalData(null);
    setOdeData(null);
  };
  const handleODEButtonClick = () => {
    const odeData = data.ODE.filter(
      (item) => item.Paper === "Ordinary Differential Equations"
    );
    setOdeData(odeData);
    setLaData(null);
    setAgData(null);
    setCalData(null);
    setSdData(null);
  };

  function renderData(data) {
    return (
      <div>
        {data
          .filter((item) => selectedYears.includes(item.Year))

          .map((item) => (
            <div key={item.Id}>
              <div className="items-center px-2 md:px-4 sm:py-8 m-auto">
                <div className="flex flex-col sm:flex-row pb-3 justify-center space-y-4 sm:space-y-0 sm:space-x-1 xl:space-x-6 mx-8 sm:mx-0">
                  <div className="w-full p-2 lg:w-2/3 md:w-2/3 bg-[#D9D9D9]  rounded-md shadow-sm">
                    <div className="flex flex-col">
                      <div className="flex flex-row items-center justify-between px-4 py-2">
                        <div className="flex text-base text-gray-600">{`Year: ${item.Year}`}</div>
                      </div>
                      <div className="px-4">
                        <div
                          className="mt-1 text-xs px-2 py-1 text-gray-300 bg-gray-900"
                          style={{ display: "inline-block" }}
                        >
                          {item.Paper}
                        </div>
                        <h2 className="my-3 font-bold text-xl text-gray-800">
                          <Latex>{item.Question}</Latex>
                        </h2>
                        <div className="flex flex-row items-center justify-between w-full mb-2">
                          <div className="text-gray-800 font-medium text-md">
                            {`Marks: ${item.Marks}`}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }


  const [selectedYears, setSelectedYears] = useState([]);

  const handleYearSelect = (year) => {
    setSelectedYears((prevYears) => {
      const newYears = prevYears.includes(year)
        ? prevYears.filter((y) => y !== year)
        : [...prevYears, year];
      return newYears;
    });
  };

  const handleSelectAllYears = () => {
    const years = [];
    for (let year = 1992; year <= 2019; year++) {
      years.push(year);
    }

    if (selectedYears.length === years.length) {
      setSelectedYears([]);
    } else {
      setSelectedYears(years);
    }
  };

  return (
    <>
      <Head>
        <title>UPSC Maths PYQs</title>
        <meta
          name="description"
          content={`
          Easily find and filter through PYQs of UPSC Maths Optional        `}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div></div>
      <section className="bg-blueGray-50 mb-[6rem]">
        <div className="container mx-auto overflow-hidden">
          <div className="flex items-center justify-between px-4 py-5 bg-blueGray-50">
            <div className="w-auto">
              <div className="flex flex-wrap items-center">
                <div className="w-auto mr-14"></div>
              </div>
            </div>
            <div className="w-auto">
              <div className="flex flex-wrap items-center">
                <div className="w-auto hidden lg:block m-2">
                  <div className="inline-block">
                    <button
                      onClick={() => setShowModal(true)}
                      className="py-3 px-5 w-full font-semibold border border-gray-300 hover:border-gray-400 rounded-xl focus:ring focus:ring-gray-50 bg-transparent hover:bg-gray-100 transition ease-in-out duration-200"
                      type="button"
                    >
                      <div className="flex flex-wrap justify-center items-center -m-1">
                        <div className="w-auto p-1">
                          <svg
                            width={22}
                            height={22}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                            />
                          </svg>
                        </div>
                        <div className="w-auto p-1">
                          <span>How to Use</span>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="w-auto hidden lg:block">
                  <div className="inline-block">
                    <button
                      className="py-3 px-7 w-full text-white font-semibold border border-indigo-700 rounded-xl focus:ring focus:ring-indigo-300 bg-gray-800 transition ease-in-out duration-200"
                      type="button"
                    >
                      Login
                    </button>
                  </div>
                </div>
                <div className="w-auto lg:hidden">
                  <a href="#">
                    <svg
                      className="navbar-burger text-indigo-600"
                      width={51}
                      height={51}
                      viewBox="0 0 56 56"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width={56}
                        height={56}
                        rx={28}
                        fill="currentColor"
                      />
                      <path
                        d="M37 32H19M37 24H19"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden navbar-menu fixed top-0 left-0 bottom-0 w-4/6 sm:max-w-xs z-50">
            <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-80" />
            <nav className="relative z-10 px-9 pt-8 bg-white h-full overflow-y-auto">
              <div className="flex flex-wrap justify-between h-full">
                <div className="w-full">
                  <div className="flex items-center justify-between -m-2">
                    <div className="w-auto p-2">
                      <a className="inline-block" href="#">
                        <img
                          src="flaro-assets/logos/flaro-logo-black.svg"
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="w-auto p-2">
                      <a className="navbar-burger" href="#">
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 18L18 6M6 6L18 18"
                            stroke="#111827"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center py-16 w-full">
                  <ul>
                    <li className="mb-12">
                      <a className="font-medium hover:text-gray-700" href="#">
                        Features
                      </a>
                    </li>
                    <li className="mb-12">
                      <a className="font-medium hover:text-gray-700" href="#">
                        Solutions
                      </a>
                    </li>
                    <li className="mb-12">
                      <a className="font-medium hover:text-gray-700" href="#">
                        Resources
                      </a>
                    </li>
                    <li>
                      <a className="font-medium hover:text-gray-700" href="#">
                        Pricing
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col justify-end w-full pb-8">
                  <div className="flex flex-wrap">
                    <div className="w-full">
                      <div className="block">
                        <button
                          className="py-3 px-5 w-full text-white font-semibold border border-indigo-700 rounded-xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200"
                          type="button"
                        >
                          Try 14 Days Free Trial
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
        <div className="overflow-hidden pt-16">
          <div className="container px-4 mx-auto">
            <div className="flex flex-wrap -m-8">
              <div className="p-8">
                <p className="mb-6 text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold font-heading  lg:leading-[6.5rem]">
                  UPSC Maths Optional Previous Year Questions
                </p>

                <p className="mb-11 text-xl text-gray-900 font-medium  ">
                  Easily <b>find and filter</b> through PYQs of UPSC Maths
                  Optional
                </p>
                <div className="flex flex-wrap -m-2.5 mb-20">
                  <div className="w-full md:w-auto p-2.5">
                    <div className="block">
                      <button
                        onClick={handleClick}
                        className="py-4 px-6 w-full text-white font-semibold border border-indigo-700 rounded-xl focus:ring focus:ring-indigo-300 bg-black transition ease-in-out duration-200"
                        type="button"
                      >
                        Search Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div ref={ref} id="search">
            <form className="flex justify-center  items-center mt-[4rem] ">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>

              <div className="relative w-3/5 ">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="search-bar"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-4    "
                  placeholder="Search"
                />
              </div>
              <button
                type="button"
                
                id="search-btn"
                className="p-4 ml-2 text-sm font-medium text-white bg-gray-800  rounded-lg border  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
              <button
                onClick={toggleSectionVisibility}
                type="button"
                id="filter-btn"
                className="p-4 ml-2 text-sm font-medium text-white bg-gray-800  rounded-lg border  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </form>
            {/* <div className="flex justify-center  items-center mt-[1rem] ">
              <div className="relative w-3/5 ">
                <input
                  type="text"
                  id="search-bar"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-5 p-4    "
                  placeholder="Selected Filters:"
                />
              </div>
            </div> */}
          </div>

          {
            <section
              className="w-full max-w-6xl mx-auto px-4 m-4    border-2 bg-[#F9FAFB] "
              style={{ display: isSectionVisible ? "block" : "none" }}
            >
              <div className="grid grid-flow-col  gap-5  m-6 filter-box">
                <div
                  id="years-box"
                  className=" p-4 border-2 rounded-2xl   bg-[#D9D9D9] filter-part "
                >
                  <h1 className="text-3xl text-center filter-title">Year</h1>

                  <div className="grid grid-rows-6 grid-flow-col gap-4 mt-4 ">
                    {years.map((year) => (
                      <button
                        key={year}
                        onClick={() => handleYearSelect(year)}
                        className="bg-[#EAEAEA] filter-tags year-filter hover:bg-indigo-300 text-black font-bold py-2 px-6 rounded-full  "
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-rows-6 grid-flow-col gap-4 mt-4 ">
                    <button
                      onClick={() => handleSelectAllYears()}
                      className="bg-[#EAEAEA] filter-tags year-filter hover:bg-indigo-300 text-black font-bold py-2 px-6 rounded-full  "
                    >
                      ALL YEARS
                    </button>
                  </div>
                </div>
                <aside
                  id="papers-box"
                  className="filter-part md:pt-0 p-2 border-2 rounded-2xl bg-[#D9D9D9] "
                >
                  <h1 className="text-3xl m-4 text-center filter-title">
                    Topic
                  </h1>

                  <div className="grid grid-rows-5 grid-flow-col gap-3 m-6">
                    <button
                      className="bg-[#EAEAEA] hover:bg-indigo-300 text-black font-bold py-2 px-6 rounded-full paper-tags"
                      onClick={handleCALButtonClick}
                    >
                      Calculus
                    </button>
                    <button
                      className="bg-[#EAEAEA] hover:bg-indigo-300 text-black font-bold py-2 px-6 rounded-full  paper-tags"
                      onClick={handleLAButtonClick}
                    >
                      Linear Algebra
                    </button>
                    <button
                      className="bg-[#EAEAEA] hover:bg-indigo-300 text-black font-bold py-2 px-6 rounded-full  paper-tags"
                      onClick={handleAGButtonClick}
                    >
                      Analytical Geometry
                    </button>
                    <button
                      className="bg-[#EAEAEA] hover:bg-indigo-300 text-black font-bold py-2 px-6 rounded-full paper-tags"
                      onClick={handleODEButtonClick}
                    >
                      Ordinary Differential Equations
                    </button>
                    <button
                      className="bg-[#EAEAEA] hover:bg-indigo-300 text-black font-bold py-2 px-6 rounded-full paper-tags"
                      onClick={handleSdButtonClick}
                    >
                      Static & Dynamics
                    </button>

                    <button
                      className="bg-[#EAEAEA] hover:bg-indigo-300 text-black font-bold py-2 px-6 rounded-[15px]  disabled:opacity-25 cursor-not-allowed focus:outline-none"
                      onClick={handleSdButtonClick}
                    >
                      Vector Analysis
                    </button>
                    <button
                      className="bg-[#EAEAEA] hover:bg-indigo-300 text-black font-bold py-2 px-6  rounded-[15px]  cursor-not-allowed  "
                      onClick={handleSdButtonClick}
                    >
                      Algebra
                    </button>
                    <button
                      className="bg-[#EAEAEA] hover:bg-indigo-300 text-black font-bold py-2 px-6  rounded-[15px]  cursor-not-allowed "
                      onClick={handleSdButtonClick}
                    >
                      Real Analysis
                    </button>
                    <button
                      className="bg-[#EAEAEA] hover:bg-indigo-300 text-black font-bold py-2 px-6  rounded-[15px]  cursor-not-allowed "
                      onClick={handleSdButtonClick}
                    >
                      Complex Analysis
                    </button>
                    <button
                      className="bg-[#EAEAEA] hover:bg-indigo-300 text-black font-bold py-2 px-6  rounded-[15px] cursor-not-allowed  "
                      onClick={handleSdButtonClick}
                    >
                      Linear Programming
                    </button>
                    <button
                      className="bg-[#EAEAEA] hover:bg-indigo-300 text-black font-bold py-2 px-6 rounded-[15px] cursor-not-allowed  "
                      onClick={handleSdButtonClick}
                    >
                      Partial D.E.
                    </button>
                    <button
                      className="bg-[#EAEAEA] hover:bg-indigo-300 text-black font-bold py-2 px-6 rounded-[15px] cursor-not-allowed  "
                      onClick={handleSdButtonClick}
                    >
                      Numerical Analysis
                    </button>
                    <button
                      className="bg-[#EAEAEA] hover:bg-indigo-300 text-black font-bold py-2 px-6 rounded-[15px] cursor-not-allowed  "
                      onClick={handleSdButtonClick}
                    >
                      Comp. Programming
                    </button>
                    <button
                      className="bg-[#EAEAEA] hover:bg-indigo-300 text-black font-bold py-2 px-6 rounded-[15px]  cursor-not-allowed "
                      onClick={handleSdButtonClick}
                    >
                      Mechanics
                    </button>
                    <button
                      className="bg-[#EAEAEA] hover:bg-indigo-300 text-black font-bold py-2 px-6 rounded-[15px]  cursor-not-allowed "
                      onClick={handleSdButtonClick}
                    >
                      Fluid Dynamics
                    </button>
                  </div>
                </aside>
              </div>
            </section>
          }
          {showModal && (
            <div
              className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-gray-100"
              onClick={() => setShowModal(false)}
            >
              <div
                className="bg-white p-8 rounded-lg shadow-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold">How to use</h3>
                <div className="flex flex-wrap justify-center items-center -m-1 mt-[1rem]">
                  <div className="w-auto p-1">
                    <svg
                      className="w-12 h-12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                      />
                    </svg>
                  </div>
                  <div className="w-auto p-1">
                    <span>Use this button to apply filter</span>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center items-center  mt-[1rem]">
                  <div className="w-auto p-1">
                    <svg
                      className="w-12 h-12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <div className="w-auto p-1">
                    <span>Use this button to Search</span>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center items-center  mt-[1rem]">
                  <div className="w-auto p-1">
                    <span>Click Search to display all questions.</span>
                  </div>
                </div>
                <button
                  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
          <div>
            {odeData && renderData(odeData)}

            {sdData && renderData(sdData)}
            {agData && renderData(agData)}
            {calData && renderData(calData)}
            {laData && renderData(laData)}
          </div>
        </div>
      </section>

      <footer className=" py-4  w-full">
        <div className="container mx-auto flex justify-between">
          <div>&copy; 2023 Lemon™. All Rights Reserved</div>

          <div>Developed with ❤️ by Aditya K.</div>
        </div>
      </footer>
    </>
  );
};

export default Home;
