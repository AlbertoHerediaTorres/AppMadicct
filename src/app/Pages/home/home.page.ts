import { DataService } from './../../Services/data.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  hide : Boolean;
  form : FormGroup;
  nameIcon : String;
  alertController: any;

  nombreUsuarioIntroducido : String;
  cntraIntroducida : String;

  nombreUsuario : String;
  cntra : String;


  logueoOk : boolean;

  constructor(private formBuilder: FormBuilder, private router : Router, private alertCtrl : AlertController, private data : DataService) {

    this.form = this.formBuilder.group ({
      user: ['', [Validators.required]],
      pass: ['', Validators.required],


    });


    this.hide = true;
    this.nameIcon  = 'eye-outline';

    this.nombreUsuario = 'madicct'
    this.cntra = 'R10QqKjPq';
  }

  eventoBtnVer() { //Método para cambiar el estado del botón verContraseña
    this.hide = !this.hide;

    if(this.hide){
      this.nameIcon  = 'eye-outline';
    } else {
      this.nameIcon  = 'eye-off-outline';
    }
} //Fin eventoBtnVer()

logueo(){

  if(this.form.value.user == this.nombreUsuario || this.form.value.pass == this.cntra){
    this.logueoOk = true;
    this.data.setLogueoOk(this.logueoOk);
    this.router.navigate(['/logo']);
  } else {
    this.presentAlert();
  }



}

async presentAlert() { // Ventana de alerta cuando el usuario y/o contraseña son mal introducidos
  const alert = await this.alertCtrl.create({
    cssClass: 'my-custom-class',
    header: 'Error',
    subHeader: 'Usuario / contraseña incorrecto',
    message: 'El usuario o la contraseña que has introducido es incorrecta, por favor, inténtelo de nuevo.',
    buttons: ['OK']
  });

  await alert.present();
}


}


