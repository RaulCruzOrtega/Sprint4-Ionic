import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Treatment } from '../interfaces/treatment.interface';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private firebase: Firestore) {}

  getTreatments(): Observable<Treatment[]>{
    const treatmentsRef = collection(this.firebase, 'treatments');
    return collectionData(treatmentsRef, {idField: 'id'}) as Observable<Treatment[]>;
  }
}
