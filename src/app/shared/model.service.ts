import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IProduct } from '../product/product.model';

@Injectable({ providedIn: 'root' })
export class ModalService {
  model$ = new Subject();
  productModal = new Subject<{ isEdit: boolean; productData: IProduct |undefined }>();

  openModel(data: any) {
    this.model$.next(data);
  }

  openAddEditModal(flag: boolean, product?: IProduct) {
    const isEditable: { isEdit: boolean; productData: IProduct | undefined } = {
      isEdit: flag,
      productData: product ? product : undefined,
    };
    this.productModal.next(isEditable);
  }
}
