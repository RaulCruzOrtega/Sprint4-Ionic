import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Treatment } from '../interfaces/treatment.interface';
import { User } from 'src/app/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private firebase: Firestore) {}

  getTreatments(): Observable<Treatment[]>{
    const treatmentsRef = collection(this.firebase, 'treatments');
    return collectionData(treatmentsRef, {idField: 'id'}) as Observable<Treatment[]>;
  }

  getTreatment(id:string): Observable<Treatment>{
    const docRef = doc(this.firebase, `treatments/${id}`);
    return docData(docRef) as Observable<Treatment>;
  }

  getUsers(): Observable<User[]> {
    const userRef = collection(this.firebase, 'users');
    return collectionData(userRef, { idField: 'userDni'}) as Observable<User[]>;
  }

  addUser(User: User) {
    const userRef = collection(this.firebase, 'users');
    return addDoc(userRef, User);
  }
}
