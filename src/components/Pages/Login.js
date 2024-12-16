import React from 'react'
import login from '../images/login.svg'

function Login() {
  return (
    <div className='container bg-[red] min-h-screen flex items-center justify-center'>
      {/* Center the form content in a column */}
      <div className='flex flex-col items-center w-full max-w-sm'>
        <h1 className='text-5xl font-semibold'>Log in to Sinch Dashboard</h1>
        <p className='text-3xl mt-4'>Enter your email to continue.</p>
        
        <input type='email' className="border p-2 mt-2 w-full" placeholder='Email address*'/>
        <input type="password" className="border p-2 mt-2 w-full" placeholder="Password*" />
        <span className='text-[#007874] cursor-pointer font-semibold block mt-2'>Forgot password?</span>
        <br />
        <button className='bg-[#ffdb5f] text-center py-2 px-4 font-bold m-2' type='submit'>Continue</button>
      </div>
    </div>
  )
}

export default Login
