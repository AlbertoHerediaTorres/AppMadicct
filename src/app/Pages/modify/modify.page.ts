import { Movimiento } from './../../Class/movimiento';
import { ComunicationService } from './../../Services/comunication.service';
import { DataService } from './../../Services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/app/Class/persona';
import { AlertController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.page.html',
  styleUrls: ['./modify.page.scss'],
})
export class ModifyPage{

  nombre : String;
  dinero : String;
  idPersona : Number;
  personas : Persona[];
  movimientos : Movimiento[];
  form : FormGroup;
  formDescripcion : FormGroup;
  descripcion : String;
  fecha : String;
  fechaObtenida : String
  editable : Boolean;

  logueoOk : boolean;

  constructor(private router :Router, private data : DataService, private comunicacion: ComunicationService, private alertCtrl : AlertController, private datePipe: DatePipe) {

    this.nombre = this.data.getNombre();
    this.dinero = this.data.getDinero();
    this.idPersona = this.data.getIdPersona();
    this.fechaObtenida = this.obtenerDia();

    this.form = new FormGroup ({ //Formulario por si el usuario quiere cambiar sus datos
      dinero : new FormControl('',[Validators.required, Validators.minLength(1)])
    });

    this.formDescripcion = new FormGroup ({ //Formulario para obtener la descripción del movimiento
      idPersona : new FormControl(this.idPersona,[Validators.required, Validators.minLength(1)]),
      descripcion : new FormControl('',[Validators.required, Validators.minLength(1)]),
      fecha : new FormControl(this.fechaObtenida,[Validators.required, Validators.minLength(1)])
    });


    this.comprobarLogueo();

  }

  ionViewWillEnter() {

    this.editable = true;



    this.obtenerDia();

    this.comunicacion.obtenerMovimientos(this.idPersona).subscribe((movimiento: Movimiento[]) => { // Obtenemos los movimientos de la persona
      this.movimientos = movimiento;
      console.log(this.movimientos);

    },error => {
      console.log("Error",error);
     // this.presentAlert();

    });

  }

  public volver(){
    this.router.navigate(['/logo']);
  }


  editarDatos(){ //Método para mostrar la tarjeta para editar los datos
    this.editable = !this.editable;

  }


  guardarDatos(){ //Guarda los datos de la tarjeta comentada anteriormente

        this.comunicacion.editarDatosUsuario(this.form.value, this.idPersona).subscribe((persona: Persona) => { //ACTUALIZA los datos del usuario



          this.presentExitoEditar();
          this.editable = !this.editable;


        });





        this.comunicacion.registerMovimiento(this.formDescripcion.value).subscribe((movimiento: Movimiento) => {

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

public obtenerDia(){
  var d = new Date();
  d.setDate(d.getDate());
  this.fecha = this.datePipe.transform(d, "dd-MM-yyyy");

  return this.fecha;
}

eliminar(i : number){ // Método para eliminar a un movimiento de la persona

  let idMovimientoObtenido = this.movimientos[i].idMovimiento;
  console.log("El id de movimiento es: " + this.movimientos[i].idMovimiento);
  this.presentAlertConfirm(i, idMovimientoObtenido);

    }


    async presentAlertConfirm(i : number, idMovimientoObtenido : number) { // Ventana de alerta con botón para confirmar si eliminamos al usuario o no


      let movi = idMovimientoObtenido;

      const alert = await this.alertCtrl.create({
        cssClass: 'my-custom-class',
        header: '¿Deseas eliminar a este movimiento?' ,
        message: 'Pulsa en ELIMINAR para borrar a este movimiento de la persona.',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Eliminar',
            handler: () => {
              console.log('Confirm Okay');

              this.comunicacion.eliminarMovimiento(this.movimientos[i]).subscribe((movimiento: Movimiento) => { // Si aceptamos la eliminación lo borramos completamente
                this.movimientos.splice(i,1);

                console.log("Movimiento borrado");

                this.router.navigate(['/logo']);


                 },error => {
                   console.log("Error",error);
                 });


            }
          }
        ]
      });

      await alert.present();
    }


}
