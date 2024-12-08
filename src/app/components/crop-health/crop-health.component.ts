import { Component } from '@angular/core';
import {
  CropHealth,
  CropHealthService,
} from '../../services/crop-health.service';
import { Farm, FarmsService } from '../../services/farms.service';

@Component({
  selector: 'app-crop-health',
  templateUrl: './crop-health.component.html',
})
export class CropHealthComponent {
  farms: Farm[] = [];
  cropHealths: CropHealth[] = [];
  error: string | null = null;
  loading: boolean = true;
  nofarms: boolean = false;

  constructor(
    private cropHealthService: CropHealthService,
    private farmsService: FarmsService
  ) {}

  ngOnInit() {
    //first we need to fetch all the farms for the current user using FarmService
    //then we need to fetch all the crop healths for each farm using CropHealthService
    //this is because we need to display crop healths for all the farms
    //this is a nested request

    this.farmsService.getActiveFarms().subscribe(
      (farms) => {
        this.farms = farms;
        if(this.farms.length === 0) {
          this.nofarms = true;
          this.error = 'No farms found. Please add a farm first';
          this.loading = false;
        }
        for (const farm of this.farms) {
          // if (farm._id === '') {
          //   continue;
          // }
          this.cropHealthService.getCropHealthByFarm(farm._id!).subscribe(
            (cropHealths) => {
              this.cropHealths = this.cropHealths.concat(cropHealths);
              this.loading = false;
            },
            (error) => {
              console.error(error);
              this.error = 'Failed to load crop healths';
              this.loading = false;
            }
          );
        }
      },
      (error) => {
        console.error(error);
        this.error = 'Failed to load cropHealths';
        this.loading = false;
      }
    );
  }

  deleteCropHealth(id: string) {
    const ok = confirm('Are you sure you want to delete this farm?');
    if (ok) {
      this.cropHealthService.deleteCropHealth(id).subscribe(
        () => {
          this.cropHealths = this.cropHealths.filter(
            (cropHealths) => cropHealths._id !== id
          );
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

}
