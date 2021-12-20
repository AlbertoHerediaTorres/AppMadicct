import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

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

  constructor(private formBuilder: FormBuilder, private router : Router, private modalController : ModalController) {

    this.form = this.formBuilder.group ({
      user: ['', [Validators.required]],
      pass: ['', Validators.required],
    });

    this.hide = true;
    this.nameIcon  = 'eye-outline';
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
  this.router.navigate(['/logo']);

}

async presentAlert() { // Ventana de alerta cuando el usuario y/o contraseña son mal introducidos
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Error',
    subHeader: 'Usuario / contraseña incorrecto',
    message: 'El usuario o la contraseña que has introducido es incorrecta, por favor, inténtelo de nuevo.',
    buttons: ['OK']
  });

  await alert.present();
}


}


