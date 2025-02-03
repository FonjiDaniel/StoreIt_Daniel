 export interface UploadFileProps {
    filePath: File;
    name?: string;
    url ? : string;
    type?: string;
    bucketField?: string
    accountId?: string;
    owner?: string;
    extension?: string;
    size?: number;

}

export interface SearchParamProps {
    params?: SegmentParams;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
  }



  export interface FileOwner {
    fullName: string;
    email: string;
    avatar: string;
    accountId: string;
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: string[];
    $databaseId: string;
    $collectionId: string;
  }
  
  export interface getFileObjectProps {
    name: string;
    url: string;
    type: string;
    bucketField: string;
    accountId: string;
    extension: string;
    size: number;
    users: string[];
    $id: string;
    $permissions: string[];
    $createdAt: string;
    $updatedAt: string;
    owner: FileOwner;
    $databaseId: string;
    $collectionId: string;
  }
  

  export interface File {
    name: string;
    url: string;
    type: string;
    bucketField: string;
    accountId: string;
    extension: string;
    size: number;
    users: string[];
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: string[];
    $databaseId: string;
    $collectionId: string;
  }


  export interface File {
    name: string;
    url: string;
    type: string;
    bucketField: string;
    accountId: string;
    extension: string;
    size: number;
    users: string[];
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: string[];
    $databaseId: string;
    $collectionId: string;
  }
  
  export interface User {
    fullName: string;
    email: string;
    avatar: string;
    accountId: string;
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: string[];
    files: File[];
    $databaseId: string;
    $collectionId: string;
  }

  export interface RenameFileProps {
    fileId: string;
    name: string;
    extension: string;
    path: string;
  }
  export interface UpdateFileUsersProps {
    fileId: string;
    emails: string[];
    path: string;
  }
  export interface DeleteFileProps {
    fileId: string;
    bucketFileId: string;
    path: string;
  }

  export type FileType = "document" | "image" | "video" | "audio" | "other";

  export interface GetFilesProps {
    types: FileType[];
    searchText?: string;
    sort?: string;
    limit?: number;
  }