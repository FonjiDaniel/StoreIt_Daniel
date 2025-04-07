import React from 'react'
import Thumbnail from './Thumbnail'
import { convertFileSize } from '@/lib/utils'
import ActionDropdown from './ActionDropdown'
import { Models } from 'node-appwrite'

const Card = ({ file }: { file: Models.Document }) => {
    const fileSize = convertFileSize(file!.size);

    return (
<div className='file-card'>
  <div className='flex justify-between items-center'>
    <Thumbnail url={file.url} type={file.type} extension={file.extension} />
    <div className='flex flex-col items-end'> 
      <ActionDropdown file={file} />
      <p className='text-sm text-gray-600'>{fileSize}</p> 
    </div>
  </div>
  <div className='overflow-hidden text-ellipsis whitespace-nowrap'> 
    {file.name}
  </div>
</div>
    )
}

export default Card 