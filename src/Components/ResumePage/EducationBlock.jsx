import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingPage from "../../Utils/loadingpage";
import { Mail, Phone, ChevronDown } from "lucide-react";
import { fetchAllEducation } from "../../Features/Personals/educationSlice";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
      <div className="grid grid-cols-1 edu-card-holder">
        {educations.map((education, index) => {
          return (
            <div
              key={index}
              className="flex education-card items-center w-full  text-charcoal  gap-6 py-5 my-1 hover:bg-gray-100 rounded-2xl   transition-all duration-300"
            >
             
              <div className="w-full">
                <div className="flex  px-5 gap-6 w-full justify-between mb-2">
                  <div className="">
                    <img src={education.Logo} alt="" className="h-16 w-20 md:w-18 rounded-2xl" />
                  </div>
                  <div className="w-full">
                    <div className="flex flex-col md:flex-row md:justify-between w-full">
                      <h1 className="md:text-xl text-lg md:w-[60%] font-semibold">
                        <span className="">{education.Level} - </span>
                        {education.Field}
                      </h1>
                      <p className="md:w-[50%] md:text-end">
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