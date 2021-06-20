import config from "./config";
import * as admin from "firebase-admin";

export const getFile = async (filePath: string) => {
  const [file] = await admin
    .storage()
    .bucket(config.storage["bucket-name"])
    .file(filePath)
    .download();
  return file;
};

export const saveFile = async (
  filePath: string,
  buffer: Buffer,
  contentType: string
) => {
  await admin
    .storage()
    .bucket(config.storage["bucket-name"])
    .file(filePath)
    .save(buffer, { contentType });
};
