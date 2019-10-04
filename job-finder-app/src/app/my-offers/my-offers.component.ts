import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { OffersService } from '../services/offers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.scss']
})
export class MyOffersComponent implements OnInit {
  offers: any;
  selectedItem: any;
  displayedColumns: string[] = ['title', 'town', 'businessSector', 'dateCreated', 'isFullTime', 'isPermanent'];
  public dataSource: MatTableDataSource<any>
  private sort: MatSort;

  constructor(private offersService: OffersService, private router: Router) { }

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    if (this.dataSource) this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSelectItem(row) {
    this.selectedItem = row;
    this.router.navigate([`/myOffers/${row.id}`]);
  }

  ngOnInit() {
    this.offersService.getMyOffers().subscribe(response => {
      this.offers = response;
      this.dataSource = new MatTableDataSource(this.offers);
      this.dataSource.sortingDataAccessor = (data, header) => data[header];
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
    });
  }
}
