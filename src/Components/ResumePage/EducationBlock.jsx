import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingPage from "../../Utils/loadingpage";
import {
  Circle,
  Mail,
  Phone,
  ChevronDown,
  Laptop,
  University,
} from "lucide-react";
import { fetchAllEducation } from "../../Features/Personals/educationSlice";

const EducationBlock = () => {
  const dispatch = useDispatch();
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    dispatch(fetchAllEducation());
  }, [dispatch]);

  const { educations, loading } = useSelector((state) => state.education);

  useEffect(() => {
    setInitialLoad(loading === undefined || loading === true);
  }, [loading]);

  if (initialLoad) return <LoadingPage />;

  return (
    <div>
      <h1 className="p-4 mt-12 md:mt-10">Education</h1>
      <div className="grid grid-cols-1 gap-5">
        {educations.map((education, index) => {
          return (
            <div
              key={index}
              className="flex items-center w-full shadow-2xl shadow-charcoal text-charcoal px-4 md:px-7 bg-white  gap-6 py-7 rounded-2xl   transition-all duration-300"
            >
             
              <div className="w-full">
                <div className="flex px-5 w-full justify-between mb-2">
                  <div className="w-full">
                    <div className="flex justify-between w-full">
                      <h1 className="md:text-xl text-lg w-[60%] font-semibold">
                        <span className="">{education.Level} - </span>
                        {education.Field}
                      </h1>
                      <p className="w-[50%] text-end">
                        <span className="text-xs md:text-lg">
                          {new Date(education.From).toLocaleString("default", {
                            month: "short",
                            year: "numeric",
                          })}
                        </span>{" "}
                        -{" "}
                        <span className="md:ml-1 text-xs md:text-lg">
                          {new Date(education.To).toLocaleString("default", {
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </p>
                    </div>
                    <div className="flex flex-col md:flex-row md:gap-2 md:items-center text-bronze">
                      <p className="font-nunito md:text-[1rem]  text-sm mt-1">
                        <a
                          href={`https://www.${education.Website}`}
                          className="hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {education.Institution}
                        </a>
                      </p>
                      <p className="hidden md:flex text-bronze/60 gap-2 items-center">
                        | Grades: {education.Grade}
                      </p>
                    </div>
                  </div>
                </div>

               
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EducationBlock;
