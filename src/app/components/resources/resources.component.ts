import { Component } from '@angular/core';
import { Farm, FarmsService } from '../../services/farms.service';
import { Resource, ResourcesService } from '../../services/resources.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html'
})
export class ResourcesComponent {
  farms: Farm[] = [];
  resources: Resource[] = [];
  error: string | null = null;
  loading: boolean = true;
  nofarms: boolean = false;

  constructor(
    private resourceService: ResourcesService,
    private farmsService: FarmsService
  ) {}

  ngOnInit() {
    this.farmsService.getActiveFarms().subscribe(
      (farms) => {
        this.farms = farms;
        if (this.farms.length === 0) {
          this.nofarms = true;
          this.error = 'No farms found. Please add a farm first';
          this.loading = false;
        }
        for (const farm of this.farms) {
          this.resourceService.getResourcesByFarm(farm._id!).subscribe(
            (resources) => {
              this.resources = this.resources.concat(resources);
              this.loading = false;
            },
            (error) => {
              console.error(error);
              this.error = 'Failed to load resources';
              this.loading = false;
            }
          );
        }
      },
      (error) => {
        console.error(error);
        this.error = 'Failed to load resources';
        this.loading = false;
      }
    );
  }

  deleteResource(id: string) {
    const ok = confirm('Are you sure you want to delete this farm?');
    if (ok) {
      this.resourceService.deleteResource(id).subscribe(
        () => {
          this.resources = this.resources.filter(
            (resources) => resources._id !== id
          );
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
