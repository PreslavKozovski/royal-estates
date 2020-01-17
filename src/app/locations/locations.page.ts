import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../api/data.service';
import { LoadingController, NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.page.html',
  styleUrls: ['./locations.page.scss'],
})
export class LocationsPage implements OnInit, OnDestroy {
  private promise;
  private locations: any = [];
  constructor(
    private service: DataService,
    private loadingController: LoadingController,
    private navCtl: NavController,
    private router: Router
  ) {}

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

  ngOnDestroy() {
    this.promise.unsubscribe();
  }

  locationClick(name: string) {
    this.router.navigate(['/estates', name]);
  }

  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading Locations'
    });
    await loading.present();
  }
}
