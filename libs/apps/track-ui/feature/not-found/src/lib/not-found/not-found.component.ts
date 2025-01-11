import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnDestroy,
  resource,
  signal,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { getRandomGif } from '@tracker/utils/wikiquote';
import { interval } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RandomKeyService } from '../services/random-key.service';

@Component({
  selector: 'lib-not-found',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RandomKeyService],
})
export class NotFoundComponent implements OnDestroy {
  private readonly _randomKeyService = inject(RandomKeyService);

  roflImage = signal<string>('assets/stickers/gosha/sit.png');
  translation = signal<{ key: string; value: string } | null>({
    key: 'ru',
    value: 'Страница не найдена',
  });

  gifResource = resource({
    loader: async () => getRandomGif(),
  });

  // Сигнал для извлечения значения ресурса
  gifUrl = computed(() =>
    this.gifResource.hasValue() ? this.gifResource.value() || '' : '',
  );

  constructor() {
    interval(10000)
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.gifResource.reload();
        this.translation.set(this._randomKeyService.getRandomTranslation());
      });
  }

  changeImage(image: string): void {
    this.roflImage.set(image);
  }

  ngOnDestroy(): void {
    this._randomKeyService.resetTranslations();
  }
}
