import { ComunicationService } from './../../Services/comunication.service';
import { DataService } from './../../Services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/app/Class/persona';
import { AlertController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.page.html',
  styleUrls: ['./modify.page.scss'],
})
export class ModifyPage implements OnInit {

  nombre : String;
  dinero : String;
  idPersona : Number;
  personas : Persona[];
  form : FormGroup;

  editable : Boolean

  logueoOk : boolean;

  constructor(private router :Router, private data : DataService, private comunicacion: ComunicationService, private alertCtrl : AlertController) {

    this.form = new FormGroup ({ //Formulario por si el usuario quiere cambiar sus datos
      dinero : new FormControl('',[Validators.required, Validators.minLength(1)])
    });

    this.editable = true;

    this.comprobarLogueo();

  }

  ngOnInit() {

    this.nombre = this.data.getNombre();
    this.dinero = this.data.getDinero();
    this.idPersona = this.data.getIdPersona();

    console.log(this.idPersona + " " + this.nombre + " " + this.dinero);

  }

  public volver(){
    this.router.navigate(['/logo']);
  }


  editarDatos(){ //Método para mostrar la tarjeta para editar los datos
    this.editable = !this.editable;
  }


  guardarDatos(){ //Guarda los datos de la tarjeta comentada anteriormente

        this.comunicacion.editarDatosUsuario(this.form.value, this.idPersona).subscribe((persona: Persona) => { //ACTUALIZA los datos del usuario
          this.presentExitoEditar()
          this.editable = !this.editable;

        });

        this.router.navigate(['/logo']);
  }

async presentExitoEditar() { // ALERTA A MOSTRAR CUANDO EMAIL ESTÁ MAL RELLENADO
  const alert = await this.alertCtrl.create({
    cssClass: 'my-custom-class',
    header: 'Campos editados',
    subHeader: 'Los campos se han editado correctamente',
    message: '',
    buttons: ['OK']
  });

  await alert.present();
}

comprobarLogueo(){
  this.logueoOk = this.data.logueoOk;

  if(this.logueoOk != true){
    this.router.navigate(['/home']);
  }
}


}
