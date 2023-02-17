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

      default:
        dataSize = data.CALCULUS.length;
        filterdata = data.CALCULUS;
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
  papertags[0].classList.add("paper-tags-clicked");

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
      state: 1,
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
          item.state = 1;
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

            default:
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

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("upsc.json")
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
        console.log(jsonData);
      });
  }, []);

  return (
    <>
      <Head>
        <title>UPSC Maths PYQs</title>
        <meta
          name="description"
          content={`
          A ready-to-use starter template for building fast and modern web applications.
          Includes basic configurations and optimizations for
          optimal performance and development experience.
        `}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div></div>
      <section className="bg-blueGray-50">
        <div className="container mx-auto overflow-hidden">
          <div className="flex items-center justify-between px-4 py-5 bg-blueGray-50">
            <div className="w-auto">
              <div className="flex flex-wrap items-center">
                <div className="w-auto mr-14">
                  <a href="#">
                    <img src="flaro-assets/logos/flaro-logo-black.svg" alt="" />
                  </a>
                </div>
              </div>
            </div>
            <div className="w-auto">
              <div className="flex flex-wrap items-center">
                <div className="w-auto hidden lg:block">
                  <ul className="flex items-center mr-16">
                    <li className="mr-9 font-medium hover:text-gray-700">
                      <a href="#">Features</a>
                    </li>
                    <li className="mr-9 font-medium hover:text-gray-700">
                      <a href="#">Solutions</a>
                    </li>
                    <li className="mr-9 font-medium hover:text-gray-700">
                      <a href="#">Resources</a>
                    </li>
                    <li className="font-medium hover:text-gray-700">
                      <a href="#">Pricing</a>
                    </li>
                  </ul>
                </div>
                <div className="w-auto hidden lg:block">
                  <div className="inline-block">
                    <button
                      className="py-3 px-5 w-full text-white font-semibold border border-indigo-700 rounded-xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200"
                      type="button"
                    >
                      Try 14 Days Free Trial
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
              <div className="w-full md:w-1/2 p-8">
                <p className="mb-6 text-6xl md:text-8xl lg:text-10xl font-bold font-heading md:max-w-xl lg:leading-[6.5rem]">
                  Filter through UPSC Maths PYQs.
                </p>

                <p className="mb-11 text-lg text-gray-900 font-medium md:max-w-md  ">
                  Questions asked in UPSC Civil Service Examination | Mains -
                  Written
                </p>
                <div className="flex flex-wrap -m-2.5 mb-20">
                  <div className="w-full md:w-auto p-2.5">
                    <div className="block">
                      <button
                        onClick={handleClick}
                        className="py-4 px-6 w-full text-white font-semibold border border-indigo-700 rounded-xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200"
                        type="button"
                      >
                        Search Now
                      </button>
                    </div>
                  </div>
                  <div className="w-full md:w-auto p-2.5">
                    <div className="block">
                      <button
                        onClick={() => setShowModal(true)}
                        className="py-4 px-9 w-full font-semibold border border-gray-300 hover:border-gray-400 rounded-xl focus:ring focus:ring-gray-50 bg-transparent hover:bg-gray-100 transition ease-in-out duration-200"
                        type="button"
                      >
                        <div className="flex flex-wrap justify-center items-center -m-1">
                          <div className="w-auto p-1">
                            <svg
                              width={25}
                              height={25}
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search"
                />
              </div>
              <button
                type="button"
                id="search-btn"
                className="p-4 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                id="filter-btn"
                type="button"
                className="p-4 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
          </div>
          <div className="filter-box">
            <div id="years-box" className="filter-part text-lg">
              <div className="filter-title">Year</div>
              {[...Array(31).keys()].map((i) => (
                <div className="filter-tags year-filter" key={1990 + i}>
                  <p>{1990 + i}</p>
                </div>
              ))}
            </div>
            <div id="papers-box" className="filter-part text-lg">
              <div className="filter-title">Paper</div>
              <div className="paper-tags">
                <p>Calculus</p>
              </div>
              <div className="paper-tags">
                <p>Linear Algebra</p>
              </div>
              <div className="paper-tags">
                <p>Analytical Geometry</p>
              </div>

            </div>
          </div>
          <div id="questions-list" />
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

<footer class="p-4 bg-white shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
  <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
    © 2023 Lemon™. All Rights Reserved.
  </span>
  <div class="flex flex-wrap items-center justify-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
      <a target="_blank" href="https://www.meaditya.com" class="hover:underline" rel="noreferrer">Developed with ❤️ by Aditya K. ️</a>
  </div>
</footer>

        </div>
      </section>
    </>
  );
};

export default Home;
