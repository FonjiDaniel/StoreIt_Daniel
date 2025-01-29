//** Create account flow */
//User enters full name and email
//check if the user already exist using the email (we will use thist to identify if we need to create a new user document or not )
//send otp to users email
//This will send a secret key for creating a session.
//Create a new user document if the user is a new user
//Return the user's accountId that will be used to complete the login
//Verify OTP an authenticate the login.
"use server";

import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { Query, ID } from "node-appwrite";
import { parseStringify } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// import { avatarPlaceholderUrl } from "@/constants";
// import { redirect } from "next/navigation";

const getUserByEmail = async (email: string) => {
  const { databases } = await createAdminClient();

  const result = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    [Query.equal("email", [email])]
  );

  return result.total > 0 ? result.documents[0] : null;
};

export const handleError = async (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

export const sendEmailOTP = async ({ email }: { email: string }) => {
  const { account } = await createAdminClient();

  try {
    const session = await account.createEmailToken(ID.unique(), email);
    return session.userId;
    
  } catch (error) {
    handleError(error, "Failed to send email OTP");
  }
};

export const createAccount = async ({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}) => {
  const existingUser = await getUserByEmail(email);

  const accountId = await sendEmailOTP({ email });
  if (!accountId) throw new Error("Failed to send an OTP");

  if (!existingUser) {
    const { databases } = await createAdminClient();

    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      {
        fullName,
        email,
        avatar:
          "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
        accountId,
      }
    );
  }

  return parseStringify({ accountId });
};

export const verifySecret = async ({
  accountId,
  password,
}: {
  accountId: string;
  password: string;
}) => {
  try {
    const { account } = await createAdminClient();

    const session = await account.createSession(accountId, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify({ sessionId: session.$id });
  } catch (error) {
  
    handleError(error, "Failed to verify OTP");
    throw error;
  }
};

export const login = async ({email}: {email: string}) => {
  try {
    const existingUser = await getUserByEmail(email);
    console.log(existingUser);

    if (existingUser) {
      const accountId = await sendEmailOTP({ email });
      if(accountId ===null){
           throw new Error("failed to send otp") ; };

      return parseStringify({ accountId});
    }
   
      return parseStringify({accountId: null})

    // return parseStringify({accountId: null})
    
  } catch (error) {
    handleError(error, "failed to login");
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const sessionClient = await createSessionClient();
  if (!sessionClient) return null;
  const {databases, account} = sessionClient;
  if (!account) return null;
  const result = await account.get();
  const user = await databases.listDocuments(
    appwriteConfig.databaseId, appwriteConfig.usersCollectionId, [Query.equal("accountId", result.$id)],
  );

  if(user.total <=0 )return null;

  return parseStringify(user.documents[0]);
    
  } catch (error) {
    console.log(error)
    throw error;

    
  }

}

export const logout = async () => {
  const sessionClient = await createSessionClient();
  if (!sessionClient) return redirect('/sign-in');

  const { account } = sessionClient;

  try {
    await account.deleteSession('current');
    (await cookies()).delete('appwrite-session'); // Correctly close the parentheses here
    console.log('User logged out successfully');
     return redirect('/sign-in');
  } catch (error) {
    console.error('Error logging out:', error);
  
  }
}
