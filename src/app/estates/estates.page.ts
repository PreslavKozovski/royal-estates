import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../api/data.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-estates',
  templateUrl: './estates.page.html',
  styleUrls: ['./estates.page.scss'],
})
export class EstatesPage implements OnInit, OnDestroy {
  private promise;
  private name = '';
  private locationEstates: any = [];
  constructor(
    private service: DataService,
    private loadingController: LoadingController,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.showLoading();
    this.name = this.activatedRoute.snapshot.paramMap.get('name');
    this.promise = this.service.getLocationEstates(this.name)
    .subscribe({
      next: locationEstates => {
        this.locationEstates = locationEstates;
        this.loadingController.dismiss();
      }
    });
  }

  ngOnDestroy() {
    this.promise.unsubscribe();
  }

  onViewClick(id: string) {
    this.router.navigate(['/estate-home', id]);
  }

  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading Location Estates'
    });
    await loading.present();
  }
}
