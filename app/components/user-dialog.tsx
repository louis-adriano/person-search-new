'use client'

import { useState } from 'react'
import { addUser, editUser } from '@/app/actions/actions'
import { userFormSchema, User, UserFormData } from '@/app/actions/schemas'
import { UserForm } from './user-form'
import MutableDialog, { ActionState } from '@/components/mutable-dialog'

interface UserDialogProps {
  isOpen: boolean
  onClose: () => void
  onUserUpdate?: (user: User) => void
  user?: User
}

export function UserDialog({ isOpen, onClose, onUserUpdate, user }: UserDialogProps) {
  const [open, setOpen] = useState(isOpen)

  const handleUser = async (data: UserFormData): Promise<ActionState<User>> => {
    try {
      let updatedUser: User
      if (user) {
        updatedUser = await editUser({ ...data, id: user.id })
      } else {
        updatedUser = await addUser(data)
      }
      onUserUpdate?.(updatedUser)
      setOpen(false)
      onClose()
      return {
        success: true,
        message: `User ${updatedUser.name} ${user ? 'updated' : 'added'} successfully`,
        data: updatedUser
      }
    } catch (error) {
      return {
        success: false,
        message: `Failed to ${user ? 'update' : 'add'} user`
      }
    }
  }

  return (
    <MutableDialog<UserFormData>
      formSchema={userFormSchema}
      FormComponent={UserForm}
      action={handleUser}
      triggerButtonLabel={user ? "Edit User" : "Add User"}
      addDialogTitle={user ? "Edit User" : "Add New User"}
      dialogDescription={user ? "Edit the user information below." : "Fill out the form below to add a new user."}
      submitButtonLabel={user ? "Save Changes" : "Add User"}
      defaultValues={user}
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen)
        if (!newOpen) {
          onClose()
        }
      }}
    />
  )
}

