import * as xlsx from "xlsx";
import { InvoiceDocument } from "./firestore";
import { formatDate } from "./utils";
// import libre from "libreoffice-convert";

export const createWorkbook = (buffer: Buffer) => {
  return xlsx.read(buffer, { type: "buffer" });
};

export const fillInInvoiceTemplate = (
  workbook: xlsx.WorkBook,
  invoiceDocument: InvoiceDocument
) => {
  const sheetNames = workbook.SheetNames;
  const sheet = workbook.Sheets[sheetNames[0]];
  sheet["A7"] = { v: invoiceDocument.client.fullName };
  sheet["A10"] = { v: `Datum: ${formatDate(invoiceDocument.billingDate)}` };
  sheet["A11"] = {
    v: `Factuurnummer: ${String(invoiceDocument.referenceId).padStart(4, "0")}`,
  };
};

// export const convertToPdf = (workbook: xlsx.WorkBook) => {
//   libre.convert(file, extend, undefined, (err, done) => {
//     if (err) {
//       console.log(`Error converting file: ${err}`);
//     }

//     // Here in done you have pdf file which you can save or transfer in another stream
//     fs.writeFileSync(outputPath, done);
//   });
// };
