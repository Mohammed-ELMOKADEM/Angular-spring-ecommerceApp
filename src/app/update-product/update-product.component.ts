import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from '../types';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit{
  public idProduct !: number;
  public formGroup !: FormGroup;
  constructor(
    private productService:ProductService,
    private fb:FormBuilder,
    private route: ActivatedRoute,
    private router: Router){}

  ngOnInit(): void {
    this.idProduct = this.route.snapshot.params['id'];
    this.productService.getProductById(this.idProduct).subscribe({
      next: product=>{
        this.formGroup = this.fb.group({
          idProduct: this.fb.control(this.idProduct),
          name : this.fb.control(product.name),
          price : this.fb.control(product.price)
        })
      },
      error: err =>{
        console.log(err);
      }
    })
  }

  updateProduct() {
    let product: Product = this.formGroup.value;
    this.productService.updateProduct(product).subscribe({
      next: data=>{
        alert("Product with id = "+data.idProduct+" is modified");
        this.router.navigateByUrl("/products");
      },
      error: err =>{
        console.log(err);
      }
    })
  }
}
