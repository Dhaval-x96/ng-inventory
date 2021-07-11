import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/shared/model.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss'],
})
export class DeleteProductComponent implements OnInit, OnDestroy {
  
  bsModalRef!: BsModalRef;

  modalSubscription = new Subscription();

  data:any;
  @ViewChild('deleteModel') modal!:TemplateRef<any>;

  @Output('onDeleteBtn') deleteBtn = new EventEmitter<any>();

  constructor(
    private _modalService: ModalService,
    private bsModalService: BsModalService
  ) {}

  ngOnInit(): void {
   this.modalSubscription =  this._modalService.model$.subscribe((data: any) => {
      this.data = data;
      this.bsModalRef = this.bsModalService.show(this.modal);
    });
  }
  onDelete(){
    this.bsModalRef.hide();
    this.deleteBtn.emit(this.data);
  }

  ngOnDestroy(){
    this.modalSubscription.unsubscribe();
  }
}
