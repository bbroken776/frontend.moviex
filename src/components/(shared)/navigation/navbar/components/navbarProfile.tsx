'use client'

import { useState } from 'react'

import { BiSolidChevronDown } from 'react-icons/bi'

import useAuth from '@hooks/useAuth'
import IUser from '@interfaces/iUser'

const ProfileDetails = ({ user }: { user: IUser }) => {
  const initials = user.firstName[0] + user.lastName[0]

  return (
    <div className="flex items-center gap-2">
      <div className="bg-amber-400 rounded-lg px-2 py-1">
        <span className="font-bold text-mineshaft-900">{initials}</span>
      </div>
      <span className="text-zinc-100 font-bold whitespace-nowrap">
        {user.firstName} {user.lastName}
      </span>
    </div>
  )
}

const NavbarProfile = () => {
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
          className="p-2 px-4 bg-amber-400 text-mineshaft-900 rounded-lg font-bold shadow-lg hover:shadow-amber-400/50 hover:scale-105 active:scale-90 transition-all duration-300 ease-in-out whitespace-nowrap"
        >
          WATCH WITH US
        </a>
      )}

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-zinc-800 rounded-lg shadow-lg z-50 sm:w-56 md:right-auto">
          <ul className="py-2">
            <li className="px-4 py-2 hover:bg-zinc-700">
              <a href="/profile" className="text-zinc-100">
                Profile
              </a>
            </li>
            <li className="px-4 py-2 hover:bg-zinc-700">
              <a href="/settings" className="text-zinc-100">
                Settings
              </a>
            </li>
            <li className="px-4 py-2 border-[1px] border-red-400 bg-red-400/30 rounded-lg">
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

export default NavbarProfile
