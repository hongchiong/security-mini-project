'use client';
import { signOut } from 'next-auth/react';

export default function SignOut() {
  return (
    <button
      className='text-stone-600 hover:text-stone-400 transition-all px-4 py-2 border m-2 rounded bg-slate-100'
      onClick={() => signOut()}>
      Logout!
    </button>
  );
}
