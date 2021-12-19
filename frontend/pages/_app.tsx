import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <>
        <Head>
          <title>Invest-It</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </>
    </Layout>
  );
}
export default MyApp;
