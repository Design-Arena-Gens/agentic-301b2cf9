'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { FiPackage, FiShoppingBag, FiUsers, FiTag } from 'react-icons/fi'

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated' && session?.user?.role !== 'ADMIN') {
      router.push('/dashboard')
    }
  }, [status, session])

  if (status === 'loading' || session?.user?.role !== 'ADMIN') {
    return (
      <div className="section-padding">
        <div className="container-custom">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="h-32 bg-gray-200 rounded" />
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
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            href="/admin/products"
            className="card p-6 hover:shadow-lg transition-shadow"
          >
            <FiShoppingBag size={40} className="mb-4" />
            <h2 className="text-xl font-bold mb-2">Products</h2>
            <p className="text-gray-600">Manage products and inventory</p>
          </Link>

          <Link
            href="/admin/orders"
            className="card p-6 hover:shadow-lg transition-shadow"
          >
            <FiPackage size={40} className="mb-4" />
            <h2 className="text-xl font-bold mb-2">Orders</h2>
            <p className="text-gray-600">View and manage orders</p>
          </Link>

          <Link
            href="/admin/categories"
            className="card p-6 hover:shadow-lg transition-shadow"
          >
            <FiTag size={40} className="mb-4" />
            <h2 className="text-xl font-bold mb-2">Categories</h2>
            <p className="text-gray-600">Manage product categories</p>
          </Link>

          <Link
            href="/admin/users"
            className="card p-6 hover:shadow-lg transition-shadow"
          >
            <FiUsers size={40} className="mb-4" />
            <h2 className="text-xl font-bold mb-2">Users</h2>
            <p className="text-gray-600">Manage user accounts</p>
          </Link>
        </div>

        <div className="mt-8">
          <Link href="/dashboard" className="text-sm hover:underline">
            ← Back to User Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
