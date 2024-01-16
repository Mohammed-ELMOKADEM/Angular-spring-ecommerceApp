import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit{
  constructor(private form : FormBuilder, private ps : ProductService , private router : Router){}

  public formGroup !: FormGroup;

  ngOnInit(): void {
    this.formGroup = this.form.group({
      name : this.form.control(""),
      price : this.form.control(0),
      image_path: [""]
    })
  }

  saveProduct() {
    let product = this.formGroup.value;
    this.ps.addProduct(product).subscribe({
      next: data =>{
        this.router.navigateByUrl("/products");
      },
      error: err =>{
        console.log(err);
      }
    })
  }


}
