'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { FiPackage, FiUser, FiMapPin } from 'react-icons/fi'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status])

  if (status === 'loading') {
    return (
      <div className="section-padding">
        <div className="container-custom">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="h-32 bg-gray-200 rounded" />
              <div className="h-32 bg-gray-200 rounded" />
              <div className="h-32 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="section-padding">
      <div className="container-custom">
        <h1 className="text-4xl font-bold mb-8">
          Welcome, {session?.user?.name}!
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/dashboard/orders"
            className="card p-6 hover:shadow-lg transition-shadow"
          >
            <FiPackage size={40} className="mb-4" />
            <h2 className="text-xl font-bold mb-2">My Orders</h2>
            <p className="text-gray-600">View and track your orders</p>
          </Link>

          <Link
            href="/dashboard/profile"
            className="card p-6 hover:shadow-lg transition-shadow"
          >
            <FiUser size={40} className="mb-4" />
            <h2 className="text-xl font-bold mb-2">Profile</h2>
            <p className="text-gray-600">Manage your account details</p>
          </Link>

          <Link
            href="/dashboard/addresses"
            className="card p-6 hover:shadow-lg transition-shadow"
          >
            <FiMapPin size={40} className="mb-4" />
            <h2 className="text-xl font-bold mb-2">Addresses</h2>
            <p className="text-gray-600">Manage shipping addresses</p>
          </Link>
        </div>

        {session?.user?.role === 'ADMIN' && (
          <div className="mt-8 p-6 bg-black text-white rounded">
            <h2 className="text-2xl font-bold mb-4">Admin Access</h2>
            <p className="mb-4">You have administrator privileges.</p>
            <Link href="/admin" className="btn-secondary">
              Go to Admin Panel
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
