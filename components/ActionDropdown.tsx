
'use client'
import React from 'react'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

declare interface ActionType {
  label: string;
  icon: string;
  value: string;
}

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Models } from 'node-appwrite'
import { actionsDropdownItems } from '@/constants'
import Link from 'next/link';
import { getFileDownloadUrl } from '@/lib/utils';
import { Divide } from 'lucide-react';

const ActionDropdown = ({ file }: { file: Models.Document }) => {

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [action, setAction] = React.useState<ActionType | null>(null);
  return (

    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger className='shad-no-focus'>
          <Image src='/assets/icons/dots.svg' alt='options' width={50} height={40} />

        </DropdownMenuTrigger>
        <DropdownMenuContent className='max-w-[200px] truncate'>
          <DropdownMenuLabel>{file.$id}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {actionsDropdownItems.map((action) => <DropdownMenuItem key={action.value} className='shad-dropdown-item' onClick={() => {
            setAction(action)
            if (['rename', 'share', 'delete', 'details'].includes(action.value)) { setIsModalOpen(true) }

          }}>
            {action.value === 'download' ?

              <Link href={getFileDownloadUrl(file.bucketFileId)} className='flex items-center gap-2' download={file.name}>
                <Image src={action.icon} alt={action.label} width={30} height={30} />
                {action.label}
              </Link> : <div className='flex items-center gap-2'>
                <Image src={action.icon} alt={action.label} width={30} height={30} />
                {action.label}</div>} </DropdownMenuItem>)}
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>


  )
}

export default ActionDropdown;