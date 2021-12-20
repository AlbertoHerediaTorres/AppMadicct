import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  form : FormGroup;

  constructor(private router : Router, private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group ({
      nombre: ['', [Validators.required]],
      cantidad: ['', Validators.required],
    });
   }


n
  public registro() { // Método para el botón de Registro


  }

}
