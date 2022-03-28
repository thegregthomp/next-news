import firebase from 'firebase/compat/app';
import { DocumentReference, DocumentData } from '@firebase/firestore-types';

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
