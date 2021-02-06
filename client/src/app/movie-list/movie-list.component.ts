import { Component, OnInit } from '@angular/core';
import {DataAccessService} from '../services/dataAccess/data-access.service';
import {skip} from 'rxjs/operators';
import {Movie} from '../../models/models';
import {Router} from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  loadDone = false;
  public movies: Movie[];

  constructor(private dataService: DataAccessService, private router: Router) { }

  ngOnInit() {
    this.dataService.moviesStream.pipe(
      skip(1)
    ).subscribe(movies => {
      this.loadDone = true;
      this.movies = Array.from(movies.values());
    });
  }

  showDetails(id: string) {
    this.router.navigate([`/movie-details/${id}`]);
  }
}
