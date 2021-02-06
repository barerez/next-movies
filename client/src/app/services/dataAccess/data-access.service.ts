import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Movie} from '../../../models/models';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataAccessService {
  private static MOVIES_API = '/movies';
  private moviesSubject: BehaviorSubject<Map<string, Movie>> = new BehaviorSubject<Map<string, Movie>>(new Map);
  public moviesStream: Observable<Map<string, Movie>> = this.moviesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.http.get(DataAccessService.MOVIES_API).pipe(
      map((movies: Movie[]) => movies.reduce((moviesMap, movie: Movie) => moviesMap.set(movie.id, movie), new Map()))
    ).subscribe(moviesMap => this.moviesSubject.next(moviesMap));
  }
}
