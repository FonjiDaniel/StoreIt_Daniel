import React from 'react'
import Thumbnail from './Thumbnail'
// import { getFileObjectProps } from '@/constants/types'
// import Image from 'next/image'
import { convertFileSize } from '@/lib/utils'
import ActionDropdown from './ActionDropdown'
import { Models } from 'node-appwrite'

const Card = (

    { file} : {file : Models.Document}) => {
    const fileSize = convertFileSize(file!.size);

    return (
        <div className='file-card'>
            <div className='flex justify-between items-center '>
                <Thumbnail url={file.url} type={file.type} extension={file.extension} />
                <div className='flex flex-col'>
              <  ActionDropdown file={file} />
                    <p>{fileSize}</p>
                </div>
            </div>
            <p>{file.name}</p>
            
        </div>
    )
}

export default Card 