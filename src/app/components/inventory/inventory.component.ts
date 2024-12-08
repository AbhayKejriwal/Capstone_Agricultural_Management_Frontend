import { Component } from '@angular/core';
import { Farm, FarmsService } from '../../services/farms.service';
import { Inventory, InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html'
})
export class InventoryComponent {
  farms: Farm[] = [];
  inventory: Inventory[] = [];
  error: string | null = null;
  loading: boolean = true;
  nofarms: boolean = false;

  constructor(
    private inventoryService: InventoryService,
    private farmsService: FarmsService
  ) {}

  ngOnInit() {
    //first we need to fetch all the farms for the current user using FarmService
    //then we need to fetch all the crop healths for each farm using inventoryService
    //this is because we need to display crop healths for all the farms
    //this is a nested request

    this.farmsService.getActiveFarms().subscribe(
      (farms) => {
        this.farms = farms;
        if (this.farms.length === 0) {
          this.nofarms = true;
          this.error = 'No farms found. Please add a farm first';
          this.loading = false;
        }
        for (const farm of this.farms) {
          // if (farm._id === '') {
          //   continue;
          // }
          this.inventoryService.getInventoryByFarm(farm._id!).subscribe(
            (inventory) => {
              this.inventory = this.inventory.concat(inventory);
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
        this.error = 'Failed to load inventory';
        this.loading = false;
      }
    );
  }

  deleteInventory(id: string) {
    const ok = confirm('Are you sure you want to delete this farm?');
    if (ok) {
      this.inventoryService.deleteInventory(id).subscribe(
        () => {
          this.inventory = this.inventory.filter(
            (inventory) => inventory._id !== id
          );
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
