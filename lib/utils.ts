import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { appwriteConfig } from "./appwrite/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (value: unknown) =>
  JSON.parse(JSON.stringify(value));

// function to check the file type based on the extension
export const getFileType = (file: string) => {
  const type = file.split(".").pop()?.toLowerCase();
  if (!type) return "others";

  const documentTypes = [
    "pdf",
    "doc",
    "docx",
    "txt",
    "rtf",
    "odt",
    "xls",
    "xlsx",
    "ods",
    "ppt",
    "pptx",
    "odp",
  ];
  const imageTypes = [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "svg",
    "webp",
    "bmp",
    "ico",
    "tiff",
    "tif",
  ];
  const audioTypes = ["mp3", "wav", "ogg", "flac", "aac", "wma", "m4a"];
  const videoTypes = [
    "mp4",
    "avi",
    "mkv",
    "mov",
    "wmv",
    "flv",
    "webm",
    "vob",
    "m4v",
    "3gp",
    "3g2",
  ];

  if (documentTypes.includes(type!)) {
    return "document";
  } else if (imageTypes.includes(type!)) {
    return "image";
  } else if (audioTypes.includes(type!)) {
    return "audio";
  } else if (videoTypes.includes(type!)) {
    return "video";
  } else {
    return "others";
  }
};

export const getFileUrl = (bucketId : string, fileId: string) => {
  return  `${appwriteConfig.endpointUrl}/storage/buckets/${appwriteConfig.bucketId}/files/${fileId}/view?project=${appwriteConfig.projectId}`;
}

export const convertFileSize  = ( size : number) => {

  if( size >=1000000) { 
     const finalSize = size/100000+"kB"
     return  finalSize;
  } else {
    const finalSize = size/1000 + 'MB'
    return finalSize;
  }

}