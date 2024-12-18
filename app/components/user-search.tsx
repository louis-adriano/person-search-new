'use client'

import { useState, useEffect } from 'react'
import AsyncSelect from 'react-select/async'
import { searchUsers } from '@/app/actions/actions'
import { UserCard } from './user-card'
import { User } from '@/app/actions/schemas'

interface Option {
  value: string
  label: string
  user: User
}

export default function UserSearch() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const loadOptions = async (inputValue: string): Promise<Option[]> => {
    try {
      const users = await searchUsers(inputValue)
      return users.map(user => ({ value: user.id, label: user.name, user }))
    } catch (error) {
      console.error('Error loading options:', error)
      return []
    }
  }

  const handleChange = (option: Option | null) => {
    setSelectedUser(option ? option.user : null)
  }

  const handleUserUpdate = (updatedUser: User) => {
    setSelectedUser(updatedUser)
  }

  return (
    <div className="space-y-6">
      {isMounted && (
        <AsyncSelect
          cacheOptions
          loadOptions={loadOptions}
          onChange={handleChange}
          placeholder="Search for a user..."
          className="w-full max-w-md mx-auto"
        />
      )}
      {selectedUser && <UserCard user={selectedUser} onUserUpdate={handleUserUpdate} />}
    </div>
  )
}

