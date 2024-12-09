'use client'

import { UseFormReturn } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UserFormData } from '@/app/actions/schemas'

interface FormComponentProps {
  form: UseFormReturn<UserFormData>
}

export function UserForm({ form }: FormComponentProps) {
  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="John Doe" {...field} value={field.value || ''} />
            </FormControl>
            <FormDescription>
              Enter full name.
            </FormDescription>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="john@example.com" {...field} value={field.value || ''} />
            </FormControl>
            <FormDescription>
              Enter email address.
            </FormDescription>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <Input placeholder="0412345678" {...field} value={field.value || ''} />
            </FormControl>
            <FormDescription>
              Enter phone number in Australian mobile number format.
            </FormDescription>
          </FormItem>
        )}
      />
    </Form>
  )
}

