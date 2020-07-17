import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Appconst } from '../app-constant/app-constant';
import { DatePipe } from '@angular/common';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CommonService {

  constructor(private fireStore: AngularFirestore, private fbAuth: AngularFireAuth,
    private _datePipe: DatePipe) { }

  createCustomerProfile(request: any) {
    request.id = this.getUserId;
    const insertpath = `${Appconst.profileUserPath}`;
    return this.fireStore.collection(insertpath).add(request);
  }

  addSellTrashDetails(request: any) {
    request.id = this.getUserId;
    const insertpath = `${Appconst.sellTrshPath}`;
    return this.fireStore.collection(insertpath).add(request);
  }

  private get getUserId() {
    const userId = this.fbAuth.auth.currentUser;
    if (userId) {
      return userId.uid;
    } else {
      const formatDate = this._datePipe.transform(new Date(), 'yyyyMMddhhmmss');
      const randomNumb = Math.round(Math.random() * 1000) + '';
      const generateUID = formatDate + randomNumb;
      return generateUID;
    }
  }

  getTrashList() {
    const trashColloction = `${Appconst.sellTrshPath}`;
    return this.fireStore.collection(trashColloction).snapshotChanges().pipe(
      map(changes => {
        return changes.map(res => {
          const respose: any = res.payload.doc.data();
          respose.docId = res.payload.doc.id;
          return respose;
        })
      })
    );
  }

  getFilteredTrashList(selectedDate) {
    const collPath = `${Appconst.sellTrshPath}`;
    return this.fireStore.collection(collPath, ref => ref.where('pickupDate', '>=', selectedDate)).snapshotChanges()
      .pipe(map(changes => {
        return changes.map(res => {
          const respose: any = res.payload.doc.data();
          respose.docId = res.payload.doc.id;
          return respose;
        })
      }));
  }

}
