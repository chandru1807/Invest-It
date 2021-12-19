import Link from "next/link";
import { useState } from "react";
import { RiMenu5Line } from "react-icons/ri";
import { GiReceiveMoney } from "react-icons/gi";

const NavBar = () => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <>
      <nav className="flex items-center flex-wrap bg-green-400 p-3 w-full">
        <Link href="/">
          <a className="inline-flex items-center p-2 mr-4 ">
            <GiReceiveMoney className="h-9 w-9 text-white mr-1"></GiReceiveMoney>
            <span className="text-xl text-white font-bold font-mono uppercase tracking-wide mt-3">
              Invest-It
            </span>
          </a>
        </Link>
        <button
          className="inline-flex p-3 hover:bg-green-600 rounded lg:hidden text-white ml-auto hover:text-white outline-none"
          onClick={handleClick}
        >
          <RiMenu5Line className="h-5 w-5 text-white"></RiMenu5Line>
        </button>
        {/*Note that in this div we will use a ternary operator to decide whether or not to display the content of the div  */}
        <div
          className={`${
            active ? "" : "hidden"
          }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
        >
          <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto">
            <Link href="/mutualfunds">
              <a className="navbar-link">Mutual Funds</a>
            </Link>
            <Link href="/">
              <a className="navbar-link">Stocks</a>
            </Link>
            <Link href="/">
              <a className="navbar-link">Cryptos</a>
            </Link>
            <Link href="/">
              <a className="navbar-link">Login/Signup</a>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
