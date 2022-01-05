import { DataService } from './../../Services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/app/Class/persona';
import { ComunicationService } from 'src/app/Services/comunication.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.page.html',
  styleUrls: ['./logo.page.scss'],
})
export class LogoPage{

  idPersona : number;
  personas : Persona[];
  persona: Persona;
  logueoOk : boolean;


  constructor(private router : Router, private comunicacion : ComunicationService, private data : DataService,  private alertCtrl : AlertController) {


  }

  ionViewWillEnter() {

    this.comprobarLogueo();

    this.comunicacion.obtenerPersonas().subscribe((persona: Persona[]) => { // Obtenemos todas las personas

      this.personas = persona;

      console.log(this.personas);

    },error => {
      console.log("Error",error);
     // this.presentAlert();

    });
  }

  registrarPersona(){
    this.router.navigate(['/register']);
  }

  verPersona(i : number){


    this.persona = this.personas[i];

     this.data.setNombre(this.persona.nombre);
     this.data.setDinero(this.persona.dinero);
     this.data.setIdPersona(this.persona.idPersona);
     this.router.navigate(['/modify']);


  }

  eliminar(i : number){ // Método para eliminar a un usuario del club

    this.presentAlertConfirm(i);

      }

      async presentAlertConfirm(i : number) { // Ventana de alerta con botón para confirmar si eliminamos al usuario o no
        const alert = await this.alertCtrl.create({
          cssClass: 'my-custom-class',
          header: '¿Deseas eliminar a esta persona?' ,
          message: 'Pulsa en ELIMINAR para borrar a esta persona de la aplicación.',
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

                this.comunicacion.eliminarPersona(this.personas[i]).subscribe((persona: Persona) => { // Si aceptamos la eliminación lo borramos completamente


                  this.personas.splice(i,1);

                  console.log("Persona borrada");

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

      comprobarLogueo(){
        this.logueoOk = this.data.logueoOk;

        if(this.logueoOk != true){
          this.router.navigate(['/home']);
        }
      }

}
