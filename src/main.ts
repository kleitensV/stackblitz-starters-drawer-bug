import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { VudButtonModule, VudIconModule } from '@vismaux/ngx-vud';
import 'zone.js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports:[
    VudButtonModule
  ],
  template: `
    <h1>Hello from {{ name }}!</h1>
    <button vudButton> Add new</button>
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
