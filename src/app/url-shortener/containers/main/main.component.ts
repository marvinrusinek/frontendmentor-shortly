import { Component, OnInit } from '@angular/core';

import { ShortenAPIService } from '../../shared/services/shorten-api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  url = '';
  urlLink = '';
  err = false;
  links: any[] = [];
  errMessage = '';
  showSpinner = false;
  inputErr = '';
  clickedLink: any;

  constructor(private shortenApiService: ShortenAPIService) { }

  ngOnInit(): void {
    this.links = JSON.parse(localStorage.getItem('storedLinks') || '{}');
  }

  // Function to process url shortening request
  onSubmit(): void {
    // if inputs value is null show red warning
    if (this.url === '') {
      this.err = true;
      this.inputErr = 'hsl(0, 87%, 67%)';

      setTimeout(() => {
        this.err = false;
        this.inputErr = '';
      }, 3000);
    } else {
      this.showSpinner = true;

      this.urlLink = this.url;
      this.shortenApiService.getLink(this.urlLink).subscribe(
        (res) => {
          this.showSpinner = false;

          // If there is nothing saved on init, save empty array
          if (localStorage.getItem('storedLinks') === null) {
            localStorage.setItem('storedLinks', '[]');
          }

          // get old data
          this.links = JSON.parse(localStorage.getItem('storedLinks') || '{}');

          /* if links are less than 3 add new link into the link array,
             else shift the first item in the array if items are more than 3 */
          if (this.links.length < 3) {
            this.links.push(res.result);
          } else {
            this.links.shift();
            this.links.push(res.result);
          }

          // Save the updated links array to localstorage
          localStorage.setItem('storedLinks', JSON.stringify(this.links));
        },
        (errMess: any) => {
          this.showSpinner = false;
          this.errMessage = errMess;
          setTimeout(() => {
            this.errMessage = '';
          }, 3000);
        }
      );

      setTimeout(() => {
        this.url = '';
      }, 3000);
    }
  }

  // Click function to change copy style and text
  onClick(i: any): void {
    this.clickedLink = this.links[i];
    setTimeout(() => {
      this.clickedLink = null;
    }, 5000);
  }
}
