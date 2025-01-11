import { Injectable } from '@angular/core';

@Injectable()
export class RandomKeyService {
  private translations: { [key: string]: string } = {
    en: 'Page not found',
    ru: 'Страница не найдена',
    es: 'Página no encontrada',
    fr: 'Page non trouvée',
    de: 'Seite nicht gefunden',
    zh: '页面未找到',
    ja: 'ページが見つかりません',
    it: 'Pagina non trovata',
    pt: 'Página não encontrada',
    ar: 'الصفحة غير موجودة',
    ko: '페이지를 찾을 수 없습니다',
    nl: 'Pagina niet gevonden',
    tr: 'Sayfa bulunamadı',
    pl: 'Strona nie została znaleziona',
    sv: 'Sidan hittades inte',
    da: 'Siden blev ikke fundet',
    no: 'Siden ble ikke funnet',
    fi: 'Sivua ei löytynyt',
    cs: 'Stránka nenalezena',
    sk: 'Stránka sa nenašla',
    hu: 'Az oldal nem található',
    ro: 'Pagina nu a fost găsită',
    el: 'Η σελίδα δεν βρέθηκε',
    bg: 'Страницата не е намерена',
    uk: 'Сторінку не знайдено',
    vi: 'Không tìm thấy trang',
    th: 'ไม่พบหน้า',
    id: 'Halaman tidak ditemukan',
    ms: 'Halaman tidak dijumpai',
    hi: 'पृष्ठ नहीं मिला',
    bn: 'পৃষ্ঠা পাওয়া যায়নি',
    ur: 'صفحہ نہیں ملا',
    ta: 'பக்கம் கிடைக்கவில்லை',
    te: 'పేజీ దొరకలేదు',
    kn: 'ಪುಟ ಕಂಡುಬಂದಿಲ್ಲ',
    ml: 'താളം ലഭ്യമല്ല',
  };

  private remainingKeys: string[] = Object.keys(this.translations);

  getRandomTranslation(): { key: string; value: string } {
    if (this.remainingKeys.length === 0) {
      this.resetTranslations();
    }

    const randomIndex = Math.floor(Math.random() * this.remainingKeys.length);

    const key = this.remainingKeys.splice(randomIndex, 1)[0];

    return { key, value: this.translations[key] };
  }

  resetTranslations(): void {
    this.remainingKeys = Object.keys(this.translations);
  }
}
