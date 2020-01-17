import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseURL = 'https://royal-estates-app-f43a0.firebaseio.com/';
  constructor(private http: HttpClient) { }

  public getLocations(): Observable<any> {
    return this.http.get<any>(this.baseURL + 'locations.json').pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    console.error(err);
    return Observable.throw(err);
  }
}
