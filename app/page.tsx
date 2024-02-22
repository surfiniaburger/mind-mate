'use client';


import Link from 'next/link'
export default function Form() {
 
  return (
    <form>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="required-fields-message" aria-live="assertive">
        </div>

        <Link
          href="/dashboard"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Get Started
        </Link>
      </div>
    </form>
  );
}
