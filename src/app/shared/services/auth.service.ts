import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Policy} from '../model/responses/policy.model';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {auth} from 'firebase';
import {User} from '../model/responses/user.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Path} from '../path';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;
  constructor(private fireStore: AngularFirestore,
              private fireAuth: AngularFireAuth,
              private router: Router,
              private http: HttpClient) {
    this.user$ = fireAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return fireStore.doc<Policy>(`user/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async loginWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.fireAuth.auth.signInWithPopup(provider);
    localStorage.setItem('token', credential.user.uid);
    this.router.navigate(['/dashboard']);
    return this.updateUserData(credential.user);
  }

  login(request) {
    console.log(Path.AUTH_LOGIN);
    return this.http.post<any>(Path.AUTH_LOGIN, request).pipe(
      map((result) => {
        return result;
      })
    );
  }

  async logout() {
    await this.fireAuth.auth.signOut();
    localStorage.removeItem('token');
    return this.router.navigate(['/login']);
  }

  async createUserData(user: User) {
    return this.fireStore.collection('policies').add(user);
  }

  updateUserData({uid, email, displayName, photoURL}: User) {
    const userRef: AngularFirestoreDocument<User> = this.fireStore.doc(`user/${uid}`);
    const data = {
      uid,
      email,
      displayName,
      photoURL
    };
    return userRef.set(data, {merge: true});
  }

  deletePolicies(policyId: string) {
    this.fireStore.doc('policies/' + policyId).delete();
  }
}
