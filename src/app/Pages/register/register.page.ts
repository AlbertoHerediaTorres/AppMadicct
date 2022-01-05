import { DataService } from './../../Services/data.service';
import { Persona } from './../../Class/persona';
import { ComunicationService } from 'src/app/Services/comunication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form : FormGroup;
  dia: Date;
  fecha : String;

  logueoOk : boolean;

  constructor(private router : Router, private comunicacion : ComunicationService, private datePipe: DatePipe, private data: DataService) {

    this.form = new FormGroup ({
      nombre : new FormControl('',[Validators.required, Validators.minLength(1)]),
      dinero : new FormControl('',[Validators.required, Validators.minLength(1)])
    });

    this.comprobarLogueo();

   }

   ngOnInit() {

    this.obtenerDia();




  }




  public volver(){
    this.router.navigate(['/logo']);
  }

  public registro(nombre : string, dinero : string) { // Método para el botón de Registro

       if(this.form.controls.nombre.valid){

        if(this.form.controls.dinero.valid){

          this.comunicacion.registerPersona(this.form.value).subscribe((persona: Persona) => {

            this.router.navigate(['/logo']);

          });

        }  else {
          console.log("Fallo en el dinero");
        }

       }  else {
         console.log("Fallo en el nombre");
       }







  }

  comprobarLogueo(){
    this.logueoOk = this.data.logueoOk;

    if(this.logueoOk != true){
      this.router.navigate(['/home']);
    }
  }


  public obtenerDia(){
    var d = new Date();
    d.setDate(d.getDate());
    this.fecha = this.datePipe.transform(d, "dd-MM-yyyy");

    console.log(this.fecha);
  }

}
