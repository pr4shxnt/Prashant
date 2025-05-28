import React, { useState, useEffect } from "react";
import AccomplishmentData from "../Accomplishments/Data";

const Accomplishments = () => {


  return (
    <div className="w-[85%] container mx-auto pt-12">
       <div className="flex items-end justify-end gap-4 pb-5">
            <span className="text-gray-300/80  text-sm">
              Show in CV
            </span>
          </div>
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pt-2">
      {AccomplishmentData.map((item, i) => {
  return (
    <div key={i}>
      <div title={item.description} className="text-gray-300 bg-gray-800 rounded-lg shadow-lg p-6 flex items-center justify-center h-full hover:scale-105 transition-transform duration-300">
        <div className="flex flex-col items-center">
          <span className=" text-[#dc964c]">{item.icon}</span>
          <span className="text-3xl font-bold pt-4">
            {item.count}
          </span>
          <h1 className=" text-gray-500">{item.name}</h1>
        </div>
      </div>
    </div>
  );
})}

    </div>
    </div>
  );
};

export default Accomplishments;
