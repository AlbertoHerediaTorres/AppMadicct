import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Persona } from '../Class/persona';

@Injectable({
  providedIn: 'root'
})
export class ComunicationService {

  url = 'https://madicct.000webhostapp.com/';

  constructor(private httpCliente: HttpClient) { }

  public obtenerPersonas(){ //OBTIENE TODAS LAS PERSONAS
    return this.httpCliente.get<Persona[]>(`${this.url}obtenerPersonas.php`);
   }

   public registerPersona(persona : Persona){ //REGISTRA A UNA NUEVA PERSONA
    return this.httpCliente.post<Persona>(`${this.url}insertarPersona.php`, JSON.stringify(persona));
   }

   public eliminarPersona(persona : Persona){ // ELIMINA A LAS PERSONAS
    return this.httpCliente.post<Persona>(`${this.url}eliminarPersona.php`, JSON.stringify(persona));
   }

   public editarDatosUsuario(persona : Persona, idPersona : Number){ // EDITA LOS DATOS PERSONA
    return this.httpCliente.post<Persona>(`${this.url}editarPersona.php?id=`+idPersona, JSON.stringify(persona));
   }


}
