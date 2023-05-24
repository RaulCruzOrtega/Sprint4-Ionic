import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, query, where, docData, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Treatment } from '../interfaces/treatment.interface';
import { User } from 'src/app/interfaces/user.interface';
import { Contact } from '../interfaces/contact.interface';

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
    return docData(docRef, {idField: 'id'}) as Observable<Treatment>;
  }

  getUsers(): Observable<User[]> {
    const userRef = collection(this.firebase, 'users');
    return collectionData(userRef, { idField: 'userDni'}) as Observable<User[]>;
  }

  addUser(User: User) {
    const userRef = collection(this.firebase, 'users');
    return addDoc(userRef, User);
  }

  getUserwithEmail(email:string): Observable<User[]>{
    const q = query(collection(this.firebase, 'users'), where('userEmail','==', email));
    return collectionData(q, { idField: 'id' }) as Observable<User[]>;
  }

  getInfoCards(): Observable<any[]> {
    const infoCardRef = collection(this.firebase, 'contactUs');
    return collectionData(infoCardRef, { idField: 'id' });
  }

  addContactMessage(Message: Contact) {
    const reviewRef = collection(this.firebase, 'contactMessages');
    return addDoc(reviewRef, Message);
  }

  updateAllergiesInformation(idUser: string, information: string){
    const docRef = doc(this.firebase, `users/${idUser}`);
    updateDoc(docRef, {Alergias: information});
  }

  updateImageUser(idUser: string, fullpat: string){
    const docRef = doc(this.firebase, `users/${idUser}`);
    updateDoc(docRef, {userImage: fullpat});
  }

}
