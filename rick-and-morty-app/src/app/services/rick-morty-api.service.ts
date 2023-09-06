import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, forkJoin, map, mergeMap } from 'rxjs'
import { ApiResponse } from '../models/ApiResponse'
import { Episode } from '../models/Episode'

export const API_URL = 'https://rickandmortyapi.com/api'

@Injectable({
  providedIn: 'root'
})
export class RickMortyApiService {

  constructor(private http: HttpClient) { }

  getCharacters(page: number = 1): Observable<ApiResponse> {
    return this.http.get(`${API_URL}/character/?page=${page}`) as Observable<ApiResponse>
  }
  getCharacterPages(): Observable<number> {
    return this.http.get<ApiResponse>(`${API_URL}/character`).pipe(
      map((result) => result.info.pages)
    )
  }

  getLocations(page: number = 1): Observable<ApiResponse> {
    return this.http.get(`${API_URL}/location/?page=${page}`) as Observable<ApiResponse>
  }
  getLocationPages(): Observable<number> {
    return this.http.get<ApiResponse>(`${API_URL}/location`).pipe(
      map((result) => result.info.pages)
    )
  }

  getEpisodes(page: number = 1): Observable<ApiResponse> {
    return this.http.get(`${API_URL}/episode/?page=${page}`) as Observable<ApiResponse>
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
}
