"use client"

import {
  ChevronsUpDown,
  LogOut,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client" 
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from 'next/navigation';

export function NavUser() {
  const router = useRouter();
  const { isMobile } = useSidebar()

  const { 
    data: session, 
    isPending,
} = authClient.useSession() 
  return (
    <>
    {isPending ? 
     <Skeleton className="w-full h-[30px] rounded-sm" /> 
     :
     <SidebarMenu>
     <SidebarMenuItem>
       <DropdownMenu>
         <DropdownMenuTrigger asChild>
           <SidebarMenuButton
             size="lg"
             className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
           >
             <Avatar className="h-8 w-8 rounded-lg">
               <AvatarImage src={session?.user?.image!} alt={session?.user?.name} />
               <AvatarFallback className="rounded-lg">{session?.user.name[0]}</AvatarFallback>
             </Avatar>
             <div className="grid flex-1 text-left text-sm leading-tight">
               <span className="truncate font-semibold">{session?.user?.name}</span>
               <span className="truncate text-xs">{session?.user?.email}</span>
             </div>
             <ChevronsUpDown className="ml-auto size-4" />
           </SidebarMenuButton>
         </DropdownMenuTrigger>
         <DropdownMenuContent
           className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
           side={isMobile ? "bottom" : "right"}
           align="end"
           sideOffset={4}
         >
           <DropdownMenuLabel className="p-0 font-normal">
             <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
             <Avatar className="h-8 w-8 rounded-lg">
               <AvatarImage src={session?.user?.image!} alt={session?.user?.name} />
               <AvatarFallback className="rounded-lg">{session?.user.name[0]}</AvatarFallback>
             </Avatar>
             <div className="grid flex-1 text-left text-sm leading-tight">
               <span className="truncate font-semibold">{session?.user?.name}</span>
               <span className="truncate text-xs">{session?.user?.email}</span>
             </div>
             </div>
           </DropdownMenuLabel>    
           <DropdownMenuSeparator />
           <DropdownMenuItem onClick={()=>{
            authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  router.push("/login"); 
                },
              },
            })
            }}>
             <LogOut />
             Log out
           </DropdownMenuItem>
         </DropdownMenuContent>
       </DropdownMenu>
     </SidebarMenuItem>
   </SidebarMenu>
     
    }
   </>
  )
}
