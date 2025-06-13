import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllExperience } from "../../Features/Personals/experienceSlice";
import LoadingPage from "../../Utils/loadingpage";

const ExperienceBlock = () => {
  const dispatch = useDispatch();
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    dispatch(fetchAllExperience());
  }, [dispatch]);

  const { experiences, loading, error } = useSelector(
    (state) => state.experience
  );

  useEffect(() => {
    if (loading === undefined || loading === true) {
      setInitialLoad(true);
    } else {
      setInitialLoad(false);
    }
  }, [loading]);

  if (initialLoad) return <LoadingPage />;
  return (
    <>
      <div className="">
        {experiences.map((experience, index) => {
          return (
            <div key={index} className=" w-full bg-beige px-5 py-4">
              <div className="">
                <h1 className="">{experience.role}</h1>
                <div className="text-xs flex justify-between">
                <p className="">at {experience.company}</p>
                <p className="">
                  {" "}
                  <span className="">
                    {new Date(experience.startingDate).toLocaleString(
                      "default",
                      { month: "short", year: "numeric" }
                    )}
                  </span> -  
                  <span className="ml-1">
                    {new Date(experience.endDate).toLocaleString(
                      "default",
                      { month: "short", year: "numeric" }
                    )}
                  </span>
                </p>
                </div>
              </div>
              <h1 className="text-sm mt-4">
                {experience.description}
              </h1>

              <div className="">
                {experience.companyEmail}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ExperienceBlock;
