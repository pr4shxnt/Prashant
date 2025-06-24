import React from "react";

const BlogHomePage = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-bl from-sand to-white">
      <div className="blob-homepage blob-top-left z-0" />
      <div className="blob-homepage blob-bottom-right z-0" />

      <div className="relative z-10 min-h-screen flex flex-col md:flex-row items-center md:justify-between justify-center w-[90%] mx-auto container">
        <div className="backdrop-blur-md w-full bg-white/10 p-10 rounded-3xl  text-start">
          <h1 className="text-3xl md:text-7xl text-start font-bold text-charcoal">
            Research Hub
          </h1>
          <p className="text-2xl font-light mt-3 md:pr-20">
            Get ready to dive into the innovative research journey of Prashant Adhikari. 
          </p>
          <div className="flex justify- gap-3 mt-10">
            <button className="bg-purple-500 py-3 px-6 text-white font-semibold rounded-md hover:bg-green-500/40 transition-all duration-500 w-max">Start Reading</button>
            <button className="bg-beige p-3 md:px-10 text-charcoal font-semibold rounded-md hover:bg-beige/40 transition-all duration-500 w-max">Writer</button>
          </div>
        </div>
        <div className="w-[80%]">
            <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2d1MXpoa2xqYXg1cHE5MjQ0NmVlcGZma3licHc0aTF1MWt3am41eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/zQMLejiEVUX4cqGRP7/giphy.gif" alt="" className="w-full rounded-2xl shadow-2xl" />
        </div>
      </div>
    </div>
  );
};

export default BlogHomePage;
