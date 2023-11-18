'use-client';
import { signOut } from 'next-auth/react';

export default function Home() {
  return (
    <div className='flex h-screen bg-black'>
      <div className='w-screen h-screen flex flex-col space-y-5 justify-center items-center'>
        <button
          className='text-stone-400 hover:text-stone-200 transition-all'
          onClick={() => signOut()}>
          Logout!
        </button>
      </div>
    </div>
  );
}
