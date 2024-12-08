import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Farm, FarmsService } from '../../../services/farms.service';
import { Finance, FinanceService } from '../../../services/finance.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-finance-forms',
  templateUrl: './finance-forms.component.html'
})
export class FinanceFormsComponent {
  farms: Farm[] = [];
  financeForm: FormGroup;
  editFinanceId!: string;

  constructor(
    private fb: FormBuilder,
    private financeService: FinanceService,
    private farmService: FarmsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.financeForm = this.fb.group({
      farm: ['', Validators.required],
      transactionType: ['', Validators.required],
      amount: ['', Validators.required],
      date: ['', Validators.required],
      details: [''],
    });
  }

  ngOnInit() {
    this.editFinanceId = this.route.snapshot.params['id'];
    if (this.editFinanceId) {
      this.financeService.getFinance(this.editFinanceId).subscribe((result) => {
        //patchvalue will populate the value in the form
        this.financeForm.patchValue({
          farm: result.farm, 
          
        });
      });
    }
    this.farmService.getActiveFarms().subscribe((result) => {
      this.farms = result;
    });
    console.log('id:', this.editFinanceId);
  }

  mapFormToFinance() {
    return {
      farmId: this.financeForm.value.farm._id as string,
      farm: this.financeForm.value.farm.location as string,
      transactionType: this.financeForm.value.transactionType as string,
      amount: this.financeForm.value.amount as number,
      date: this.financeForm.value.date as Date,
      details: this.financeForm.value.details as string || undefined,
    }
  }

  addFinance() {
    if (this.financeForm.valid) {
      // map form value to Finance interface
      const finance: Finance = this.mapFormToFinance();

      this.financeService.createFinance(finance).subscribe(
        () => {
          console.log('Finance created successfully');
          this.navigateToDashboard();
        },
        (error) => {
          console.log('Error:', error);
          alert(`Error in creating Finance: ${error.error.message}`);
        }
      );
    }
    else {
      alert('Please fill all the fields');
    }
  }

  updateFinance() {
    if (this.financeForm.valid) {
      // map form value to Finance interface
      const finance: Finance = this.mapFormToFinance();

      this.financeService.updateFinance(this.editFinanceId, finance).subscribe(
        () => {
          console.log('Finance updated successfully');
          this.navigateToDashboard();
        },
        (error) => {
          console.log('Error:', error);
          alert(`Error in updating Finance: ${error.error.message}`);
        }
      );
    } else {
      alert('Please fill all the fields');
    }
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard'], {
      state: { path: 'finance' }
    }); 
  }
}
