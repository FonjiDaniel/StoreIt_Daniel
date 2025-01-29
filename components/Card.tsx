import React from 'react'
import Thumbnail from './Thumbnail'
import { getFileObjectProps } from '@/constants/types'
import Image from 'next/image'
import { convertFileSize } from '@/lib/utils'

const Card = (

    { name,
        url,
        type,
        extension,
        size,
        users,
        $id,
        $permissions,
        $createdAt,
        $updatedAt,
        owner,
        $databaseId,
        $collectionId,
    }: getFileObjectProps) => {
    const fileSize = convertFileSize(size);

    return (
        <div className='file-card'>
            <div className='flex justify-between items-center '>
                <Thumbnail url={url} type={type} extension={extension} />
                <div className='flex flex-col'>
                    <Image src='/assets/icons/dots.svg' alt='options' width={50} height={40} />
                    <p>{convertFileSize(size)}</p>
                </div>
            </div>
            <p>{name}</p>
            
        </div>
    )
}

export default Card 