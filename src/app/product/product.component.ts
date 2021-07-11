import { Component, OnInit, TemplateRef } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ModalService } from '../shared/model.service';
import { IProduct } from './product.model';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  products: IProduct[] = [];

  paginatedProduct: IProduct[] = [];
  totalcount: number = 5;

  constructor(
    private _productService: ProductService,
    private _modalService: ModalService
  ) {}
  selectedProduct!: IProduct;

  ngOnInit(): void {
    this._productService.product$.subscribe((products) => {
      this.products = products;
    });

    if (this.products.length > 0) {
      this.paginatedProduct = this.products.slice(0, 5);
    }
  }

  identify(index: number, product: IProduct) {
    return product.id;
  }

  getBadgeColor(product: IProduct) {
    if (product.active === true) {
      return { 'badge-primary': true };
    } else {
      return { 'badge-danger': true };
    }
  }

  handleDelete(data: IProduct) {
    if (data != undefined && data.id) {
      this._productService.deleteProduct(data.id);
      this.pageObjectUpdate();
    } else {
      throw Error('the object is empty.');
    }
    // this.bsModalRef.hide();
  }

  openModal(product: IProduct) {
    // this.bsModalRef = this.modalService.show(template);
    // this.selectedProduct = product;
    this._modalService.openModel(product);
  }

  onStatusChanged(product: IProduct) {
    this._productService.updateStatus(product.id, product.active);
  }

  onAddProduct() {
    this._modalService.openAddEditModal(false);
  }

  onEditProduct(product: IProduct) {
    this._modalService.openAddEditModal(true, product);
  }

  pageChanged(allow: boolean, event?: PageChangedEvent) {
    if (allow === true && event != undefined) {
      this.totalcount = event.page * event.itemsPerPage;
    }
    this.paginatedProduct = this.products.slice(
      this.totalcount - 5,
      this.totalcount
    );
  }

  pageObjectUpdate() {
    //this.paginatedProduct = this.products.slice(0, 5);
    this.pageChanged(false);
  }

  handleSubmit(data: any) {
    if (data.id) {
      /* edit */
      this._productService.editProduct(data.id, data);
    } else {
      /* add */
      this._productService.addProduct(data);
    }
    this.pageObjectUpdate();
  }
}
