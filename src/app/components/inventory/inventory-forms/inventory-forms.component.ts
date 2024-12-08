import { Component } from '@angular/core';
import { Farm, FarmsService } from '../../../services/farms.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Inventory, InventoryService } from '../../../services/inventory.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inventory-forms',
  templateUrl: './inventory-forms.component.html'
})
export class InventoryFormsComponent {
  farms: Farm[] = [];
  inventoryForm: FormGroup;
  editId!: string;

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private farmService: FarmsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.inventoryForm = this.fb.group({
      farm: ['', Validators.required],
      itemType: ['', Validators.required],
      quantity: ['', Validators.required],
      lastUpdated: ['']      
    });
  }

  ngOnInit() {
    this.editId = this.route.snapshot.params['id'];
    if (this.editId) {
      this.inventoryService.getInventory(this.editId).subscribe((result) => {
        //patchvalue will populate the value in the form
        this.inventoryForm.patchValue({
          farm: result.farm, 
          
        });
      });
    }
    this.farmService.getActiveFarms().subscribe((result) => {
      this.farms = result;
    });
    console.log('id:', this.editId);
  }

  mapFormToInventory() {
    return {
      farmId: this.inventoryForm.value.farm._id as string,
      farm: this.inventoryForm.value.farm.location as string,
      itemType: this.inventoryForm.value.itemType as string,
      quantity: this.inventoryForm.value.quantity as number,
      lastUpdated: this.inventoryForm.value.lastUpdated as Date || undefined,
    }
  }

  addInventory() {
    if (this.inventoryForm.valid) {
      // map form value to Inventory interface
      const inventory: Inventory = this.mapFormToInventory();

      this.inventoryService.createInventory(inventory).subscribe(
        () => {
          console.log('Inventory created successfully');
          this.navigateToDashboard();
        },
        (error) => {
          console.log('Error:', error);
          alert(`Error in creating Inventory: ${error.error.message}`);
        }
      );
    }
    else {
      alert('Please fill all the fields');
    }
  }

  updateInventory() {
    if (this.inventoryForm.valid) {
      // map form value to Inventory interface
      const inventory: Inventory = this.mapFormToInventory();

      this.inventoryService.updateInventory(this.editId, inventory).subscribe(
        () => {
          console.log('Inventory updated successfully');
          this.navigateToDashboard();
        },
        (error) => {
          console.log('Error:', error);
          alert(`Error in updating Inventory: ${error.error.message}`);
        }
      );
    } else {
      alert('Please fill all the fields');
    }
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard'], {
      state: { path: 'inventory' }
    }); 
  }
}
