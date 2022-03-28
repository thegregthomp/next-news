import firebase from 'firebase/compat/app';
import { Source } from '@/types';

export const sourceConverter = {
  toFirestore(source: Source): firebase.firestore.DocumentData {
    return { name: source.name, url: source.url };
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): Source {
    const data = snapshot.data(options)!;
    return {
      name: data.name,
      id: snapshot.id,
      ref: snapshot.ref,
      url: data.url,
    };
  },
};
