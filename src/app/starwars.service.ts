import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom, map, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StarwarsService {
  constructor(private readonly http: HttpClient) {
    this.getAllCharacters().then((chars) => (this.characters = chars));
  }

  characters: character[] = [];

  async getAllCharacters(): Promise<character[]> {
    const response = await firstValueFrom(
      this.http.get<starWarsResponse>(`${environment.api}`)
    );

    console.log('res', response);

    return response.results;
  }

  getAllCharacters2(): Promise<character[]> {
    const response = firstValueFrom(
      this.http.get<starWarsResponse>(`${environment.api}`)
    ).then((response) => {
      return response.results;
    });

    console.log('res', response);

    return Promise.resolve([]);
  }

  getAllCharacters3(): Observable<character[]> {
    return this.http
      .get<starWarsResponse>(`${environment.api}`)
      .pipe(map((res) => res.results));
  }
}

export interface starWarsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: character[];
}

export interface character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}