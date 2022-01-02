import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { GetServerSideProps, GetServerSidePropsResult, NextPage } from "next";
import { HomeProps } from "../types/props";
import { useSession, signIn, signOut } from "next-auth/react";

const Home: React.FC<HomeProps> = ({ schemesProps, error }: HomeProps) => {
  //console.log(schemesProps)
  // if (error) {
  //   return <div className="font-bold">Some error occuredd</div>;
  // }
  // return <div className="font-bold">{JSON.stringify(schemesProps)}</div>;
  const { data: session } = useSession();
  return (
    <>
      <div className="md:w-4/5 md:mx-auto my-32">
        <div className="h-[70vh] lg:h-[90vh] bg-[url('/banner.png')] bg-no-repeat bg-contain bg-bottom">
          <h1 className="w-3/4 lg:w-2/4 m-auto text-4xl lg:text-5xl text-center font-mono font-extrabold">
            Build your wealth,{" "}
            <span className="text-purple-700">consistently</span>
          </h1>
          {session ? (
            <>
              <div className="w-3/4 lg:w-1/4 m-auto text-center mt-10 font-light font-serif text-lg">
                Welcome back, {session.user?.name}
              </div>
              <div className="w-full lg:w-2/4 m-auto text-center mt-5 flex justify-around">
                <button className="bg-indigo-200 hover:bg-indigo-500 hover:text-white text-indigo-500 text-center py-2 px-8 rounded shadow-md">
                  Watchlist
                </button>
                <button className="bg-gray-200 hover:bg-gray-500 hover:text-white text-gray-500 text-center py-2 px-8 rounded shadow-md">
                  Compare
                </button>
              </div>
            </>
          ) : (
            <div className="w-3/4 lg:w-1/4 m-auto text-center mt-24 flex justify-around">
              <button className="bg-indigo-200 hover:bg-indigo-500 hover:text-white text-indigo-500 text-center py-2 px-8 rounded shadow-md">
                Log In
              </button>
              <button className="bg-gray-200 hover:bg-gray-500 hover:text-white text-gray-500 text-center py-2 px-8 rounded shadow-md">
                Sign Up
              </button>
            </div>
          )}
        </div>
        <div></div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    const schemesData = await axios.get(
      "http://localhost:8080/schemes/getSchemesByType/Equity?limit=10&offset=1"
    );
    console.log("props", schemesData.data);
    return {
      props: {
        schemesProps: schemesData.data,
      },
    };
  } catch (e) {
    return {
      props: {
        error: "Some error occurred",
      },
    };
  }
};

export default Home;
