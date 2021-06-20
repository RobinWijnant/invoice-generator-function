import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as firestore from "./firestore";
import * as storage from "./storage";
import * as xlsx from "./xlsx";
import config from "./config";

admin.initializeApp();

export const sendInvoices = functions
  .region("europe-west1")
  .pubsub.schedule("every 24 hours")
  .onRun(async () => {
    const invoiceDocuments = await firestore.getTodaysInvoiceDocuments();

    if (invoiceDocuments.length === 0) {
      console.log("No invoices that should be send out today.");
      return;
    }

    console.log("Fetching xlsx template");
    const buffer = await storage.getFile(
      config.storage["template-xlsx-file-name"]
    );
    const xlsxInvoice = xlsx.createWorkbook(buffer);

    invoiceDocuments.forEach((invoiceDocument) => {
      console.log(
        `Creating invoice for ${invoiceDocument.client.organization}`
      );

      xlsx.fillInInvoiceTemplate(xlsxInvoice, invoiceDocument);

      console.log(
        `Saving invoice to ${config.storage["output-folder"]} folder in storage`
      );

      const xlsxBuffer = xlsx.createBuffer(xlsxInvoice);
      storage.saveFile(
        `${config.storage["output-folder"]}/${invoiceDocument.referenceId} - ${invoiceDocument.client.organization}.xlsx`,
        xlsxBuffer,
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );

      // const pdfInvoice = xlsx.convertToPdf(xlsxInvoice);
      // Save xslx and pdf to storage bucket
      // Send email to client
      // Send email to myself
      // Update document delivery status
      // Create new invoice document
    });
  });
