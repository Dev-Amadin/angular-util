import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TableSearchService {
  private url = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  findUsers({ userName = '', resultLimit = 5 }: SearchConfig) {
    return this.http.get<User[]>(
      `${this.url}/users?name_like=^${userName}&_limit=${resultLimit}`
    );
  }
}

export interface SearchConfig {
  userName?: string;
  resultLimit?: number;
}

export interface User {
  id: string;
  name: string;
}
