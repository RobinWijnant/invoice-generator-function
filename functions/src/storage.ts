import config from "./config";
import * as admin from "firebase-admin";

export const getFile = async (filePath: string) => {
  const buffer = Buffer.from("");
  await admin
    .storage()
    .bucket()
    .file(`${config.storage["bucket-name"]}/${filePath}`)
    .save(buffer);
  return buffer;
};
