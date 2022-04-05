import firebase from 'firebase/compat/app';
import { Source, User } from '@/types';

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

export const userConverter = {
  toFirestore(user: User): firebase.firestore.DocumentData {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      subscriptions: user.subscriptions,
      email: user.email,
    };
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): User {
    const data = snapshot.data(options)!;
    return {
      firstName: data.firstName,
      lastName: data.lastName,
      subscriptions: data.subscriptions,
      id: snapshot.id,
      ref: snapshot.ref,
      email: data.email,
    };
  },
};
