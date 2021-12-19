import { useState } from "react";
import { TabsProps } from "../types/props";

const Tabs = ({ tabs, children, onTabChange }: TabsProps) => {
  console.log("in tabs", tabs);
  const [activeTab, setactiveTab] = useState(0);
  return (
    <>
      <div className="flex flex-col p-4 m-auto md:w-2/4">
        <ul className="flex md:justify-center border-b overflow-x-auto overflow-y-hidden">
          {tabs.map((tab, index) => (
            <li
              key={tab.id}
              className={
                activeTab === index
                  ? "-mb-px mr-1 min-w-[40%] md:min-w-0"
                  : "mr-1 cursor-pointer min-w-[40%] md:min-w-0"
              }
            >
              <div
                className={
                  activeTab === index
                    ? "bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold text-sm w-full text-center"
                    : "bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold text-sm w-full text-center"
                }
                onClick={() => {
                  setactiveTab(index);
                  onTabChange(index);
                }}
              >
                {tab.name}
              </div>
            </li>
          ))}
        </ul>
        <div>{children}</div>
      </div>
    </>
  );
};

export default Tabs;
