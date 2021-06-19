import * as admin from "firebase-admin";
import { getDateWithoutTime } from "./utils";

export interface YearlyRecurringInvoiceDocument
  extends FirebaseFirestore.DocumentData {
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

  return firestoreResult.docs.map(
    (querySnapshot) =>
      ({
        id: querySnapshot.id,
        ...querySnapshot.data(),
      } as YearlyRecurringInvoiceDocument)
  );
};
