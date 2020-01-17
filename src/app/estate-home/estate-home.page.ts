import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../api/data.service';
import { LoadingController } from '@ionic/angular';

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
    private router: Router
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

        this.loadingController.dismiss();
      }
    });
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
