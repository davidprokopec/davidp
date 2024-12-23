import * as React from 'react'
import { AuthSection } from './auth-section'
import { Link } from '@tanstack/react-router'

export function Header() {
  return (
    <header className="bg-white shadow-sm dark:bg-gray-900 dark:text-white">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center h-16">
        <Link href="/" className="text-xl font-semibold">
          DavidP
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/"
              activeProps={{
                className: 'font-bold',
              }}
              activeOptions={{ exact: true }}
              className="hover:text-gray-600"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/"
              activeProps={{
                className: 'font-bold',
              }}
              activeOptions={{ exact: true }}
              className="hover:text-gray-600"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/"
              activeProps={{
                className: 'font-bold',
              }}
              activeOptions={{ exact: true }}
              className="hover:text-gray-600"
            >
              Blog
            </Link>
          </li>
        </ul>
        <AuthSection />
      </nav>
    </header>
  )
}
