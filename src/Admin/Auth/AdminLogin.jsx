import { useState } from 'react';

const AdminLogin = () => {
  const [cred, setCred] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  }

  const getGreetings = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return 'Good Morning';
    } else if (currentHour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  }
   

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-b from-black to-gray-800 py-4 px-4">

      <div className="bg-gray-600 shadow-md rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold flex flex-col text-gray-400  mb-4 text-center"> <span className="">Administrator login</span></h2>

        <form onSubmit={handleLogin} className="space-y-2 pt-1">
          <input
            type="text"
            placeholder="Email or Username"
            value={cred}
            onChange={(e) => setCred(e.target.value)}
            className="w-full pl-3 bg-black/50 outline-none text-white rounded-full p-2"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-3 bg-black/50 outline-none text-white rounded-full p-2"
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full mt-3 bg-black text-white py-2 rounded-full cursor-pointer duration-300 hover:bg-gray-900"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
      <div className="text-white absolute bottom-0 left-0 w-full flex justify-between items-center px-3 pb-1 bg-gradient-to-t from-black to-transparent z-[2]">
        <h1 className='text-xs font-bold tracking-widest uppercase'><a href="/" className="">Prashant</a></h1>
         <div className="flex items-center justify-center ">

          <a target='_blank' title='email' href="mailto:prashantadhikareeey.dev@gmail.com" className="">
            <img src="/email.png" alt="" className="w-6 m-2" />
          </a>
          <a target='_blank' title='whatsapp' href="https://wa.me/+9779742433049?text=Hello%20Prashant!" className="">
            <img src="/whatsapp.png" alt="" className="w-5 m-2" />
          </a>
          <a target='_blank' title='instagram' href="https://www.instagram.com/pr4xnt" className="">
            <img src="/instagram.png" alt="" className="w-8 m-1.5" />
          </a>
          <a target='_blank' title='github' href="https://www.github.com/pr4shxnt" className="">
            <img src="/github.png" alt="" className="w-6 m-2"/>
          </a>
           </div>
      </div>
     
    </div>
  );
};

export default AdminLogin;
