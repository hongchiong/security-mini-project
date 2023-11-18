import { useState } from 'react';
import LoadingDots from '@/components/loading-dots';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { unstable_getServerSession } from 'next-auth/next';

export default async function DetailsForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const session = await unstable_getServerSession();

  console.log(session);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);

        fetch('/api/details', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: session?.user?.email,
            phone: e.currentTarget.phone.value,
            country: e.currentTarget.country.value,
            gender: e.currentTarget.gender.value,
            qualification: e.currentTarget.qualification.value,
          }),
        }).then(async (res) => {
          setLoading(false);
          if (res.status === 200) {
            toast.success('Account updated!');
            setTimeout(() => {
              router.push('/');
            }, 2000);
          } else {
            const { error } = await res.json();
            toast.error(error);
          }
        });
      }}
      className='flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16'>
      <div>
        <label htmlFor='name' className='block text-xs text-gray-600 uppercase'>
          Name
        </label>
        <input
          id='name'
          name='name'
          type='text'
          placeholder='Andy'
          required
          className='mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm'
        />
      </div>
      <div>
        <label
          htmlFor='phone'
          className='block text-xs text-gray-600 uppercase'>
          Phone Number
        </label>
        <input
          id='phone'
          name='phone'
          type='text'
          placeholder='84576994'
          required
          className='mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm'
        />
      </div>
      <div>
        <label
          htmlFor='country'
          className='block text-xs text-gray-600 uppercase'>
          Country
        </label>
        <input
          id='country'
          name='country'
          type='text'
          placeholder='Singapore'
          required
          className='mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm'
        />
      </div>
      <div>
        <label
          htmlFor='gender'
          className='block text-xs text-gray-600 uppercase'>
          Gender
        </label>
        <input
          id='gender'
          name='gender'
          type='text'
          placeholder='Male'
          required
          className='mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm'
        />
      </div>
      <div>
        <label
          htmlFor='qualification'
          className='block text-xs text-gray-600 uppercase'>
          Qualification
        </label>
        <input
          id='qualification'
          name='qualification'
          type='text'
          placeholder="Bachelor's"
          required
          className='mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm'
        />
      </div>

      <button
        disabled={loading}
        className={`${
          loading
            ? 'cursor-not-allowed border-gray-200 bg-gray-100'
            : 'border-black bg-black text-white hover:bg-white hover:text-black'
        } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}>
        {loading ? <LoadingDots color='#808080' /> : <p>Submit</p>}
      </button>
    </form>
  );
}
