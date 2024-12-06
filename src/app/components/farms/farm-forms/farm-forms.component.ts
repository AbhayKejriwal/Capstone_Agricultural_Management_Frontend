import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FarmsService } from '../../../services/farms.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-farm-forms',
  templateUrl: './farm-forms.component.html'
})
export class FarmFormsComponent {
  farmForm: FormGroup;
  editFarmId!: string

  constructor(
    private fb: FormBuilder,
    private farmService: FarmsService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.farmForm = this.fb.group({
      location: ['', Validators.required],
      size: ['', Validators.required],
      soilType: [''],
      cropDetails: [''],
      status: ['active']
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

  addFarm(){}

  updateFarm(){}
}
