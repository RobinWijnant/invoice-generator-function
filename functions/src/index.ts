import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { config } from "./config";
import * as firestore from "./firestore";
import * as xlsx from "xlsx";

admin.initializeApp();

export const sendInvoices = functions
  .region("europe-west1")
  .pubsub.schedule("every 24 hours")
  .onRun(async () => {
    const todaysInvoiceDocuments = await firestore.getTodaysInvoiceDocuments();

    if (todaysInvoiceDocuments.length === 0) {
      console.log("No invoices that should be send out today.");
      return;
    }

    console.log("Fetching xlsx template");

    const buffer = Buffer.from("");
    await admin
      .storage()
      .bucket()
      .file(
        `${config.storage["bucket-name"]}/${config.storage["template-xlsx-file-name"]}`
      )
      .save(buffer);

    todaysInvoiceDocuments.forEach((todaysInvoiceDocument) => {
      console.log(
        `Creating invoice for ${todaysInvoiceDocument.client.organization}`
      );
      xlsx.read(buffer);
      // Fill in xlsx
      // Convert to PDF
      // Save xslx and pdf to storage bucket
      // Send email to client
      // Send email to myself
      // Update document delivery status
      // Create new invoice document
    });
  });
