import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthApiService } from '@tracker/core/services';

@Component({
  selector: 'lib-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private readonly _authApiService = inject(AuthApiService);

  ngOnInit(): void {
    this._authApiService.getUser().subscribe(console.log);
  }
}
