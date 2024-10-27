import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from './account';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiUrl = 'http://localhost:3005/api/v1/accounts';

  constructor(private http: HttpClient) {}

  fetchAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiUrl);
  }
  createAccount(data:Account) {
    return this.http.post<Account>(`${this.apiUrl}` ,data);
  }
  updateAccount(data:Account) {
    return this.http.put<Account>(`${this.apiUrl}/${data.id}` ,data);
  }
  deleteAccount(id:Number) {
    return this.http.delete<Account>(`${this.apiUrl}/${id}`);
  }

}
