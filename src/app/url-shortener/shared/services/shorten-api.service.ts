import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { Shortcode } from '../../shared/shortcode';

@Injectable({
  providedIn: 'root',
})
export class ShortenAPIService {
  errMessage = '';
  constructor(private http: HttpClient) {}

  handleError(error: HttpErrorResponse | any): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      this.errMessage = error.error.message;
    } else {
      this.errMessage = `${error.status} - ${error.statusText || ''}
      ${error.error}`;
    }
    return throwError(this.errMessage);
  }

  getLink(link: string): Observable<Shortcode> {
    return this.http.get<Shortcode>(`https://api.shrtco.de/v2/shorten?url=${link}`)
              .pipe(catchError(this.handleError));
  }
}
