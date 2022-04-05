import firebase from 'firebase/compat/app';
import { DocumentReference, DocumentData } from '@firebase/firestore-types';

export interface User {
  firstName: string;
  lastName: string;
  subscriptions: string[];
  id: string;
  email: string;
  ref: DocumentReference<DocumentData>;
}

export interface UserData extends firebase.User {
  firstName: string;
  lastName: string;
}

export interface Source {
  name: string;
  id: string;
  ref: DocumentReference<DocumentData>;
  url: string;
}
