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

  if( size <=1000000) { 
     const finalSize = size/100000+"KB"
     return  finalSize;
  } else {
    const finalSize = size/1000 + 'MB'
    return finalSize;
  }

}

export const getFileIcon = (
  extension: string | undefined,
  type: string,
) => {
  switch (extension) {
    // Document
    case "pdf":
      return "/assets/icons/file-pdf.svg";
    case "doc":
      return "/assets/icons/file-doc.svg";
    case "docx":
      return "/assets/icons/file-docx.svg";
    case "csv":
      return "/assets/icons/file-csv.svg";
    case "txt":
      return "/assets/icons/file-txt.svg";
    case "xls":
    case "xlsx":
      return "/assets/icons/file-document.svg";
    // Image
    case "svg":
      return "/assets/icons/file-image.svg";
    // Video
    case "mkv":
    case "mov":
    case "avi":
    case "wmv":
    case "mp4":
    case "flv":
    case "webm":
    case "m4v":
    case "3gp":
      return "/assets/icons/file-video.svg";
    // Audio
    case "mp3":
    case "mpeg":
    case "wav":
    case "aac":
    case "flac":
    case "ogg":
    case "wma":
    case "m4a":
    case "aiff":
    case "alac":
      return "/assets/icons/file-audio.svg";

    default:
      switch (type) {
        case "image":
          return "/assets/icons/file-image.svg";
        case "document":
          return "/assets/icons/file-document.svg";
        case "video":
          return "/assets/icons/file-video.svg";
        case "audio":
          return "/assets/icons/file-audio.svg";
        default:
          return "/assets/icons/file-other.svg";
      }
  }
};
