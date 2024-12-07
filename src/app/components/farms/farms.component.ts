import { Component } from '@angular/core';
import { Farm, FarmsService } from '../../services/farms.service';

@Component({
  selector: 'app-farms',
  templateUrl: './farms.component.html',
})
export class FarmsComponent {
  farms: Farm[] = [];
  error: string | null = null;
  loading: boolean = true;

  constructor(private farmsService: FarmsService) {}

  ngOnInit() {
    this.farmsService.getFarms().subscribe(
      (farms) => {
        this.farms = farms;
        this.loading = false;
      },
      (error) => {
        console.error(error);
        this.error = 'Failed to load farms';
        this.loading = false;
      }
    );
  }

  deleteFarm(id: string) {
    const ok = confirm('Are you sure you want to delete this farm?');
    if (ok) {
      this.farmsService.deleteFarm(id).subscribe(
        () => {
          this.farms = this.farms.filter((farm) => farm._id !== id);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
