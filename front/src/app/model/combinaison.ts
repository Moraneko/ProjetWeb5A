import {UserSimple} from './userSimple';
import {Cheval} from './cheval';


export interface Combinaison {
  id_combi: number;
  id_cours: number;
  utilisateur: UserSimple;
  cheval: Cheval;

}
