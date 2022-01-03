import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/app/Class/persona';
import { ComunicationService } from 'src/app/Services/comunication.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.page.html',
  styleUrls: ['./logo.page.scss'],
})
export class LogoPage implements OnInit {

  personas : Persona[];
  persona: Persona;

  constructor(private router : Router, private comunicacion : ComunicationService) {


  }

  ngOnInit() {

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

}
