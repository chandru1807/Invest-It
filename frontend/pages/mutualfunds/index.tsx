import { GetStaticProps } from "next";
import { MutualFundsLandingProps } from "../../types/props";
import axios from "axios";
import { mutualFundTypesWithSubtypesUrl } from "../../configs/constants";
import { useState } from "react";
import Link from "next/link";
import Tabs from "../../components/Tabs";

const MutualFundsLanding: React.FC<MutualFundsLandingProps> = ({
  mutualFundTypesWithSubtypes: { fundTypes, fundSubTypes } = {
    fundTypes: [],
    fundSubTypes: [],
  },
  error,
}: MutualFundsLandingProps) => {
  if (error) {
    return (
      <>
        <div>{error}</div>
      </>
    );
  }
  const fundTabs = fundTypes?.map((types) => {
    return {
      id: types.id,
      name: types.fundType,
    };
  });

  console.log("fundtabs ", fundTabs);

  //const [activeTab, setactiveTab] = useState(0);
  const [subTypesToShow, setsubTypesToShow] = useState(
    fundSubTypes.filter(
      (subTypes) => parseInt(subTypes.fundTypeId) === fundTypes[0].id //here
    )
  );

  const filterSubTabs = (activeIndex: number) => {
    setsubTypesToShow(
      fundSubTypes.filter(
        (subTypes) =>
          parseInt(subTypes.fundTypeId) === fundTypes[activeIndex].id //here
      )
    );
  };
  return (
    <>
      <div className="md:w-4/5 md:mx-auto my-32">
        <div className="font-serif text-xl font-bold p-4">
          Invest in Mutual Funds
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="text-gray-600 text-sm px-4">
            Mutual Fund is an investment product. It is started and managed by a
            Mutual Fund company that pools money from various investors and
            invests it in various asset classes like equities, bonds, money
            market instruments, and Gold.
          </div>
          <div className="mt-2 md:mt-0 text-gray-600 text-sm px-4">
            A Mutual Fund is run by a professional money manager. This
            professional, called a Fund Manager, takes all investment decisions,
            including when and where to invest and when to exit a holding. The
            goal of the Fund Manager is to generate the best returns possible
            for the risk he is taking.
          </div>
        </div>
        <div className="font-serif text-xl font-bold text-center p-4 mt-2">
          Browse Mutual Funds by category
        </div>
        <Tabs tabs={fundTabs} onTabChange={filterSubTabs}>
          <div className="flex flex-wrap py-4 m-auto justify-evenly">
            {subTypesToShow.map((subTypes) => (
              <Link
                href={`/mutualfunds/schemesBySubtype/${subTypes.id}`}
                key={subTypes.id}
              >
                <a
                  title={subTypes.fundSubtype}
                  className="w-2/4 md:w-2/5 my-2 shadow-md rounded-full bg-indigo-500 text-red-50 py-3 text-xs font-bold  truncate text-center"
                >
                  {subTypes.fundSubtype}
                </a>
              </Link>
            ))}
          </div>
        </Tabs>
        {/* <div className="flex p-4 m-auto justify-around flex-col md:flex-row md:w-2/4">
          {fundTypes!.map((mfTypes, index) => (
            <button
              onClick={() => {
                setactiveTab(index);
                setsubTypesToShow(
                  fundSubTypes.filter(
                    (subTypes) =>
                      parseInt(subTypes.fundTypeId) === fundTypes[index].id //here
                  )
                );
              }}
              className={`p-4 w-auto ${
                index === activeTab
                  ? "border-b-2 border-blue-400 text-blue-400"
                  : "hover:text-gray-500"
              }`}
              key={mfTypes.id}
            >
              {mfTypes.fundType}
            </button>
          ))}
        </div> */}
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<MutualFundsLandingProps> =
  async () => {
    try {
      const mutualFundTypesResult = await axios.get(
        mutualFundTypesWithSubtypesUrl
      );
      return {
        props: {
          mutualFundTypesWithSubtypes: mutualFundTypesResult.data,
        },
      };
    } catch (e) {
      return {
        props: {
          error: "Error occurred while fetching fund types",
        },
      };
    }
  };

export default MutualFundsLanding;
