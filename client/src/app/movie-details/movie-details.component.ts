import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataAccessService} from '../services/dataAccess/data-access.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Movie} from '../../models/models';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  constructor(private dataService: DataAccessService, private route: ActivatedRoute, private router: Router) { }
  private id: string;
  private movie: Movie;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.subscription = this.dataService.moviesStream.subscribe(result => {
      this.movie =  result.get(this.id);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  backToLobby() {
    this.router.navigate(['']);
  }
}
