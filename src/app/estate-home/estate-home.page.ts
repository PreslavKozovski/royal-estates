import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../api/data.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-estate-home',
  templateUrl: './estate-home.page.html',
  styleUrls: ['./estate-home.page.scss'],
})
export class EstateHomePage implements OnInit, OnDestroy {
  private promise;
  private id = '';
  private city = '';
  private estate: any = {};

  constructor(
    private service: DataService,
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.promise = this.service.getEstate(this.id)
    .subscribe({
      next: estate => {
        const addressArr = estate.address.split(' ');
        this.estate = estate;
        this.city = addressArr[addressArr.length - 1];
        this.storage.set('currentEstate', JSON.stringify(this.estate));

        this.router.navigate(['estate-home/' + this.id + '/overview']);
      }
    });
  }

  ngOnDestroy() {
    this.promise.unsubscribe();
  }
}
