import Link from 'next/link'

export default function NotFound() {
  return (
    <main>
      <div className="text-center w-full">
          <h1 className="font-semibold text-2xl">Page Not Found</h1>
          <Link href="/">Go back to Home</Link>
      </div>
    </main>
  )
}