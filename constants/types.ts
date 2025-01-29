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
    params?: Promise<SegmentParams>;
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
  