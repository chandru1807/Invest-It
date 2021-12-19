import useSWR from "swr";
import Navbar from "./NavBar";
import Footer from "./Footer";
import { ReactElement } from "react";

export default function Layout({ children }: { children: ReactElement }) {
  //   const { data, error } = useSWR('/api/navigation', fetcher)

  //   if (error) return <div>Failed to load</div>
  //   if (!data) return <div>Loading...</div>

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
