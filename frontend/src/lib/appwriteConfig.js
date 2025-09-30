import { Client, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://fra.cloud.appwrite.io/v1") 
  .setProject("68daf8740015d38e016a");

const databases = new Databases(client);

export { client, databases };
