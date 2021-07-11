import { DatePipe } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePickerComponent } from 'ngx-bootstrap/datepicker';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalService } from 'src/app/shared/model.service';
import { IProduct } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditProductComponent implements OnInit {
  @ViewChild('modal') modal!: TemplateRef<any>;

  @Output() submit = new EventEmitter<any>();
  menus = [
    { name: 'Select Device Type', type: 'deviceInfo' },
    { name: 'Basic info', type: 'basicInfo' },
    { name: 'Expiration info', type: 'dateInfo' },
  ];

  deviceTypes = [
    {
      name: 'Tablet',
      icon: 'fa fa-tablet',
    },
    {
      name: 'Laptop',
      icon: 'fa fa-laptop',
    },
    {
      name: 'Phone',
      icon: 'fa fa-mobile',
    },
    {
      name: 'Monitor',
      icon: 'fa fa-desktop',
    },
  ];

  menuform = 'deviceInfo';

  bsModalRef!: BsModalRef;

  saveButton: boolean = false;

  productForm!: FormGroup;

  isEditMode: boolean = false;
  currentEditObj: IProduct | undefined;

  minDate: Date;
  maxDate: Date;
  constructor(
    private _modalService: ModalService,
    private bsModalService: BsModalService,
    private datepipe: DatePipe,
    private productService: ProductService
  ) {
    this.minDate = new Date();
    this.maxDate = new Date();

    const year = this.maxDate.getFullYear();
    const month = this.maxDate.getMonth();
    const day = this.maxDate.getDate();
    this.maxDate = new Date(year + 2, month, day);
  }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      deviceTypeInfo: new FormGroup({
        type: new FormControl(null, Validators.required),
      }),
      basicInfo: new FormGroup({
        name: new FormControl(null, [
          Validators.required,
          this.spaceNotAllowValidator,
          Validators.minLength(3),
          Validators.maxLength(20),
        ]),
        active: new FormControl(false),
        description: new FormControl(null, [
          Validators.required,
          this.spaceNotAllowValidator,
          Validators.minLength(10),
        ]),
        features: new FormArray([]),
      }),
      dateInfo: new FormGroup({
        expirationDate: new FormControl(null, Validators.required),
      }),
    });

    this._modalService.productModal.subscribe((data) => {
      if (data.isEdit) {
        this.isEditMode = true;
        this.currentEditObj = data.productData;

        const features = new FormArray([]);

        data.productData?.features?.forEach((i) => {
          features.push(new FormControl(i));
        });

        this.productForm = new FormGroup({
          deviceTypeInfo: new FormGroup({
            type: new FormControl(data.productData?.type, Validators.required),
          }),
          basicInfo: new FormGroup({
            name: new FormControl(data.productData?.name, [
              Validators.required,
              this.spaceNotAllowValidator,
              Validators.minLength(3),
              Validators.maxLength(20),
            ]),
            active: new FormControl(data.productData?.active),
            description: new FormControl(data.productData?.description, [
              Validators.required,
              this.spaceNotAllowValidator,
              Validators.minLength(10),
            ]),
            features: features,
          }),
          dateInfo: new FormGroup({
            expirationDate: new FormControl(
              data.productData?.expirationDate,
              Validators.required
            ),
          }),
        });
      }

      this.bsModalRef = this.bsModalService.show(
        this.modal,
        Object.assign({}, { class: 'grey modal-lg' })
      );
      this.menuform = 'deviceInfo';
    });
  }

  onSelectMenu(type: string) {
    this.saveButton = false;
    this.menuform = type;
    if (this.menus[this.menus.length - 1].type === this.menuform) {
      this.saveButton = true;
    } else {
      this.saveButton = false;
    }
  }

  onChangeMenu(type?: string) {
    if (this.menus[this.menus.length - 2].type === this.menuform) {
      this.saveButton = true;
    } else {
      this.saveButton = false;
    }

    const currentMenuIndex = this.menus.findIndex(
      (menu) => menu.type === this.menuform
    );
    if (this.menus.length - 1 === currentMenuIndex) {
      // backButton
    } else {
      if (type != undefined) {
        this.menuform = this.menus[currentMenuIndex].type;
      } else {
        this.menuform = this.menus[currentMenuIndex + 1].type;
      }
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.productForm.get('dateInfo')?.patchValue({
        expirationDate: this.datepipe.transform(
          this.productForm.get('dateInfo.expirationDate')?.value,
          'yyyy-MM-dd'
        ),
      });

      if (this.isEditMode) {
        if (this.currentEditObj?.id) {
          // this.productService.editProduct(this.currentEditObj?.id, this.productForm.value)
          this.submit.emit({
            ...this.productForm.value,
            id: this.currentEditObj?.id,
          });
        }
      } else {
        this.submit.emit(this.productForm.value);
        //  this.productService.addProduct(this.productForm.value);
      }
      this.isEditMode=false;
      this.onClose();
    }
  }

  onClose() {
    (<FormArray>this.productForm.get('basicInfo.features')).clear();
    this.saveButton = false;
    this.productForm.reset();
    this.bsModalRef.hide();
  }

  spaceNotAllowValidator(
    control: FormControl
  ): { [s: string]: boolean } | null {
    if (
      control.value != null &&
      ((control.value as string).startsWith(' ') ||
        (control.value as string).endsWith(' '))
    ) {
      return { cannotContainSpace: true };
    }

    return null;
  }

  addFeatures() {
    const featureCtl = new FormControl(null);
    (<FormArray>this.productForm.get('basicInfo.features')).push(featureCtl);
  }
  removeFeature(index: number) {
    (this.productForm.get('basicInfo.features') as FormArray).removeAt(index);
  }

  getFeaturesControls() {
    return (this.productForm.get('basicInfo.features') as FormArray).controls;
  }
}
