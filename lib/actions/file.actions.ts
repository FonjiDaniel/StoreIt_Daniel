"use server";
import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { appwriteConfig } from "../appwrite/config";
import { ID, Models, Query } from "node-appwrite";
import {
  convertFileSize,
  getFileType,
  getFileUrl,
  parseStringify,
} from "../utils";
import { getCurrentUser, handleError } from "./user.actions";
import { UploadFileProps, UpdateFileUsersProps, DeleteFileProps, RenameFileProps, GetFilesProps } from "@/constants/types";
import { revalidatePath } from "next/cache";

export const uploadFile = async ({
  filePath,
  name,
  url,
  type,
  bucketField,
  accountId,
  owner,
  extension,
  size,
}: UploadFileProps) => {
  const user = await getCurrentUser();

  try {
    const { storage } = await createAdminClient();
    const file = await storage.createFile(
      appwriteConfig.bucketId,
      ID.unique(),
      filePath
    );

    // create a file oject to use for creating a document on the file collection
    const fileDocument = {
      name: file.name,
      url: getFileUrl(file.$id),
      type: type,
      bucketFileId: file.$id,
      accountId: user.accountId,
      owner: user.$id,
      extension: file.name.split(".").pop()?.toLocaleLowerCase(),
      size: file.sizeOriginal,
      users: [],
    };

    const { databases } = await createAdminClient();
    const result = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      ID.unique(),
      fileDocument
    );

    console.log(result);
  } catch (error) {
    console.log(error);
  }
};


const createQueries = (
  currentUser: Models.Document,
  types: string[],
  searchText: string,
  sort: string,
  limit?: number,
) => {
  const queries = [
    Query.or([
      Query.equal("owner", [currentUser.$id]),
      Query.contains("users", [currentUser.email]),
    ]),
  ];

  if (types.length > 0) queries.push(Query.equal("type", types));
  if (searchText) queries.push(Query.contains("name", searchText));
  if (limit) queries.push(Query.limit(limit));

  if (sort) {
    const [sortBy, orderBy] = sort.split("-");

    queries.push(
      orderBy === "asc" ? Query.orderAsc(sortBy) : Query.orderDesc(sortBy),
    );
  }

  return queries;
};


export const getFiles = async  ({
  types = [],
  searchText = "",
  sort = "$createdAt-desc",
  limit,
}: GetFilesProps) => {
  const { databases } = await createAdminClient();

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) throw new Error("User not found");

    const queries = createQueries(currentUser, types, searchText, sort, limit);

    const files = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      queries,
    );

    console.log({ files });
    return parseStringify(files);
  } catch (error) {
    handleError(error, "Failed to get files");
  }
};


export const renameFile = async ({
  fileId,
  name,
  extension,
  path,
}: RenameFileProps) => {
  const { databases } = await createAdminClient();

  try {
    const newName = `${name}.${extension}`;
    const updatedFile = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      fileId,
      {
        name: newName,
      },
    );

    revalidatePath(path);
    return parseStringify(updatedFile);
  } catch (error) {
    handleError(error, "Failed to rename file");
  }
};


export const deleteAllFiles = async (bucketId: string) => {
  const { storage } = await createAdminClient();
  try {
    // List all files in the bucket
    const files = await storage.listFiles(bucketId);

    // Iterate over each file and delete it
    for (const file of files.files) {
      await storage.deleteFile(bucketId, file.$id);
      console.log(`Deleted file: ${file.$id}`);
    }
  } catch (error) {
    console.error("Error deleting files:", error);
  }
};


export const updateFileUsers = async ({
  fileId,
  emails,
  path,
}: UpdateFileUsersProps) => {
  const { databases } = await createAdminClient();

  try {
    const updatedFile = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      fileId,
      {
        users: emails,
      },
    );

    revalidatePath(path);
    return parseStringify(updatedFile);
  } catch (error) {
    handleError(error, "Failed to rename file");
  }
};


export const deleteFile = async ({
  fileId,
  bucketFileId,
  path,
}: DeleteFileProps) => {
  const { databases, storage } = await createAdminClient();

  try {
    const deletedFile = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      fileId,
    );

    if (deletedFile) {
      await storage.deleteFile(appwriteConfig.bucketId, bucketFileId);
    }

    revalidatePath(path);
    return parseStringify({ status: "success" });
  } catch (error) {
    handleError(error, "Failed to rename file");
  }
};