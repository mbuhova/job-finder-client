import { Component, OnInit, ViewChild } from '@angular/core';
import { OffersService } from '../services/offers.service';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-offers-search-result',
  templateUrl: './offers-search-result.component.html',
  styleUrls: ['./offers-search-result.component.scss']
})
export class OffersSearchResultComponent implements OnInit {
  offers: any[];
  selectedItem: any;
  displayedColumns: string[] = ['title', 'town', 'businessSector', 'companyName', 'dateCreated', 'isFullTime', 'isPermanent'];
  public dataSource: MatTableDataSource<any>
  private sort: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    if (this.dataSource) this.dataSource.sort = this.sort;
  }

  constructor(private offersService: OffersService, private router: Router) { }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSelectItem(row) {
    this.selectedItem = row;
    this.router.navigate([`/searchOffers/${row.id}`]);
  }

  ngOnInit() {
    this.offers = this.offersService.getData();
    this.dataSource = new MatTableDataSource(this.offers);
      // configure an accessor to skip the default one which tries to parse to number where possible
      // https://github.com/angular/material2/issues/9966#issuecomment-365942460
      this.dataSource.sortingDataAccessor = (data, header) => data[header];

      if (this.sort) this.dataSource.sort = this.sort;
  }
}
