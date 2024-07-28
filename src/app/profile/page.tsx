'use client';
import UserRegForm from '@/components/UserRegForm'
import { useRouter } from 'next/navigation';
import React from 'react'

const page = () => {
  const router = useRouter();
  return (
    <div className='flex flex-col h-[100vh] items-center gap-10 justify-center mx-auto  w-full'>
      <div className="flex flex-row items-center w-full mx-auto gap-3 justify-center">
        <h1 className="w-full text-center font-hollirood text-3xl font-semibold tracking-wider text-regalia">
         Profile
        </h1>
        <button onClick={()=>{
          router.push('/bill')
        }} className="bg-sky-500 text-white px-4 py-1 rounded-lg">Bill</button>
        <button onClick={()=>{
          router.push('/')
        }} className="bg-sky-500 text-white px-4 py-1 rounded-lg">Home</button>
        </div>
      <UserRegForm />
    </div>
  )
}

export default page
