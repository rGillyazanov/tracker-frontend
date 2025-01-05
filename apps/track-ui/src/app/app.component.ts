import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DrawerComponent } from '@tracker/drawer';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  imports: [RouterModule, DrawerComponent, Toast],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService],
})
export class AppComponent {}
