import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Farm, FarmsService } from '../../../services/farms.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-farm-forms',
  templateUrl: './farm-forms.component.html',
})
export class FarmFormsComponent {
  farmForm: FormGroup;
  editFarmId!: string;

  constructor(
    private fb: FormBuilder,
    private farmService: FarmsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.farmForm = this.fb.group({
      location: ['', Validators.required],
      size: ['', Validators.required],
      soilType: ['', Validators.required],
      cropDetails: ['', Validators.required],
      status: ['active'],
    });
  }

  ngOnInit() {
    this.editFarmId = this.route.snapshot.params['id'];
    if (this.editFarmId) {
      this.farmService.getFarm(this.editFarmId).subscribe((result) => {
        this.farmForm.patchValue(result); //patchvalue will populate the value in the form
      });
    }
    console.log('id:', this.editFarmId);
  }

  mapFormToFarm() {
    const farm: Farm = {
      location: this.farmForm.value.location as string,
      size: this.farmForm.value.size as number,
      soilType: this.farmForm.value.soilType as string,
      cropDetails: this.farmForm.value.cropDetails as string,
      status: this.farmForm.value.status as string,
    }
    return farm;
  }

  addFarm() {
    if (this.farmForm.valid) {
      // map form value to Farm interface
      const farm: Farm = this.mapFormToFarm();

      this.farmService.createFarm(farm).subscribe(
        (result) => {
          console.log('Farm created successfully');
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.log('Error:', error);
          alert('Error in creating farm');
        }
      );
    }
    else {
      alert('Please fill all the fields');
    }
  }

  updateFarm() {
    if (this.farmForm.valid) {
      // map form value to Farm interface
      const farm: Farm = this.mapFormToFarm();

      this.farmService.updateFarm(this.editFarmId, farm).subscribe(
        () => {
          console.log('Farm updated successfully');
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.log('Error:', error);
          alert('Error in updating farm');
        }
      );
    }
    else {
      alert('Please fill all the fields');
    }
  }

}
