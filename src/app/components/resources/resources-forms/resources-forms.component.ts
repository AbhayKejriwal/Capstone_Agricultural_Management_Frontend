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
        this.resourceForm.patchValue({
          farm: result.farm,
          itemType: result.itemType,
          quantity: result.quantity,
          usageDate: result.usageDate
        });
      });
    }
    this.farmService.getActiveFarms().subscribe((result) => {
      this.farms = result;
    });
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
          console.log('Resource created successfully');
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
          console.log('Resource updated successfully');
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
}
