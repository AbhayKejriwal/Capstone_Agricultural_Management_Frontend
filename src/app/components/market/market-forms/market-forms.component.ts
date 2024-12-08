import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Market, MarketService } from '../../../services/market.service';
import { Farm, FarmsService } from '../../../services/farms.service';

@Component({
  selector: 'app-market-forms',
  templateUrl: './market-forms.component.html'
})
export class MarketFormsComponent implements OnInit {
  marketForm: FormGroup;
  editId!: string;
  farms: Farm[] = [];

  constructor(
    private fb: FormBuilder,
    private marketService: MarketService,
    private router: Router,
    private route: ActivatedRoute,
    private farmService: FarmsService
  ) {
    this.marketForm = this.fb.group({
      farm: ['', Validators.required],
      product: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.editId = this.route.snapshot.params['id'];
    if (this.editId) {
      this.marketService.getMarketListing(this.editId).subscribe((result) => {
        this.farmService.getFarm(result.farmId).subscribe((farm) => {
          // console.log('Farm retrieved:', farm);
          this.marketForm.patchValue({
            farm: farm,
            product: result.product,
            price: result.price,
            quantity: result.quantity
          });
          // console.log('Form patched:', this.marketForm.value);
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

  mapFormToMarket() {
    return {
      farmId: this.marketForm.value.farm._id as string,
      farm: this.marketForm.value.farm.location as string,
      product: this.marketForm.value.product as string,
      price: this.marketForm.value.price as number,
      quantity: this.marketForm.value.quantity as number
    };
  }

  addMarketListing() {
    if (this.marketForm.valid) {
      const market: Market = this.mapFormToMarket();
      this.marketService.createMarketListing(market).subscribe(
        () => {
          // console.log('Market listing created successfully');
          this.navigateToDashboard();
        },
        (error) => {
          console.log('Error:', error);
          alert(`Error in creating market listing: ${error.error.message}`);
        }
      );
    } else {
      alert('Please fill all the fields');
    }
  }

  updateMarketListing() {
    if (this.marketForm.valid) {
      const market: Market = this.mapFormToMarket();
      this.marketService.updateMarketListing(this.editId, market).subscribe(
        () => {
          // console.log('Market listing updated successfully');
          this.navigateToDashboard();
        },
        (error) => {
          console.log('Error:', error);
          alert(`Error in updating market listing: ${error.error.message}`);
        }
      );
    } else {
      alert('Please fill all the fields');
    }
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard'], {
      state: { path: 'market' }
    });
  }
}
