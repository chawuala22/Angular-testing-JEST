import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../interfaces';

@Component({
  selector: 'app-charizard',
  templateUrl: './charizard.component.html',
  styleUrls: ['./charizard.component.scss']
})
export class CharizardComponent implements OnInit {
  public charizard?: Pokemon

  constructor( private pokemonService : PokemonService
  ){}
  ngOnInit(): void {
   this.pokemonService.getPokemon(6).subscribe(
    poke =>{
      this.charizard = poke;
      console.log(this.charizard);
      
    }
   )
  }

  



}
