import { Component } from '@angular/core';
import { Finance, FinanceService } from '../../services/finance.service';
import { Farm, FarmsService } from '../../services/farms.service';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
})
export class FinanceComponent {
  farms: Farm[] = [];
  finances: Finance[] = [];
  error: string | null = null;
  loading: boolean = true;
  nofarms: boolean = false;
  totalIncome: number = 0;
  totalExpense: number = 0;
  totalCredit: number = 0;

  constructor(
    private financeService: FinanceService,
    private farmsService: FarmsService
  ) {}

  ngOnInit() {
    //first we need to fetch all the farms for the current user using FarmService
    //then we need to fetch all the crop healths for each farm using FinanceService
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
          this.financeService.getFinanceByFarm(farm._id!).subscribe(
            (finances) => {
              this.finances = this.finances.concat(finances);
              this.loading = false;
            },
            (error) => {
              console.error(error);
              this.error = 'Failed to load crop healths';
              this.loading = false;
            }
          );
          this.financeService.getFarmFinance(farm._id!).subscribe(
            (data) => {
              this.totalIncome += data.totalIncome;
              this.totalExpense += data.totalExpense;
              this.totalCredit += data.totalCredit;
            },
            (error) => {
              console.error(error);
            }
          );
        }
      },
      (error) => {
        console.error(error);
        this.error = 'Failed to load finances';
        this.loading = false;
      }
    );
  }

  deleteFinance(id: string) {
    const ok = confirm('Are you sure you want to delete this farm?');
    if (ok) {
      this.financeService.deleteFinance(id).subscribe(
        () => {
          this.finances = this.finances.filter(
            (finances) => finances._id !== id
          );
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
