import React from 'react'
import Thumbnail from './Thumbnail'
import { getFileObjectProps } from '@/constants/types'
const Card = (
    
   {name,
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

    return (
        <div className='file-card'>
            <div>
           <Thumbnail url={url} type={type} extension={extension}/>
            </div>
        </div>
    )
}

export default Card