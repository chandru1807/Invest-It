import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { GetServerSideProps, GetServerSidePropsResult, NextPage } from "next";
import { HomeProps } from "../types/props";

const Home: React.FC<HomeProps> = ({ schemesProps, error }: HomeProps) => {
  //console.log(schemesProps)
  if (error) {
    return <div className="font-bold">Some error occuredd</div>;
  }
  return <div className="font-bold">{JSON.stringify(schemesProps)}</div>;
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
