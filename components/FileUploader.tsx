import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from './ui/button'
import Image from 'next/image'
import { getFileType, MaxFileSize } from '@/lib/utils';
import { uploadFile } from '@/lib/actions/file.actions';
import toast from 'react-hot-toast';
import Thumbnail from './Thumbnail';


interface FileUploaderProps {

  ownerId?: string;

  accountId?: string;

  className?: string

}
const FileUploader = ({ ownerId, accountId, className }: FileUploaderProps) => {




  const [files, setFiles] = React.useState<File[]>([]);
  const [fileType, setFileType] = React.useState<string[]>([]);
  const [isUploading, setIsUploading] = React.useState<boolean>(false)

//   const deleteFiles = async () => {

//     try {
//       await deleteAllFiles(appwriteConfig.bucketId);
//       toast.success('all files deleted successfully')
//     } catch (error) {
//  console.log(error);
//  toast.error('failed to delete files')
//     }
//   }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    // console.log(files);
    const types = acceptedFiles.map((file) => getFileType(file.name))
    setFileType((prevType) => [...prevType, ...types])
  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const handleFileSubmit = async () => {
    "use client";
    try {
      // for (const file of files) {

      //   await uploadFile({ filePath: file })
      //   toast.success("file uploaded");
      //   setFiles((prevFiles) => (prevFiles.filter((_, i) => i !== index )))
      // }
      setIsUploading(true);
      const uploadPromises = files.map(async (file, index) => {
        if (file.size > MaxFileSize) {
          setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
          setFileType((prevTypes) => prevTypes.filter((_, i) => i !== index));
          toast.error(`${file.name} file must be 50mb or lower`);
          return;
        }
        await uploadFile({
          filePath: file,
          type: getFileType(file.name)
        });

        // Remove file from state after successful upload
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
        setFileType((prevTypes) => prevTypes.filter((_, i) => i !== index));
        toast.success(`${file.name} uploaded successfully`);

      });


      await Promise.all(uploadPromises);// Wait for all files to be uploaded

      setIsUploading(false);
      setFileType([]);
      setFiles([]);

    } catch (error) {
      console.log(error);
      toast.error('failed to upload files')
      setFiles([]);
    }
  }


  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} className='cursor-pointer' />
        <div className='flex flex-col items-center'>
          <Button className='uploader-buton'>select a file</Button >


          {files.length == 0 && <p className="text-gray-500 text-xs">No files selected</p>}
        </div>
      </div>
      <div className="mt-4">
        {/* {files.length > 0 ? (
          <ul>
            {files.map((file, index) => (
              <li key={index} className="mb-2">
                {file.type.startsWith('image/') && <Image src={URL.createObjectURL(file)} alt='image' width={30} height={30} className='thumbnail' />}
              </li>
            ))}
          </ul>
        ) : (
          null
        )} */}
      </div>
      <div className=''>
        <Button className='uploader-button' disabled={isUploading || files.length === 0}>
          <div className='flex  gap-2 align-items-center justify-content-center' onClick={handleFileSubmit}>
            <Image src="/assets/icons/upload.svg" alt='logo' width={20} height={20}></Image>
            <p className='h4'>Upload</p>
          </div>
        </Button>
        {/* <Button className='uploader-button'>
          <div className='flex  gap-2 align-items-center justify-content-center' onClick={deleteFiles}>
            <Image src="/assets/icons/upload.svg" alt='logo' width={20} height={20}></Image>
            <p className='h4'>deleteAllFiles</p>
          </div>
        </Button> */}
      </div>

      {files.length > 0 && (
        <ul className="uploader-preview-list">
          <div className='flex justify-between'>
            <h4 className="h4 text-light-100">Selected Files</h4>
            <Image
              src="/assets/icons/remove.svg"
              width={24}
              height={24}
              alt="Remove"
              onClick={() => {
                setFiles([]);
                setFileType([]);
              }}
            />

          </div>

          {files.map((file, index) => {
            const type = getFileType(file.name);
            console.log(type);

            return (
              <li
                key={`${file.name}-${index}`}
                className="uploader-preview-item"
              >
                <div className="flex items-center gap-3">

                  <Thumbnail type={type} url={URL.createObjectURL(file)} />

                  <div className=" flex flex-col">
                    <p className='preview-item-name'>{file.name}</p>
                    {isUploading && <Image
                      src="/assets/icons/file-loader.gif"
                      width={80}
                      height={26}
                      alt="Loader"
                    />
                    }
                  </div>
                </div>

                <Image
                  src="/assets/icons/remove.svg"
                  width={24}
                  height={24}
                  alt="Remove"
                  onClick={() => {
                    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
                    setFileType((prevTypes) => prevTypes.filter((_, i) => i !== index));
                  }}
                />
              </li>
            );
          })}
        </ul>
      )}
    </>
  )
}

export default FileUploader;