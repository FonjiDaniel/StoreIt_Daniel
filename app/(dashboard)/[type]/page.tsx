import React from 'react'
import { SearchParamProps } from '@/constants/types';
import { sortTypes } from '@/constants';
import { getFilesByType } from '@/lib/actions/file.actions';
import Card from '@/components/Card';



const page = async ({ params }: SearchParamProps) => {
    const type = ((await params)?.type as string);
    console.log(type!);
    const route = (type: string) => {
        if(type === "documents"){
            return 'document'
        } else if(type === 'images') {
            return "image"
        } else if(type === 'media') {
            return ['audio', 'video']
        } else {
            return 'other'
        }
    }
    const fileQuery = route(type)
    const files = await getFilesByType(fileQuery);
    console.log(files!);
    return (
        <div className='page-container'>
            <section className='w-full'>
                <h1 className='h1 capitalize'>
                    {type}
                </h1>
                <div className='flex justify-between items-center'>
                    <p>
                        Total: <span className='font-semibold text-primary'>Size</span>
                    </p>
                    <div className='flex  items-center'>
                        <label htmlFor="sort">Sort By:</label>
                        <select name="sort" id="sort" className='p-1 rounded-sm'>
                            {sortTypes.map((sort) => (
                                <option key={sort.value} value={sort.value} className='bg-white hover:bg-brand'>{sort.label}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                    {files && files.length > 0 ? (
            files.map((file) => (
              <Card key={file.$id} {...file} />
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

export default page