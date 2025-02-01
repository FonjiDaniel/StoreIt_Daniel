
// 'use client'
import React from 'react'
import { SearchParamProps } from '@/constants/types';
import { sortTypes } from '@/constants';
import { getFilesByType } from '@/lib/actions/file.actions';
import Card from '@/components/Card';
import { getCurrentUser } from '@/lib/actions/user.actions';
import SortDropdown from '@/components/SortDropdown';
// import { Models } from 'node-appwrite';



const Page =  async({ params }: SearchParamProps) => {

  
    const type = params?.type as string;
    console.log(type!);
    const route = (type: string) => {
        if (type === "documents") {
            return 'document'
        } else if (type === 'images') {
            return "image"
        } else if (type === 'media') {
            return ['audio', 'video']
        } else {
            return 'other'
        }
    }
    const fileQuery = route(type)
    // const [sortValue, setSortValue] = React.useState()
    // const [files, setFiles] = React.useState<Models.Document[]>

    // const getFile = async () => {
    //     const user = await getCurrentUser()
        

    //     const files = getFilesByType(fileQuery, user.accountId,);
    // }
    const user = await getCurrentUser();
    console.log(user) ;

    const files = await getFilesByType(fileQuery);
    console.log(files);


    // const [sortType, setSortType] = React.useState<string>("$createdAt-desc")
    // console.log(files!); for debugging
    return (
        <div className='page-container'>
            <section className='w-full' >
                <div>
                <h1 className='h1 capitalize'>
                    {type}
                </h1>
                <div className='flex justify-between items-center'>
                    <p>
                        Total: <span className='font-semibold text-primary'>{files!.length}</span>
                    </p>
                    <SortDropdown />
                </div>

                <div className='w-full grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-3 mt-5 '>
                        {files && files.length > 0 ? (
                            files.map((file) => (
                                <Card key={file.$id} file = {file} />
                            ))
                        ) : (
                            <p>No {type} found</p>
                        )}
                    </div>

                </div>
              
            </section>
        </div>
    )
}

export default Page