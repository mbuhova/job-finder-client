import { Component, OnInit, ViewChild } from '@angular/core';
import { OffersService } from '../services/offers.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-my-offer-details',
  templateUrl: './my-offer-details.component.html',
  styleUrls: ['./my-offer-details.component.scss']
})
export class MyOfferDetailsComponent implements OnInit {
  offer: any;
  selectedItem: any;
  displayedColumns: string[] = [];
  public dataSource: MatTableDataSource<any>
  private sort: MatSort;

  constructor(private offersService: OffersService, 
    private route: ActivatedRoute,
    private router: Router) { }

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    if (this.dataSource) this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSelectItem(row) {
    this.selectedItem = row;
  }

  ngOnInit() {
    const offerId = this.route.snapshot.paramMap.get("id");
    this.offersService.getMyOfferDetails(offerId).subscribe(response => {
      this.offer = response;
      this.dataSource = new MatTableDataSource(this.offer.applications);
      this.dataSource.sortingDataAccessor = (data, header) => data[header];
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
    });
  }
}
