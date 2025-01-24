import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from './ui/button'
import Image from 'next/image'
import { getFileType, getFileUrl } from '@/lib/utils';
import { uploadFile } from '@/lib/actions/file.actions';
import { appwriteConfig } from '@/lib/appwrite/config';
import toast from 'react-hot-toast';


interface FileUploaderProps {

  ownerId: string;

  accountId: string;

  className? : string

}
const FileUploader = ({ ownerId, accountId, className }: FileUploaderProps) => {




  const [files, setFiles] = React.useState<File[]>([]);
  const [fileType, setFileType] = React.useState<string>('');
  const onDrop =  useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
    setFiles(acceptedFiles);
    // console.log(files);
    const fileType = getFileType(acceptedFiles[0].name);
    setFileType(fileType);
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const handleFileSubmit = async () => {
    "use client";
    try{
      await uploadFile({filePath: files[0]})
      toast.success("file uploaded");

    }catch(error) {
      console.log(error);
    }
  }
  return (
    <>
    <div {...getRootProps()}>
      <input {...getInputProps()} className='cursor-pointer' />
      <Button className='uploader-button'>
        <div className='flex  gap-2 align-items-center justify-content-center'>
          <Image src="/assets/icons/upload.svg" alt='logo' width={20} height={20}></Image>
          <p className='h4'>Upload {fileType} </p>
        </div>
      </Button>
    </div>
    <div>
      <Button className='uploader-buton' onClick={handleFileSubmit}> upload</Button >
    </div>
    </>
  )
}

export default FileUploader;