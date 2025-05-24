import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSkills } from '../Features/Skills/skillsSlice';

const MarqueeComp = () => {
  const dispatch = useDispatch();
  const { skills, loading, error } = useSelector((state) => state.skills);
  const [initialLoad, setInitialLoad] = useState(true);

useEffect(() => {
  dispatch(fetchAllSkills()).finally(() => {
    setInitialLoad(false);
  });
}, [dispatch]);

  

  return (
    <div className='text-white mx-auto pt-5'>
      <h1 className="text-lg text-center uppercase font-bold tracking-widest pb-3">
        Learnt <span className="text-lg uppercase font-bold tracking-widest text-[#5E4C2C]">Technologies</span>
      </h1>

      {loading || initialLoad ? (
        <p className="text-center">Loading skills...</p>
      ) : (
        <Marquee direction="right" pauseOnHover={true}>
          <div className="flex gap-8 text-3xl mx-5 overflow-hidden">
            {skills?.Skills?.map((item) => (
              <div key={item._id} className="flex items-center gap-2 rounded-lg">
                <img src={item.image} alt={item.name} className="w-8 h-8 rounded-md" />
                <h1 className="text-sm tracking-wider">{item.name}</h1>
              </div>
            ))}
          </div>
        </Marquee>
      )}
    </div>
  );
};

export default MarqueeComp;
