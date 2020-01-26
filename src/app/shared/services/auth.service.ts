import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Policy} from '../model/responses/policy.model';
import {AngularFireAuth} from '@angular/fire/auth';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {catchError, map, switchMap} from 'rxjs/operators';
import {auth} from 'firebase';
import {User} from '../model/responses/user.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Path} from '../path';
import {isNull} from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  constructor(private fireStore: AngularFirestore,
              private fireAuth: AngularFireAuth,
              private router: Router,
              private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('token')));
    this.currentUser = this.currentUserSubject.asObservable();
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

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  async loginWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.fireAuth.auth.signInWithPopup(provider);
    localStorage.setItem('google_token', credential.user.uid);
    this.router.navigate(['/dashboard']);
    return this.updateUserData(credential.user);
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(request) {
    return this.http.post<any>(Path.AUTH_LOGIN, JSON.stringify(request), this.httpOptions).pipe(
      map((result) => {
        this.currentUserSubject.next(result.data);
        return result;
      })
    );
  }

  async logout() {
    await this.fireAuth.auth.signOut();
    localStorage.removeItem('token');
    if (!isNull(localStorage.getItem('google_token'))) {
      localStorage.removeItem('google_token');
    }
    this.currentUserSubject.next(null);
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
