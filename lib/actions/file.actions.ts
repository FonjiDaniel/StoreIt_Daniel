"use server";
import { createAdminClient, createSessionClient } from "@/lib/appwrite";  
import { appwriteConfig } from "../appwrite/config";  
import { ID } from "node-appwrite";
import { convertFileSize, getFileType, getFileUrl } from "../utils";
import { getCurrentUser } from "./user.actions";
import { UploadFileProps } from "@/constants/types";

export const uploadFile = async ({  
    filePath,
    name,
    url,
    type,
    bucketField,
    accountId,
    owner,
    extension,
    size,}
    : UploadFileProps) => { 

         const user = await getCurrentUser();

        try {
            const {storage} = await createAdminClient();
            const file = await storage.createFile(
                appwriteConfig.bucketId, ID.unique(), filePath
            )

                // create a file oject to use for creating a document on the file collection 
            const fileDocument = {
                name: file.name ,
                url : getFileUrl(file.bucketId, file.$id),
                type : getFileType(file.name),
                bucketField: file.bucketId,
                accountId: user.accountId,
                owner: user.$id,
                extension: file.name.split('.').pop()?.toLocaleLowerCase(),
                size: file.sizeOriginal,
                users : []
            }

            const {databases} = await createAdminClient();
            const result = await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.filesCollectionId,ID.unique(), fileDocument);

            
            console.log(result);
        } catch (error) {
            console.log(error);
        }



    }