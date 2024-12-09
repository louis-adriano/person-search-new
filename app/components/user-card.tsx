import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Phone, Mail, MapPin, MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { UserDialog } from './user-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface User {
  id: string
  name: string
  phoneNumber: string
  email?: string
  location?: string
}

interface UserCardProps {
  user: User
  onUserUpdate: (updatedUser: User) => void
}

export function UserCard({ user, onUserUpdate }: UserCardProps) {
  const [isEditMode, setIsEditMode] = useState(false)

  const handleEditClick = () => {
    setIsEditMode(true)
  }

  const handleUserUpdate = (updatedUser: User) => {
    onUserUpdate(updatedUser)
    setIsEditMode(false)
  }

  return (
    <Card className="w-full max-w-md mx-auto relative">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`} alt={user.name} />
          <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col flex-grow">
          <CardTitle className="text-2xl">{user.name}</CardTitle>
          <Badge variant="secondary" className="w-fit mt-1">ID: {user.id}</Badge>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleEditClick}>
              Edit
            </DropdownMenuItem>
            {/* We'll add Delete functionality later */}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-muted-foreground" />
          <span>{user.phoneNumber}</span>
        </div>
        {user.email && (
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span>{user.email}</span>
          </div>
        )}
        {user.location && (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>{user.location}</span>
          </div>
        )}
      </CardContent>
      <UserDialog
        isOpen={isEditMode}
        onClose={() => setIsEditMode(false)}
        onUserUpdate={handleUserUpdate}
        user={user}
      />
    </Card>
  )
}

