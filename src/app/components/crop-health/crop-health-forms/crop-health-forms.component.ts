import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CropHealthService, CropHealth } from '../../../services/crop-health.service';
import { Farm, FarmsService } from '../../../services/farms.service';

@Component({
  selector: 'app-crop-health-forms',
  templateUrl: './crop-health-forms.component.html'
})
export class CropHealthFormsComponent {
  farms: Farm[] = [];
  cropHealthForm: FormGroup;
  editCropId!: string;

  constructor(
    private fb: FormBuilder,
    private cropHealthService: CropHealthService,
    private farmService: FarmsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.cropHealthForm = this.fb.group({
      farm: ['', Validators.required],
      healthStatus: ['', Validators.required],
      issueDetected: [''],
      recommendation: ['']
    });
  }

  ngOnInit() {
    this.editCropId = this.route.snapshot.params['id'];
    // console.log('id:', this.editCropId);
    if (this.editCropId) {
      this.cropHealthService.getCropHealth(this.editCropId).subscribe((result) => {
        this.farmService.getFarm(result.farmId).subscribe((farm) => {
          // console.log('Farm retrieved:', farm);
          this.cropHealthForm.patchValue({
            farm: farm,
            healthStatus: result.healthStatus,
            issueDetected: result.issueDetected,
            recommendation: result.recommendation
          });
          // console.log('Form patched:', this.cropHealthForm.value);
        });
      });
    }
    this.farmService.getActiveFarms().subscribe((result) => {
      this.farms = result;
    });
  }

  compareFarms(farm1: Farm, farm2: Farm): boolean {
    return farm1 && farm2 ? farm1._id === farm2._id : farm1 === farm2;
  }

  mapFormToCropHealth() {
    const cropHealth: CropHealth = {
      farmId: this.cropHealthForm.value.farm._id as string,
      farm: this.cropHealthForm.value.farm.location as string,
      healthStatus: this.cropHealthForm.value.healthStatus as string,
      issueDetected: this.cropHealthForm.value.issueDetected as string,
      recommendation: this.cropHealthForm.value.recommendation as string
    }
    return cropHealth;
  }

  addCropHealth() {
    if (this.cropHealthForm.valid) {
      const cropHealth: CropHealth = this.mapFormToCropHealth();

      this.cropHealthService.createCropHealth(cropHealth).subscribe(
        () => {
          // console.log('cropHealth created successfully');
          this.navigateToDashboard();
        },
        (error) => {
          console.log('Error:', error);
          alert(`Error in creating cropHealth: ${error.error.message}`);
        }
      );
    }
    else {
      alert('Please fill all the fields');
    }
  }

  updateCropHealth() {
    if (this.cropHealthForm.valid) {
      const cropHealth: CropHealth = this.mapFormToCropHealth();

      this.cropHealthService.updateCropHealth(this.editCropId, cropHealth).subscribe(
        () => {
          // console.log('cropHealth updated successfully');
          this.navigateToDashboard();
        },
        (error) => {
          console.log('Error:', error);
          alert(`Error in updating cropHealth: ${error.error.message}`);
        }
      );
    } else {
      alert('Please fill all the fields');
    }
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard'], {
      state: { path: 'crop-health' }
    }); 
  }
}
