import * as React from 'react'
import { authClient } from '../../auth-client'
import { Link } from '@tanstack/react-router'

export function AuthSection() {
  const { data: session, isPending, error } = authClient.useSession()
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const signOut = () => {
    authClient.signOut()
  }

  if (session) {
    return (
      <div className="relative">
        <button onClick={toggleDropdown} className="flex items-center space-x-2">
          <span className="hidden md:inline">Account</span>
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
            <Link
              href="/account"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              Account Settings
            </Link>
            <button
              onClick={signOut}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-x-2">
      <Link
        to="/sign-in"
        activeProps={{
          className: 'font-bold',
        }}
        className="px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-900 transition-all"
      >
        Sign In
      </Link>
      <button className="px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-gray-900 transition-all">
        Sign Up
      </button>
    </div>
  )
}
