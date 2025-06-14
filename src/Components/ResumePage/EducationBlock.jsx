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
              className="flex  w-full shadow-2xl shadow-charcoal text-charcoal px-4 md:px-7 bg-white  gap-6 py-7 rounded-2xl   transition-all duration-300"
            >
              <div className="bg-brown h-max p-2 rounded-xl hidden md:block">
                <University size={35} color="wheat" />
              </div>
              <div className="w-full">
                <div className="flex w-full justify-between mb-2">
                  <div className="w-full">
                    <div className="flex justify-between w-full">
                      <h1 className="md:text-xl text-lg w-[60%] font-semibold">
                        <span className="">{education.Level} in </span>
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
                      <p className="font-semibold md:text-lg text-sm mt-1">
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

                <div className="flex flex-col  w-full items-end text-xs text-brown gap-1">
                  <a
                    href={`mailto:info@${education.Wesbite}`}
                    className="hover:underline hover:text-purple-500 flex gap-2 items-center"
                  >
                    <Mail size={14} /> {`info@${education.Website}`}
                  </a>
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
