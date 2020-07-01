import { Ingredent } from '../share/Ingredents.model';

export class Recipe {
  public id: number;
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredenets: Ingredent[];
  constructor(
    id: number,
    name: string,
    desc: string,
    imagePath: string,
    ingredents: Ingredent[]
  ) {
    this.id = id;
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredenets = ingredents;
  }
}
