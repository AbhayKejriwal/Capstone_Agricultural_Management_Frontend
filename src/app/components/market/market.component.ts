import { Component, OnInit } from '@angular/core';
import { Farm, FarmsService } from '../../services/farms.service';
import { Market, MarketService } from '../../services/market.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
})
export class MarketComponent implements OnInit {
  farms: Farm[] = [];
  marketListings: Market[] = [];
  error: string | null = null;
  loading: boolean = true;
  nofarms: boolean = false;
  role: string = '';

  constructor(
    private marketService: MarketService,
    private farmsService: FarmsService,
    private authService: AuthService
  ) {
    this.role = this.authService.getRole();
  }

  ngOnInit() {
    if (this.role === 'buyer') {
      this.marketService.getMarketListings().subscribe(
        (listings) => {
          this.marketListings = this.marketListings.concat(listings);
          this.loading = false;
        },
        (error) => {
          console.error(error);
          this.error = 'Failed to load market listings';
          this.loading = false;
        }
      );
    } else {
      this.farmsService.getActiveFarms().subscribe(
        (farms) => {
          this.farms = farms;
          if (this.farms.length === 0) {
            this.nofarms = true;
            this.error = 'No farms found. Please add a farm first';
            this.loading = false;
          }
          for (const farm of this.farms) {
            this.marketService.getMarketListingsByFarm(farm._id!).subscribe(
              (listings) => {
                this.marketListings = this.marketListings.concat(listings);
                this.loading = false;
              },
              (error) => {
                console.error(error);
                this.error = 'Failed to load market listings';
                this.loading = false;
              }
            );
          }
        },
        (error) => {
          console.error(error);
          this.error = 'Failed to load farms';
          this.loading = false;
        }
      );
    }
  }

  deleteMarketListing(id: string) {
    const ok = confirm('Are you sure you want to delete this market listing?');
    if (ok) {
      this.marketService.deleteMarketListing(id).subscribe(
        () => {
          this.marketListings = this.marketListings.filter(
            (listing) => listing._id !== id
          );
        },
        (error) => {
          console.error(error);
          alert(`Failed to delete market listing: ${error.error.message}`);
        }
      );
    }
  }

  buyListing(id: string) {
    const ok = confirm('Are you sure you want to buy this listing?');
    if (ok) {
      this.marketService.buyMarketListing(id).subscribe(
        () => {
          this.marketListings = this.marketListings.filter((listing) => listing._id !== id);
        },
        (error) => {
          console.error(error);
          alert(`Failed to buy listing: ${error.error.message}`);
        }
      );
    }
  }
}
