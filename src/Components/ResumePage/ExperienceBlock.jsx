import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllExperience } from "../../Features/Personals/experienceSlice";
import LoadingPage from "../../Utils/loadingpage";
import { Circle, Mail, Phone, ChevronDown, Laptop } from "lucide-react";

const ExperienceBlock = () => {
  const dispatch = useDispatch();
  const [initialLoad, setInitialLoad] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    dispatch(fetchAllExperience());
  }, [dispatch]);

  const { experiences, loading } = useSelector((state) => state.experience);

  useEffect(() => {
    setInitialLoad(loading === undefined || loading === true);
  }, [loading]);

  const toggleExpand = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  if (initialLoad) return <LoadingPage />;

  return (
    <div>
      <h1 className="p-4 mt-12 md:mt-10">Experiences</h1>
      {experiences.map((experience, index) => {
        const isExpanded = expandedIndex === index;

        return (
          <div className="flex w-full my-3  text-charcoal px-7  gap-6 py-7 rounded-2xl bg-white shadow-2xl shadow-black  transition-all duration-300">
            <div className="bg-brown h-max p-2 rounded-xl hidden md:block">
              <Laptop size={35} color="wheat" />
            </div>
            <div key={index} className="">
              <div className="flex justify-between mb-2">
                <div>
                  <h1 className="text-xl font-semibold">{experience.role}</h1>
                  <div className="flex flex-col md:flex-row md:gap-2 md:items-center text-bronze">
                    <p className="font-semibold mt-1">
                      <a
                        href={experience.companySite}
                        className="hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {experience.company}
                      </a>
                    </p>
                    <p className="hidden md:flex text-bronze/60 gap-2 items-center">
                      <Circle size={5} fill="black" />{" "}
                      {experience.companyAddress}
                    </p>
                  </div>
                </div>

                <p>
                  <span className="text-sm md:text-lg">
                    {new Date(experience.startingDate).toLocaleString(
                      "default",
                      {
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </span>{" "}
                  -{" "}
                  <span className="md:ml-1 text-sm md:text-lg">
                    {new Date(experience.endDate).toLocaleString("default", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </p>
              </div>

              <h1 className="text-sm">{experience.description}</h1>

              <div className="flex justify-end">
                <button
                  className=" flex text-sm items-center gap-1 text-brown font-semibold transition-colors duration-200 self-start mt-2"
                  onClick={() => toggleExpand(index)}
                >
                  {isExpanded ? "Hide Additional Data" : "Show Additional Data"}
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isExpanded ? "max-h-40 mt-2" : "max-h-0"
                }`}
              >
                <div className="flex flex-col  w-full items-end text-xs text-brown gap-1">
                  <a
                    href={`mailto:${experience.companyEmail}`}
                    className="hover:underline hover:text-purple-500 flex gap-2 items-center"
                  >
                    <Mail size={14} /> {experience.companyEmail}
                  </a>
                  <p className="hover:underline flex gap-2 items-center">
                    <Phone size={14} /> {experience.companyPhone}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ExperienceBlock;
