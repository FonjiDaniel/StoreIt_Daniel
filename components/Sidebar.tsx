
'use client'
import { avatarPlaceholderUrl, navItems } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import React from 'react'


interface Props {
  fullName: string;
  avatar: string;
  email: string;
}
const Sidebar = ({ fullName, avatar, email }: Props) => {
  const pathname = usePathname();
  return (
    <aside className='sidebar'>
      <Link href='/'>
        <Image src='/assets/icons/logo-full-brand.svg' alt='logo' height={50} width={160} className='hidden h-auto lg:block' />
        <Image src='/assets/icons/logo-brand.svg' alt='logo' height={52} width={52} className='h-auto lg:hidden' />
      </Link>
      <nav className='sidebar-nav'>
        <ul className='flex flex-1 flex-col gap-6'>
          {navItems.map((item) => (
            <Link key={item.name} href={item.url} className='lg:w-full'>

              <li className={cn("sidebar-nav-item", pathname === item.url && "shad-active")}>
                <Image className={cn('nav-icon', pathname === item.url && 'nav-c ')} src={item.icon} alt={item.name} width={24} height={24} />
                <p className='hidden lg:block'>{item.name}</p>
              </li>
            </Link>

          ))}

        </ul>

      </nav>

      <Image
        src="/assets/images/files-2.png"
        alt="logo"
        width={506}
        height={418}
        className="w-full"
      />

      <div className="sidebar-user-info">
        <Image
          src={avatar}
          alt="Avatar"
          width={44}
          height={44}
          className="sidebar-user-avatar"
        />
        <div className="hidden lg:block">
          <p className="subtitle-2 capitalize">{fullName}</p>
          <p className="caption">{email}</p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar