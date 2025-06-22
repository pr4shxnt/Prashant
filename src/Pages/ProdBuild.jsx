import React, { useEffect } from 'react'

const ProdBuild = () => {
  useEffect(() => {
    console.log(
      `%cDo not even try to change a single line through the console.
  Your efforts are useless; each and every route is secured and tested properly.
  Thank you for your concern.`,
      `color: red;
       font-size: 12px;
       font-family: monospace;
       white-space: pre-line;
       border-radius: 5px;`
    );
  
    console.log(
      `%c
  - Prashant Adhikari
  github: pr4shxnt
  instagram: pr4xnt
  x: pr4xnt`,
      `color: black;
       font-size: 12px;
       font-family: monospace;
       white-space: pre-line;
       border-radius: 5px;`
    );
  }, []);
  
    if (import.meta.env.MODE === 'production') {
 
  

  return (
    <>
      <title>Maintenance | Prashant Adhikari</title>
      <div className='fixed z-[2000] text-white flex flex-col items-center justify-center bg-black h-screen w-screen'>
        <h1 className='text-3xl text-center font-bold uppercase tracking-wide'>The website is under development phase.</h1>
        <p className='text-center'>Feel free to contact the developer of this website.</p>
        <div className=" social-links flex items-center z-[200] px-3 py-1">
          <a target='_blank' title='email' href="mailto:prashantadhikareeey.dev@gmail.com" className="">
            <img src="./email.png" alt="" className="w-6 m-2" />
          </a>
          <a target='_blank' title='whatsapp' href="https://wa.me/+9779742433049?text=Hello%20Prashant!" className="">
            <img src="./whatsapp.png" alt="" className="w-5 m-2" />
          </a>
          <a target='_blank' title='instagram' href="https://www.instagram.com/pr4xnt" className="">
            <img src="./instagram.png" alt="" className="w-8 m-1.5" />
          </a>
          <a target='_blank' title='github' href="https://www.github.com/pr4shxnt" className="">
            <img src="./github.png" alt="" className="w-6 m-2"/>
          </a>
        </div>
      </div>
    </>
  )
}}

export default ProdBuild