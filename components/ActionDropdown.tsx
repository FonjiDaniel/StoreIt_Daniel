
'use client'
import React from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
// import { getFileDownloadUrl } from '@/lib/utils';
import { Button } from './ui/button';
import { FileDetails, ShareInput, } from './ActionsModalContent';
import { Input } from "@/components/ui/input";
import { deleteFile, renameFile, updateFileUsers } from '@/lib/actions/file.actions';
import { getFileDownloadUrl } from '@/lib/utils'




const ActionDropdown = ({ file }: { file: Models.Document }) => {
  const [emails, setEmails] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [action, setAction] = React.useState<ActionType | null>(null);
  const [name, setName] = React.useState<string>(file.name);


  const path = usePathname();
  const closeAllModals = () => {
    setIsModalOpen(false);
    setIsDropdownOpen(false);
    setAction(null);
    setName(file.name);
    //   setEmails([]);
  };


  const handleAction = async () => {
    if (!action) return;
    setIsLoading(true);
    let success = false;

    const actions = {
      rename: () =>
        renameFile({ fileId: file.$id, name, extension: file.extension, path }),
      share: () => updateFileUsers({ fileId: file.$id, emails, path }),
      delete: () =>
        deleteFile({ fileId: file.$id, bucketFileId: file.bucketFileId, path }),
    };

    success = await actions[action.value as keyof typeof actions]();

    if (success) closeAllModals();

    setIsLoading(false);
  };



  const handleRemoveUser = async (email: string) => {
    const updatedEmails = emails.filter((e) => e !== email);

    const success = await updateFileUsers({
      fileId: file.$id,
      emails: updatedEmails,
      path,
    });

    if (success) setEmails(updatedEmails);
    closeAllModals();
  };



  const renderDialog = () => {
    if (!action) return null;



    const { value, label } = action;

    return (
      <DialogContent className="shad-dialog button">
        <DialogHeader className="flex flex-col gap-3">
          <DialogTitle className="text-center text-light-100">
            {label}
          </DialogTitle>
          {value === "rename" && (
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          {value === "details" && <FileDetails file={file} />}
          {value === "share" && (
            <ShareInput
              file={file}
              onInputChange={setEmails}
              onRemove={handleRemoveUser}
            />
          )}
          {value === "delete" && (
            <p className="delete-confirmation">
              Are you sure you want to delete{` `}
              <span className="delete-file-name">{file.name}</span>?
            </p>
          )}
        </DialogHeader>
        {["rename", "delete", "share"].includes(value) && (
          <DialogFooter className="flex flex-col gap-3 md:flex-row">
            <Button onClick={closeAllModals} className="modal-cancel-button">
              Cancel
            </Button>
            <Button onClick={handleAction} className="modal-submit-button">
              <p className="capitalize">{value}</p>
              {isLoading && (
                <Image
                  src="/assets/icons/loader.svg"
                  alt="loader"
                  width={24}
                  height={24}
                  className="animate-spin"
                />
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    );
  };
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
      {renderDialog()}
    </Dialog>


  )
}

export default ActionDropdown;