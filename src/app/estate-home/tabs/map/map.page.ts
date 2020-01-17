import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  private estate: any = {};

  constructor(
    private loadingController: LoadingController,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.showLoading();
    this.storage.get('currentEstate').then((val) => {
      if (val != null) {
        this.estate = JSON.parse(val);
      }

      this.loadingController.dismiss();
    });
  }

  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading Map'
    });
    await loading.present();
  }

}
