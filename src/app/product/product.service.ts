import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from './product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  getProductId() {
    return Math.floor(Math.random() * 1000);
  }

  private product: IProduct[] = [
    {
      id: this.getProductId(),
      name: 'IPhone X',
      active: false,
      description: 'Like Band New',
      expirationDate: '2023-11-05',
      type: 'Phone',
    },
    {
      id: this.getProductId(),
      name: 'OnePlus Nord CE 5G',
      active: true,
      description: 'Qualcomm Snapdragon 750G',
      expirationDate: '2023-11-05',
      type: 'Phone',
    },
    {
      id: this.getProductId(),
      name: 'Vivo iQoo Z3',
      active: true,
      description: '6 GB RAM',
      expirationDate: '2023-11-05',
      type: 'Phone',
    },
    {
      id: this.getProductId(),
      name: 'Xiaomi Redmi Note 10 Pro',
      active: true,
      description: '128 GB internal storage',
      expirationDate: '2023-12-15',
      type: 'Phone',
    },
    {
      id: this.getProductId(),
      name: 'OnePlus Nord CE 5G',
      active: true,
      description: 'Qualcomm Snapdragon 750G',
      expirationDate: '2022-01-25',
      type: 'Phone',
    },
    {
      id: this.getProductId(),
      name: 'Xiaomi Redmi Note 10',
      active: true,
      description: 'Qualcomm Snapdragon 750G',
      expirationDate: '2022-06-05',
      type: 'Phone',
    },
    {
      id: this.getProductId(),
      name: 'Vivo Y73 2021',
      active: true,
      description: '4400 mAh battery',
      expirationDate: '2023-11-05',
      type: 'Phone',
    },
    {
      id: this.getProductId(),
      name: 'Realme 8 Pro',
      active: true,
      description: '8 plus rating',
      expirationDate: '2023-11-05',
      type: 'Phone',
    },
    {
      id: this.getProductId(),
      name: 'IPhone X',
      active: false,
      description: 'Like Band New',
      expirationDate: '2023-11-05',
      type: 'Phone',
    },
    {
      id: this.getProductId(),
      name: 'OnePlus Nord CE 5G',
      active: true,
      description: 'Qualcomm Snapdragon 750G',
      expirationDate: '2023-11-05',
      type: 'Phone',
    },
    {
      id: this.getProductId(),
      name: 'Vivo iQoo Z3',
      active: true,
      description: '6 GB RAM',
      expirationDate: '2023-11-05',
      type: 'Phone',
    },
    {
      id: this.getProductId(),
      name: 'Xiaomi Redmi Note 10 Pro',
      active: true,
      description: '128 GB internal storage',
      expirationDate: '2023-12-15',
      type: 'Phone',
    },
    {
      id: this.getProductId(),
      name: 'OnePlus Nord CE 5G',
      active: true,
      description: 'Qualcomm Snapdragon 750G',
      expirationDate: '2022-01-25',
      type: 'Phone',
    },
    {
      id: this.getProductId(),
      name: 'Xiaomi Redmi Note 10',
      active: true,
      description: 'Qualcomm Snapdragon 750G',
      expirationDate: '2022-06-05',
      type: 'Phone',
    },
    {
      id: this.getProductId(),
      name: 'Vivo Y73 2021',
      active: true,
      description: '4400 mAh battery',
      expirationDate: '2023-11-05',
      type: 'Phone',
    },
    {
      id: this.getProductId(),
      name: 'Realme 8 Pro',
      active: true,
      description: '8 plus rating',
      expirationDate: '2023-11-05',
      type: 'Phone',
    },
    {
      id: this.getProductId(),
      name: 'IPhone X',
      active: false,
      description: 'Like Band New',
      expirationDate: '2023-11-05',
      type: 'Phone',
    },
    {
      id: this.getProductId(),
      name: 'OnePlus Nord CE 5G',
      active: true,
      description: 'Qualcomm Snapdragon 750G',
      expirationDate: '2023-11-05',
      type: 'Phone',
    },
    {
      id: this.getProductId(),
      name: 'Vivo iQoo Z3',
      active: true,
      description: '6 GB RAM',
      expirationDate: '2023-11-05',
      type: 'Phone',
    },
    {
      id: this.getProductId(),
      name: 'Xiaomi Redmi Note 10 Pro',
      active: true,
      description: '128 GB internal storage',
      expirationDate: '2023-12-15',
      type: 'Phone',
    },
    {
      id: this.getProductId(),
      name: 'OnePlus Nord CE 5G',
      active: true,
      description: 'Qualcomm Snapdragon 750G',
      expirationDate: '2022-01-25',
      type: 'Phone',
    },
    {
      id: this.getProductId(),
      name: 'Xiaomi Redmi Note 10',
      active: true,
      description: 'Qualcomm Snapdragon 750G',
      expirationDate: '2022-06-05',
      type: 'Phone',
    },
    {
      id: this.getProductId(),
      name: 'Vivo Y73 2021',
      active: true,
      description: '4400 mAh battery',
      expirationDate: '2023-11-05',
      type: 'Phone',
    },
    {
      id: this.getProductId(),
      name: 'Realme 8 Pro',
      active: true,
      description: '8 plus rating',
      expirationDate: '2023-11-05',
      type: 'Phone',
    },
    {
      id: this.getProductId(),
      name: 'IPhone X',
      active: false,
      description: 'Like Band New',
      expirationDate: '2023-11-05',
      type: 'Phone',
    },
    {
      id: this.getProductId(),
      name: 'OnePlus Nord CE 5G',
      active: true,
      description: 'Qualcomm Snapdragon 750G',
      expirationDate: '2023-11-05',
      type: 'Phone',
    },
    {
      id: this.getProductId(),
      name: 'Vivo iQoo Z3',
      active: true,
      description: '6 GB RAM',
      expirationDate: '2023-11-05',
      type: 'Phone',
    },
    {
      id: this.getProductId(),
      name: 'Xiaomi Redmi Note 10 Pro',
      active: true,
      description: '128 GB internal storage',
      expirationDate: '2023-12-15',
      type: 'Phone',
    },
    {
      id: this.getProductId(),
      name: 'OnePlus Nord CE 5G',
      active: true,
      description: 'Qualcomm Snapdragon 750G',
      expirationDate: '2022-01-25',
      type: 'Phone',
    },
    {
      id: this.getProductId(),
      name: 'Xiaomi Redmi Note 10',
      active: true,
      description: 'Qualcomm Snapdragon 750G',
      expirationDate: '2022-06-05',
      type: 'Phone',
    },
    {
      id: this.getProductId(),
      name: 'Vivo Y73 2021',
      active: true,
      description: '4400 mAh battery',
      expirationDate: '2023-11-05',
      type: 'Phone',
    },
    {
      id: this.getProductId(),
      name: 'Realme 8 Pro',
      active: true,
      description: '8 plus rating',
      expirationDate: '2023-11-05',
      type: 'Phone',
    },
  ];

  product$ = new BehaviorSubject(this.product.slice());

  deleteProduct(Id: number) {
    const productIndex = this.product.findIndex((product) => product.id === Id);
    if (productIndex != undefined) {
      this.product.splice(productIndex, 1);
      this.product$.next(this.product.slice());
    }
  }

  updateStatus(id: number, status: boolean) {
    const product = this.product.find((product) => product.id === id);
    if (product != undefined) {
      product.active = !status;
      this.product$.next(this.product.slice());
    } else {
      throw Error('No product available for this ID:' + id);
    }
  }


  addProduct(data:any){
    
    const product:IProduct = {
      id: this.getProductId(),
      ...data.deviceTypeInfo,
      ...data.basicInfo,
      ...data.dateInfo,
    }
    this.product.unshift(product);
    this.product$.next(this.product.slice())
  }


  editProduct(id:number, updatedProduct:any){
    const product:IProduct = {
      id: id,
      ...updatedProduct.deviceTypeInfo,
      ...updatedProduct.basicInfo,
      ...updatedProduct.dateInfo,
    }
    const productIndex = this.product.findIndex(product => product.id === id);
    this.product[productIndex] = product;
    this.product$.next(this.product.slice());
  }
}
