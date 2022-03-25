import firebase from 'firebase/compat/app';

export interface UserData extends firebase.User {
  firstName: string;
  lastName: string;
}
