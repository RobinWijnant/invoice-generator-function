import * as functions from "firebase-functions";

export interface Config {
  storage: {
    "bucket-name": string;
    "template-xlsx-file-name": string;
  };
}

const config = functions.config() as Config;
export default config;
