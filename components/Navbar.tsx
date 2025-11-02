'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import { FiShoppingBag, FiUser, FiMenu, FiX } from 'react-icons/fi'

export function Navbar() {
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              FASHION
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/shop"
                className="text-sm font-medium hover:text-gray-600 transition-colors"
              >
                Shop
              </Link>
              <Link
                href="/shop?categoryId=men"
                className="text-sm font-medium hover:text-gray-600 transition-colors"
              >
                Men
              </Link>
              <Link
                href="/shop?categoryId=women"
                className="text-sm font-medium hover:text-gray-600 transition-colors"
              >
                Women
              </Link>
              <Link
                href="/shop?categoryId=shoes"
                className="text-sm font-medium hover:text-gray-600 transition-colors"
              >
                Shoes
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {session ? (
              <>
                <Link
                  href="/cart"
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FiShoppingBag size={20} />
                </Link>
                <div className="relative group">
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <FiUser size={20} />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/dashboard/orders"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Orders
                    </Link>
                    {session.user.role === 'ADMIN' && (
                      <Link
                        href="/admin"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => signOut()}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <Link
                href="/auth/signin"
                className="text-sm font-medium hover:text-gray-600 transition-colors"
              >
                Sign In
              </Link>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <Link
              href="/shop"
              className="block py-2 text-sm font-medium hover:text-gray-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/shop?categoryId=men"
              className="block py-2 text-sm font-medium hover:text-gray-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Men
            </Link>
            <Link
              href="/shop?categoryId=women"
              className="block py-2 text-sm font-medium hover:text-gray-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Women
            </Link>
            <Link
              href="/shop?categoryId=shoes"
              className="block py-2 text-sm font-medium hover:text-gray-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Shoes
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
