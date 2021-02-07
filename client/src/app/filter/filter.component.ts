import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FilterState} from '../../models/models';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() years: number[];
  @Output() filterChanged: EventEmitter<FilterState> = new EventEmitter();
  filterState: FilterState;

  constructor() {
    this.filterState = new FilterState(0, 0);
  }

  ngOnInit() {
  }

  yearSelected(year: number) {
    this.filterState.year = year;
    this.filterChanged.emit(this.filterState);
  }

  clearFilters() {
    this.filterState = new FilterState(0, 0);
    this.filterChanged.emit(this.filterState);
  }

  rateFilterSelected(rate: any) {
    this.filterState.rating = rate;
    this.filterChanged.emit(this.filterState);
  }

}
