'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Form() {
  return (
    <form>
      <div className="container mx-auto p-8 md:p-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Welcome to Mindmate</h1>
        <div className="flex justify-center">
          <Image src="/ful.png" alt={'Mindmate Logo'} width={450} height={450} />

        </div>
        <h3 className="text-lg md:text-xl text-gray-600 mt-4 mb-8">Your Personal Mental Health Companion</h3>
        <Link href="/dashboard" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition duration-300">

            Get Started

        </Link>
      </div>
    </form>
  );
}
