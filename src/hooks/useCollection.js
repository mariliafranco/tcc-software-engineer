import { useEffect, useState, useRef } from "react";
import { db } from "../config/firebase";
import {
  collection,
  query as firestoreQuery,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

export const useCollection = (collectionName, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);

  const query = useRef(_query).current;

  const orderByRef = useRef(_orderBy).current;

  useEffect(() => {
    let collectionRef = collection(db, collectionName);

    if (query) {
      collectionRef = firestoreQuery(collectionRef, where(...query));
    }
    if (orderByRef) {
      collectionRef = firestoreQuery(collectionRef, orderBy(...orderByRef));
    }

    const unsubscribe = onSnapshot(
      collectionRef,
      (snapshot) => {
        let results = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setDocuments(results);
        setError(null);
        setIsPending(false);
      },
      (error) => {
        console.log(error);
        setError("could not fetch the data");
        setIsPending(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName, query, orderByRef]);

  return { documents, error, isPending };
};
