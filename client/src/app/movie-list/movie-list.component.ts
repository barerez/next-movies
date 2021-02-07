import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataAccessService} from '../services/dataAccess/data-access.service';
import {FilterState, Movie} from '../../models/models';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit, OnDestroy {
  loadDone = false;
  private movies: Movie[];
  public filteredMovies: Movie[];
  years: number[];
  private subscription: Subscription;

  constructor(private dataService: DataAccessService, private router: Router) { }

  ngOnInit() {
    this.subscription = this.dataService.moviesStream.subscribe(movies => {
      this.loadDone = true;
      this.movies = Array.from(movies.values());
      this.filteredMovies = this.movies;
      this.years = Array.from(this.movies.reduce((acc, movie) => acc.add(movie.released), new Set())).sort();
    });
  }

  showDetails(id: string) {
    this.router.navigate([`/movie-details/${id}`]);
  }

  private applyFilters(filters: FilterState) {
    this.filteredMovies = this.movies
      .filter(movie => movie.released >= filters.year
        && movie.rating > filters.rating);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
