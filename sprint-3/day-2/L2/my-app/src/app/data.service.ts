import { Injectable } from '@angular/core';
import { Observable, interval, throwError, Subject } from 'rxjs';
import { takeUntil, catchError, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private destroy$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  // Generate an RxJS observable
  generateObservable(): Observable<any> {
    return interval(600000).pipe(
      takeUntil(this.destroy$),
      switchMap(() => {
        return this.http.get('https://fakestoreapi.com/products').pipe(
          catchError((error: any) => {
            console.error('Error in HTTP request:', error);
            return throwError('Something went wrong.');
          })
        );
      }),
      catchError((error) => {
        console.error('Error in observable:', error);
        return throwError('Something went wrong.');
      })
    );
  }

  // Call this method to clean up the observable
  unsubscribe() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
