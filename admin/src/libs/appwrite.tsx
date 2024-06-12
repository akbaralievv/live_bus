import { Account, Client, Databases, Storage } from 'appwrite';

const base_url = 'https://cloud.appwrite.io/v1';
const appwrite_project_id = '665b617e0031776b4ed0';

const client = new Client();
client.setEndpoint(base_url).setProject(appwrite_project_id);

export const account = new Account(client);
export const storage = new Storage(client);
export const databases = new Databases(client);
