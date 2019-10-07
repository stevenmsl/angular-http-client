import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-http-client';
  showConfig = true;
  showSearch = true;
  showUploader = true;

  toggleConfig() { this.showConfig = !this.showConfig; }
  toggleSearch() { this.showSearch = !this.showSearch; }
  toggleUploader() { this.showUploader = !this.showUploader;}

}
