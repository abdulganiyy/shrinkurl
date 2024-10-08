'use server';

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

import { revalidatePath } from "next/cache";
import { getLoggedInUser } from "./user.actions";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  APPWRITE_URL_COLLECTION_ID: URL_COLLECTION_ID,
  NEXT_PUBLIC_SITE_URL:SITE_URL
} = process.env;

export const createUrl = async ({ longurl,alias }: CreateUrlParams) => {
  try {
    const { database } = await createAdminClient();

    const loggedInUser = await getLoggedInUser()

    let userId = loggedInUser?.userId ? loggedInUser.userId : ""

    const urls = await database.listDocuments(
        DATABASE_ID!,
        URL_COLLECTION_ID!,
      )

    const urlCount = urls.total + 1  

    const expiredAt = new Date()
    expiredAt.setMonth(expiredAt.getMonth() + 2)

    const newUrl = await database.createDocument(
        DATABASE_ID!,
        URL_COLLECTION_ID!,
        ID.unique(),
        {
          longurl,
           shorturl:alias?`${SITE_URL}/${alias}`:`${SITE_URL}/${urlCount}`,
           expiryDate:expiredAt.toISOString(),
           alias:alias ? alias :"",
           userId

   
        }
      )

 
    return parseStringify(newUrl);
  } catch (error) {
    console.log(error)
  }
}


export const getUrl = async ({ id }: any) => {
  try {
    const { database } = await createAdminClient();

    const urls = await database.listDocuments(
        DATABASE_ID!,
        URL_COLLECTION_ID!,
        [Query.equal('shorturl', [`${SITE_URL}/${id}`])]

      )

 
 
    return parseStringify(urls.documents[0]);
  } catch (error) {
    console.log(error)
  }
}

export const getAllUserUrls = async () => {
  try {
    const { database } = await createAdminClient();

    const loggedInUser = await getLoggedInUser()


    if(!loggedInUser) throw new Error('User not logged in')


    const urls = await database.listDocuments(
        DATABASE_ID!,
        URL_COLLECTION_ID!,
        [Query.equal('userId', [`${SITE_URL}/${loggedInUser.userId}`])]

      )

 
 
    return parseStringify(urls.documents);
  } catch (error) {
    console.log(error)
  }
}


