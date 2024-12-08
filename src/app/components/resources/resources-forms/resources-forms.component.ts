import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourcesService, Resource } from '../../../services/resources.service';
import { FarmsService, Farm } from '../../../services/farms.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resources-forms',
  templateUrl: './resources-forms.component.html'
})
export class ResourcesFormsComponent {
  resourceForm: FormGroup;
  farms: Farm[] = [];
  editId!: string;

  constructor(
    private fb: FormBuilder,
    private resourcesService: ResourcesService,
    private farmService: FarmsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.resourceForm = this.fb.group({
      farm: ['', Validators.required],
      itemType: ['', Validators.required],
      quantity: ['', Validators.required],
      usageDate: ['']
    });
  }

  ngOnInit() {
    this.editId = this.route.snapshot.params['id'];
    if (this.editId) {
      this.resourcesService.getResource(this.editId).subscribe((result) => {
        this.farmService.getFarm(result.farmId).subscribe((farm) => {
          // console.log('Farm retrieved:', farm);
          const formattedDate = result.usageDate ? new Date(result.usageDate).toISOString().split('T')[0] : '';
          this.resourceForm.patchValue({
            farm: farm,
            itemType: result.itemType,
            quantity: result.quantity,
            usageDate: formattedDate
          });
          // console.log('Form patched:', this.resourceForm.value);
        });
      });
    }
    this.farmService.getActiveFarms().subscribe((result) => {
      this.farms = result;
    });
    // console.log('id:', this.editId);
  }

  mapFormToResource() {
    return {
      farmId: this.resourceForm.value.farm._id as string,
      farm: this.resourceForm.value.farm.location as string,
      itemType: this.resourceForm.value.itemType as string,
      quantity: this.resourceForm.value.quantity as number,
      usageDate: this.resourceForm.value.usageDate as Date || undefined,
    }
  }

  addResource() {
    if (this.resourceForm.valid) {
      const resource: Resource = this.mapFormToResource();

      this.resourcesService.createResource(resource).subscribe(
        () => {
          // console.log('Resource created successfully');
          this.navigateToDashboard();
        },
        (error) => {
          console.log('Error:', error);
          alert(`Error in creating Resource: ${error.error.message}`);
        }
      );
    } else {
      alert('Please fill all the fields');
    }
  }

  updateResource() {
    if (this.resourceForm.valid) {
      const resource: Resource = this.mapFormToResource();

      this.resourcesService.updateResource(this.editId, resource).subscribe(
        () => {
          // console.log('Resource updated successfully');
          this.navigateToDashboard();
        },
        (error) => {
          console.log('Error:', error);
          alert(`Error in updating Resource: ${error.error.message}`);
        }
      );
    } else {
      alert('Please fill all the fields');
    }
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard'], {
      state: { path: 'resources' }
    });
  }

  // Add this method to handle farm comparison in the select
  compareFarms(farm1: Farm, farm2: Farm): boolean {
    return farm1 && farm2 ? farm1._id === farm2._id : farm1 === farm2;
  }
}
