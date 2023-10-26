import {MatPaginatorIntl} from '@angular/material/paginator';
import {TranslateService} from '@ngx-translate/core';

export class MatPaginatorIntlCro extends MatPaginatorIntl {

  translate: TranslateService;

  constructor(translate: TranslateService) {
    super();
    this.translate = translate;
    this.injectTranslateService(this.translate);
  }

  override getRangeLabel = (page: any, pageSize: any, length: any) => {
    const of = this.translate ? this.translate.instant('paginator.of') : 'of';
    if (length === 0 || pageSize === 0) {
      return '0 ' + of + ' ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' ' + of + ' ' + length;
  };

  injectTranslateService(translate: TranslateService) {
    this.translate = translate;

    this.translate.onLangChange.subscribe(() => {
      this.translateLabels();
    });

    this.translateLabels();
  }

  translateLabels() {
    this.itemsPerPageLabel = this.translate.instant('general.paginator.itemsPerPageLabel');
    this.nextPageLabel = this.translate.instant('.paginator.nextPageLabel');
    this.previousPageLabel = this.translate.instant('paginator.previousPageLabel');
    this.firstPageLabel = this.translate.instant('paginator.firstPageLabel');
    this.lastPageLabel = this.translate.instant('paginator.lastPageLabel');
    this.changes.next();
  }

}