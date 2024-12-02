'use client'

import { useState } from 'react'

import { BiSolidChevronDown } from 'react-icons/bi'

import useAuth from '@hooks/useAuth'
import ProfileDetails from './profileDetails'
import ProfileLinkList from './profileLinkList'

const Profile = () => {
  const { isAuthenticated, user, logout } = useAuth()

  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const handleDropdownStatus = () => setDropdownOpen(!isDropdownOpen)
  const closeDropdown = () => setDropdownOpen(false)

  return (
    <div className="relative hidden md:block">
      {isAuthenticated ? (
        <div
          className="flex items-center cursor-pointer gap-4"
          onClick={handleDropdownStatus}
        >
          <ProfileDetails user={user!} />
          <BiSolidChevronDown
            size={20}
            className={`text-amber-400 ${isDropdownOpen ? 'rotate-360' : 'rotate-180'} transition-transform ease-in-out duration-300`}
          />
        </div>
      ) : (
        <a
          href="/auth/login"
          className="p-2 px-4 bg-amber-400 text-mineshaft-900 rounded-lg font-bold shadow-lg hover:shadow-amber-400/50 hover:scale-105 active:scale-90 transition-all ease-in-out duration-100 whitespace-nowrap"
        >
          WATCH WITH US
        </a>
      )}

      {isDropdownOpen && (
        <div className="absolute w-full right-0 mt-2 bg-mineshaft-800 rounded-lg shadow-lg z-50 md:right-auto">
          <ul className="p-2 space-y-2">
            <ProfileLinkList />
            <li className="px-4 py-2 border-[1px] border-red-400 bg-red-400/30 rounded-lg hover:bg-red-400 hover:font-bold">
              <button
                onClick={() => {
                  closeDropdown()
                  logout()
                }}
                className="text-zinc-100 w-full text-left"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}

      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={closeDropdown}
          aria-hidden="true"
        />
      )}
    </div>
  )
}

export default Profile
