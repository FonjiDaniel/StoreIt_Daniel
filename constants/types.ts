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