import { Component, OnInit } from '@angular/core';
import { switchMap } from "rxjs/operators";

import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img{
      margin:10px
    }
  `
  ]
})
export class AgregarComponent implements OnInit {

  heroe:Heroe={
    superhero:'',
    alter_ego: '',
    characters:'',
    first_appearance:'',
    publisher:Publisher.DCComics,
    alt_img:''
  }

  publishers=[
    {
      id:'DC Comics',
      desc:'DC - Comics'
    },
    {
      id:'Marvel Comics',
      desc: 'Marvel - Comics'
    },
  ]

  constructor(private heroesServices:HeroesService,
              private activatedRoute:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {

    this.activatedRoute.params
    .pipe(
      switchMap(({id})=>this.heroesServices.getHeroePorId(id))
    )
    .subscribe(heroe=>this.heroe=heroe);
  }
  guardar(){
    if(this.heroe.superhero.trim().length===0){
      return;
    }
    if(this.heroe.id){
      //Actualizar
      this.heroesServices.actualizarHeroe(this.heroe)
      .subscribe(heroe=>console.log("Actualizando", heroe))
    }else{
      //Crear
      this.heroesServices.agregarHeroe(this.heroe)
      .subscribe(heroe=>{
        this.router.navigate(['/heroes/editar',heroe.id])
      })
    }
  }

}
