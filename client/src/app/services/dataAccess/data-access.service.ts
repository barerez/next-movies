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
  public readonly moviesStream: Observable<Map<string, Movie>> = this.moviesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.http.get(DataAccessService.MOVIES_API).pipe(
      map((movies: Movie[]) => movies.reduce((moviesMap, movie: Movie) => {
        movie.rating = +movie.rating;
        movie.released = +movie.released;
        movie.synopsis = DataAccessService.htmlDecode(movie.synopsis).split('<br>')[0];
        moviesMap.set(movie.id, movie);
        return moviesMap;
      }, new Map()))
    ).subscribe(moviesMap => this.moviesSubject.next(moviesMap));
  }

  static htmlDecode(input) {
    const e = document.createElement('textarea');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
  }
}
