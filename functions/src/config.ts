import * as functions from "firebase-functions";

export interface Config {
  storage: {
    bucket: string;
    templateXlsxFileName: string;
  };
}

export const config = functions.config() as Config;
