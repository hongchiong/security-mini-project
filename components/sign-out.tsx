'use client';
import { signOut } from 'next-auth/react';

export default function SignOut() {
  return (
    <button
      className='text-stone-400 hover:text-stone-200 transition-all px-4 py-2 border'
      onClick={() => signOut()}>
      Logout!
    </button>
  );
}
