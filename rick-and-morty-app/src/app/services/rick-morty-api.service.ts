import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, forkJoin, map, mergeMap, tap } from 'rxjs'
import { ApiResponse } from '../models/ApiResponse'
import { Episode } from '../models/Episode'
import { Character } from '../models/Character'
import { User } from '../models/User'
import { LoginUser } from '../models/LoginUser'

export const API_URL = 'http://localhost:3000'

@Injectable({
  providedIn: 'root'
})
export class RickMortyApiService {

  constructor(private http: HttpClient) { }

  getCharacters(query: string): Observable<ApiResponse> {
    return this.http.get(`${API_URL}/character/?${query}`) as Observable<ApiResponse>
  }
  getSpecificCharacters(characterIds: string): Observable<Character[]> {
    return this.http.get(`${API_URL}/character/${characterIds}`) as Observable<Character[]>
  }
  getCharacterPages(): Observable<number> {
    return this.http.get<ApiResponse>(`${API_URL}/character`).pipe(
      map((result) => result.info.pages)
    )
  }

  getLocations(query: string): Observable<ApiResponse> {
    return this.http.get(`${API_URL}/location/?${query}`) as Observable<ApiResponse>
  }
  getLocationPages(): Observable<number> {
    return this.http.get<ApiResponse>(`${API_URL}/location`).pipe(
      map((result) => result.info.pages)
    )
  }

  getEpisodes(query: string): Observable<ApiResponse> {
    return this.http.get(`${API_URL}/episode/?${query}`) as Observable<ApiResponse>
  }
  getEpisodePages(): Observable<number> {
    return this.http.get<ApiResponse>(`${API_URL}/episode`).pipe(
      map((result) => result.info.pages)
    )
  }
  getAllEpisodes(): Observable<Episode[]> {
    return this.http.get<any>(`${API_URL}/episode`).pipe(
      mergeMap(firstPageResponse => {
        const totalPages = firstPageResponse.info.pages
        const episodeRequests = []

        for (let i = 1; i <= totalPages; i++) {
          episodeRequests.push(this.http.get<any>(`${API_URL}/episode/?page=${i}`))
        }

        return forkJoin(episodeRequests)
      }),
      mergeMap(responses => [[].concat(...responses.map(res => res.results))])
    )
  }

  register(user: User) {
    return this.http.post<any>(`${API_URL}/user/register`, user,
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  login(user: LoginUser) {
    return this.http.post<any>(`${API_URL}/auth/login`, user,
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

}
