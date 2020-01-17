import { Component, OnInit, OnDestroy } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as _ from 'lodash';
import { LoadingController } from '@ionic/angular';
import { DataService } from '../../../api/data.service';

@Component({
  selector: 'app-similar',
  templateUrl: './similar.page.html',
  styleUrls: ['./similar.page.scss'],
})
export class SimilarPage implements OnInit, OnDestroy {
  private promise;
  private estate: any = {};
  private city = '';
  private allLocationEstates: any = [];
  private locationEstates: any = [];
  private filterValue = 'House';
  private toggleValue = false;
  private isFilterDisabled = !this.toggleValue;
  private regionValue = 'all';

  constructor(
    private service: DataService,
    private storage: Storage,
    private loadingController: LoadingController
  ) { }

  ngOnInit() { }

  async ionViewWillEnter() {
    this.showLoading();
    await this.storage.get('currentEstate').then((val) => {
      if (val != null) {
        this.estate = JSON.parse(val);
        const addressArr = this.estate.address.split(' ');
        this.city = addressArr[addressArr.length - 1];
      }
    });
    this.promise = this.service.getLocationEstates(this.city)
    .subscribe({
      next: locationEstates => {
        this.allLocationEstates = locationEstates;
        this.locationEstates = locationEstates;
        this.loadingController.dismiss();
      }
    });
  }

  onToggleChange() {
    this.isFilterDisabled = this.toggleValue;
    this.toggleValue = !this.toggleValue;

    this.filterData();
  }

  onFilterChange(ev) {
    this.filterValue = ev.target.value;

    this.filterData();
  }

  onRegionChange() {
    if (this.regionValue === 'all') {
      this.regionValue = 'region';
    } else {
      this.regionValue = 'all';
    }

    this.filterData();
  }

  filterData() {
    const that = this;
    const data = [];

    if (that.regionValue === 'region') {
      that.allLocationEstates.forEach( (e, i) => {
        if (that.estate.region === e.region) {
          data.push(e);
        }
      });
    } else {
      that.allLocationEstates.forEach( (e, i) => {
        data.push(e);
      });
      console.log(data);
    }
    console.log(data);

    if (that.toggleValue) {
      data.forEach( (e, i) => {
        // data[i].estates = _.filter(e, o => {
        //   console.log(o.type);
        //   console.log(that.filterValue);
        //   return o.type === that.filterValue;
        // });
        data[i].estates = _.filter(e.estates, {type: that.filterValue});
      });
    }

    this.locationEstates = data;
  }

  ngOnDestroy() {
    this.promise.unsubscribe();
  }

  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading Location Estates'
    });
    await loading.present();
  }
}
