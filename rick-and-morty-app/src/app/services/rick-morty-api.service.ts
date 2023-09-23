import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, forkJoin, map, mergeMap, tap } from 'rxjs'
import { ApiResponse } from '../models/ApiResponse'
import { Episode } from '../models/Episode'
import { Character } from '../models/Character'
import { User } from '../models/User'
import { LoginUser } from '../models/LoginUser'
import { Store } from '@ngrx/store'
import { selectToken } from '../store/selectors/user.selectors'
import { Suggestion } from '../models/Suggestion'

export const API_URL = 'http://localhost:3000'

@Injectable({
  providedIn: 'root'
})
export class RickMortyApiService {

  private header!: {
    headers: HttpHeaders
  }

  constructor(private http: HttpClient, private store: Store) {
    this.store.select(selectToken).subscribe(token => this.header = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    })
  }

  getCharacters(query: string): Observable<ApiResponse> {
    return this.http.get(`${API_URL}/character/?${query}`,
      this.header) as Observable<ApiResponse>
  }
  getSpecificCharacters(characterIds: string): Observable<Character[]> {
    return this.http.get(`${API_URL}/character/${characterIds}`,
      this.header) as Observable<Character[]>
  }
  getCharacterPages(): Observable<number> {
    return this.http.get<ApiResponse>(`${API_URL}/character`,
      this.header).pipe(
        map((result) => result.info.pages)
      )
  }

  getLocations(query: string): Observable<ApiResponse> {
    return this.http.get(`${API_URL}/location/?${query}`,
      this.header) as Observable<ApiResponse>
  }
  getLocationPages(): Observable<number> {
    return this.http.get<ApiResponse>(`${API_URL}/location`,
      this.header).pipe(
        map((result) => result.info.pages)
      )
  }

  getEpisodes(query: string): Observable<ApiResponse> {
    return this.http.get(`${API_URL}/episode/?${query}`,
      this.header) as Observable<ApiResponse>
  }
  getEpisode(id: number): Observable<Episode[]> {
    return this.http.get(`${API_URL}/episode/${id}`,
      this.header) as Observable<Episode[]>
  }
  getEpisodePages(): Observable<number> {
    return this.http.get<ApiResponse>(`${API_URL}/episode`,
      this.header).pipe(
        map((result) => result.info.pages)
      )
  }
  getAllEpisodes(): Observable<Episode[]> {
    return this.http.get<any>(`${API_URL}/episode`,
      this.header).pipe(
        mergeMap(firstPageResponse => {
          const totalPages = firstPageResponse.info.pages
          const episodeRequests = []

          for (let i = 1; i <= totalPages; i++) {
            episodeRequests.push(this.http.get<any>(`${API_URL}/episode/?page=${i}`,
              this.header))
          }

          return forkJoin(episodeRequests)
        }),
        mergeMap(responses => [[].concat(...responses.map(res => res.results))])
      )
  }
  likeEpisode(id: number, user_id: number) {
    return this.http.put<any>(`${API_URL}/episode/like/${id}/user/${user_id}`, this.header) as Observable<Episode>
  }
  dislikeEpisode(id: number, user_id: number) {
    return this.http.put<any>(`${API_URL}/episode/dislike/${id}/user/${user_id}`, this.header) as Observable<Episode>
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

  logout(id: number) {
    return this.http.get<any>(`${API_URL}/user/logout/${id}`,
      this.header)
  }

  getAllSuggestions() {
    return this.http.get<any>(`${API_URL}/suggestion`,
      this.header)
  }
  sendSuggestion(suggestion: Suggestion) {
    return this.http.post<any>(`${API_URL}/suggestion/add`, suggestion,
      this.header)
  }

}
