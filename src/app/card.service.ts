import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private apiUrl = 'https://githubanotaai.github.io/frontend-interview-mock-data/cardlist.json';

  constructor(private http: HttpClient) {}

  getCards(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}