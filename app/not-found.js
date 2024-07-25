import Header from '@/components/Header/Header'
import HeaderGutter from '@/components/Header/HeaderGutter'
import Link from 'next/link'

export default function NotFound() {
  return (
    <>
    <Header/>
    <HeaderGutter/>
      <main className="main-reveal">
        <div className="text-center w-full">
            <h1 className="font-semibold text-2xl">Page Not Found</h1>
            <Link href="/">Go back to Home</Link>
        </div>
      </main>
    </>
  )
}