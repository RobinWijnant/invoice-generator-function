import * as admin from "firebase-admin";
import { getDateWithoutTime } from "./utils";

export interface InvoiceDocument extends FirebaseFirestore.DocumentData {
  id: string;
  referenceId: number;
  client: {
    fullName: string;
    email: string;
    organization: string;
  };
  billingDate: Date;
  isDelivered: boolean;
}

enum Collection {
  YearlyRecurringInvoices = "yearlyRecurringInvoices",
}

export const getTodaysInvoiceDocuments = async () => {
  const firestoreResult = await admin
    .firestore()
    .collection(Collection.YearlyRecurringInvoices)
    .where("isDelivered", "==", false)
    .where("billingDate", "<=", getDateWithoutTime())
    .get();

  return firestoreResult.docs.map((querySnapshot) => {
    const document = querySnapshot.data();
    return {
      id: querySnapshot.id,
      ...document,
      billingDate: new Date(document.billingDate),
    } as InvoiceDocument;
  });
};
