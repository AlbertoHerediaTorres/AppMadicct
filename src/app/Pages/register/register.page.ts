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

  constructor(private router : Router) {

   }


  public registro() { // Método para el botón de Registro


  }

  public volver(){
    this.router.navigate(['/logo']);
  }

}
