import { Star } from "lucide-react";
import React from "react";

const TestimonialCard = () => {
  return (
    <div className="">
        <div className="flex h-64">
               <img
            src="https://imgs.search.brave.com/fCLgor0Y9-feHP_ncqwL3iJ2shTuf2-OSNBzf8Fpaz0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzQ0LzQzLzY5/LzM2MF9GXzI0NDQz/NjkyM192a01lMTBL/S0tpdzViamhaZVJE/VDA1bW94V2NQcGRt/Yi5qcGc"
            alt=""
            className=""
          />
        
      <div className="p-3 ">
        <div className=" flex items-center gap-2">
       
          <div className="text-white flex flex-col justify-center">
            <h1 className="font-semibold text-lg ">Prashant Adhikari</h1>
            <div className="flex items-center ">
                {
                    Array.from({length:5}).map((_, i)=>{
                       return <Star size={12} stroke="yellow" fill="yellow"/>
                    })
                }
                <p className="text-xs ml-2">{new Date('2025-01-25T14:04:41.601+00:00').toISOString().split('T')[0]}</p>

            </div>
          </div>
        </div>
        <div className="">
            <p className="text-sm pt-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem magnam quia suscipit quos incidunt magni odio laboriosam nostrum velit quam dolor ut blanditiis, reprehenderit alias qui nulla, accusamus minus id deleniti sunt doloribus fugiat saepe. Cupiditate rerum, cumque non fugiat quasi, ullam, labore natus reiciendis nisi rem adipisci! Tempore, quia delectus nam aut corrupti maxime praesentium nihil dolorum. Iure, nam!</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
