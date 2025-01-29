import { Client, Account, Databases, Storage, Avatars } from "node-appwrite"
import { appwriteConfig } from "./config"
import { cookies } from "next/headers";

//node -appwrite
export const createSessionClient = async () =>{
    const client = new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId);

 const session = (await cookies()).get("appwrite-session");

 if(!session || !session.value) return null;

 client.setSession(session.value);

 return {
    get account(){
        return new Account(client);
    },
    get databases (){
        return new Databases(client);
    }
 }
}

export const createAdminClient = async () =>{

 try {
    const client = new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId)
    .setKey(appwriteConfig.secretKey);
 
 return {
    get account(){
        return new Account(client);
    },
    get databases (){
        return new Databases(client);
    },
    get storage (){
        return new Storage(client);
    },
    get avatars (){
        return new Avatars(client);
    }
 }
    
 } catch (error) {
    console.log(error);
    throw error
    
 }
    
 
    
}