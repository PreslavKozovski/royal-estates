import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../api/data.service';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-estate-home',
  templateUrl: './estate-home.page.html',
  styleUrls: ['./estate-home.page.scss'],
})
export class EstateHomePage implements OnInit, OnDestroy {
  private promise;
  private id = '';
  private region = '';
  private estate: any = {};

  constructor(
    private service: DataService,
    private loadingController: LoadingController,
    private activatedRoute: ActivatedRoute,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.showLoading();
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.promise = this.service.getEstate(this.id)
    .subscribe({
      next: estate => {
        const addressArr = estate.address.split(' ');
        this.estate = estate;
        this.region = addressArr[addressArr.length - 1];
        this.storage.set('currentEstate', JSON.stringify(this.estate));

        this.loadingController.dismiss();
      }
    });
  }

  ngOnDestroy() {
    this.promise.unsubscribe();
  }

  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading Estate'
    });
    await loading.present();
  }

}
