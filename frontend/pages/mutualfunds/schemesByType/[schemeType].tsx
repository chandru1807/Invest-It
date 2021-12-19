import axios from "axios";
import { GetServerSideProps } from "next";
import Link from "next/link";
import {
  initialLimit,
  initialOffset,
  mutualFundSchemesBytypeUrl,
} from "../../../configs/constants";
import { FundTypesPageProps } from "../../../types/props";
import { useState } from "react";

const FundType: React.FC<FundTypesPageProps> = ({
  schemes,
  schemeId,
  hasMore,
  error,
}) => {
  if (error) {
    return (
      <>
        <div>{error}</div>
      </>
    );
  }
  const [fnOffset, setfnOffset] = useState(schemes?.length ?? 0);
  const [schemesList, setschemesList] = useState(schemes ?? []);
  const [hasMoreSchemes, sethasMoreSchemes] = useState(hasMore);
  const loadMoreSchemes = async () => {
    try {
      console.log("fnOffset", fnOffset);

      const moreSchemes = await axios.get(
        mutualFundSchemesBytypeUrl +
          `/${schemeId}?limit=${initialLimit}&offset=${fnOffset}`
      );
      sethasMoreSchemes(moreSchemes.data?.length > initialLimit);
      setschemesList([
        ...schemesList,
        ...moreSchemes.data.slice(0, initialLimit),
      ]);
      setfnOffset(fnOffset + initialLimit);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      {schemesList?.map((scheme) => (
        <div
          className="flex justify-evenly bg-gray-50 flex-col md:flex-row shadow-md w-2/3 m-auto mt-6 p-4 rounded-md"
          key={scheme.id}
        >
          <div className="flex md:w-2/4 flex-col">
            <Link href="/">
              <a className="text-blue-400">{scheme.name}</a>
            </Link>
            <div className="flex mt-2">
              <Link href="/">
                <a className="rounded-full bg-indigo-500 text-red-50 py-1 px-2 text-xs font-bold ml-1">
                  {scheme?.mfTypes?.fundType}
                </a>
              </Link>
              <Link href="/">
                <a className="rounded-full bg-indigo-500 text-red-50 py-1 px-3 text-xs font-bold ml-1">
                  {scheme?.mfSubTypes?.fundSubtype}
                </a>
              </Link>
            </div>
          </div>
          <div className="flex md:w-2/4 justify-evenly">
            <div className="flex flex-col justify-between">
              <p className="text-gray-500 font-semibold">1Y return</p>
              <div className="text-center">
                {scheme?.returns?.year_1
                  ? parseFloat(scheme?.returns?.year_1).toFixed(2) + "%"
                  : "-"}
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <p className="text-gray-500 font-semibold">3Y return</p>
              <div className="text-center">
                {scheme?.returns?.year_3
                  ? parseFloat(scheme?.returns?.year_3).toFixed(2) + "%"
                  : "-"}
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <p className="text-gray-500 font-semibold">5Y return</p>
              <div className="text-center">
                {scheme?.returns?.year_5
                  ? parseFloat(scheme?.returns?.year_5).toFixed(2) + "%"
                  : "-"}
              </div>
            </div>
          </div>
        </div>
      ))}
      {hasMoreSchemes ? (
        <div className="flex">
          <button
            onClick={loadMoreSchemes}
            className="bg-green-500 p-2 mt-8 m-auto rounded-md text-white"
          >
            Load more
          </button>
        </div>
      ) : null}
    </>
  );
};

export const getServerSideProps: GetServerSideProps<FundTypesPageProps> =
  async ({ params }) => {
    try {
      const id = params!.schemeType as string;
      const schemesData = await axios.get(
        mutualFundSchemesBytypeUrl +
          `/${id}?limit=${initialLimit}&offset=${initialOffset}`
      );
      let hasMore: boolean = false;
      hasMore = schemesData?.data?.length > initialLimit;
      return {
        props: {
          schemes: schemesData.data?.slice(0, initialLimit),
          schemeId: id,
          hasMore,
        },
      };
    } catch (e) {
      return {
        props: {
          error: "Some error occurred while fetching schemes",
        },
      };
    }
  };

export default FundType;
