import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DrawerComponent } from '@tracker/apps/track-ui/drawer';
import { Toast } from 'primeng/toast';

@Component({
  imports: [RouterModule, DrawerComponent, Toast],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
