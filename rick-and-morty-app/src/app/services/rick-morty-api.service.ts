import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string | null;
  };
  results: any[]
}

@Injectable({
  providedIn: 'root'
})
export class RickMortyApiService {
  private readonly API_URL = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) {}

  getCharacters(page: number = 1): Observable<any> {
    return this.http.get(`${this.API_URL}/character/?page=${page}`);
  }

  getCharacterPages(): Observable<any> {
    return this.http.get<ApiResponse>(`${this.API_URL}/character`).pipe(
      map((result) => result.info.pages)
    );
  }

  getLocations(page: number = 1): Observable<any> {
    return this.http.get(`${this.API_URL}/location/?page=${page}`);
  }

  getLocationPages(): Observable<any> {
    return this.http.get<ApiResponse>(`${this.API_URL}/location`).pipe(
      map((result) => result.info.pages)
    );
  }

  getEpisodes(page: number = 1): Observable<any> {
    return this.http.get(`${this.API_URL}/episode/?page=${page}`);
  }

  getEpisodePages(): Observable<any> {
    return this.http.get<ApiResponse>(`${this.API_URL}/episode`).pipe(
      map((result) => result.info.pages)
    );
  }
  
  // Add other endpoint functions as needed
}
