import { Injectable } from '@angular/core';
import { Persona } from '../Class/persona';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  idPersona : Number
  nombre: String;
  dinero : String;
  personas : Persona [];
  logueoOk: boolean;

  constructor() { }

  setIdPersona(idPersona){
    this.idPersona = idPersona;
  }

  getIdPersona(){
    return this.idPersona;
  }

  setNombre(nombre){
    this.nombre = nombre;
  }
  getNombre(){
    return this.nombre;
  }

  setDinero(dinero){
    this.dinero = dinero;
  }
  getDinero(){
    return this.dinero;
  }

  setLogueoOk(logueoOk){
  this.logueoOk = logueoOk;
  }

  getLogueoOk(){
    return this.logueoOk;
  }
}
