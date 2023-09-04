import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class RickMortyApiService {
  private readonly API_URL = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) {}

  getCharacters(page: number = 1): Observable<ApiResponse> {
    return this.http.get(`${this.API_URL}/character/?page=${page}`) as Observable<ApiResponse>;
  }
  getCharacterPages(): Observable<number> {
    return this.http.get<ApiResponse>(`${this.API_URL}/character`).pipe(
      map((result) => result.info.pages)
    );
  }

  getLocations(page: number = 1): Observable<ApiResponse> {
    return this.http.get(`${this.API_URL}/location/?page=${page}`) as Observable<ApiResponse>;
  }
  getLocationPages(): Observable<number> {
    return this.http.get<ApiResponse>(`${this.API_URL}/location`).pipe(
      map((result) => result.info.pages)
    );
  }

  getEpisodes(page: number = 1): Observable<ApiResponse> {
    return this.http.get(`${this.API_URL}/episode/?page=${page}`) as Observable<ApiResponse>;
  }
  getEpisodePages(): Observable<number> {
    return this.http.get<ApiResponse>(`${this.API_URL}/episode`).pipe(
      map((result) => result.info.pages)
    );
  }
  
  // Add other endpoint functions as needed
}
