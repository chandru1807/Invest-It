import Link from "next/link";
import { useEffect, useState } from "react";
import { RiMenu5Line } from "react-icons/ri";
import { GiReceiveMoney } from "react-icons/gi";
import { useSession, signIn, signOut } from "next-auth/react";

const NavBar = () => {
  const [active, setActive] = useState(false);
  const navBarClasses =
    "fixed flex items-center flex-wrap bg-green-400 p-3 w-full";

  const handleClick = () => {
    setActive(!active);
  };
  const { data: session } = useSession();
  if (session) {
    console.log("LOGGED IN");
  } else {
    console.log("NOT LOGGED IN");
  }

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.onscroll = function () {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
  }, []);

  return (
    <>
      <nav className={scrolled ? navBarClasses + " shadow-lg" : navBarClasses}>
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
            {session ? (
              <button className="navbar-link" onClick={() => signOut()}>
                Logout
              </button>
            ) : (
              <button className="navbar-link" onClick={() => signIn()}>
                Log In/Sign Up
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
