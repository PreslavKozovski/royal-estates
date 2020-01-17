import { Component, OnInit } from '@angular/core';
import { DataService } from '../api/data.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.page.html',
  styleUrls: ['./locations.page.scss'],
})
export class LocationsPage implements OnInit {
  private promise;
  private locations: any = [];
  constructor(private service: DataService, private loadingController: LoadingController) {}

  ngOnInit() {
    this.showLoading();

    this.promise = this.service.getLocations()
      .subscribe({
        next: locations => {
          this.locations = locations;
          this.loadingController.dismiss();
        }
      });
  }

  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading Locations'
    });
    await loading.present();
  }
}
