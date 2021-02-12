import { Person } from './person.model';
import { Cat } from './cat.model';
import { Meaow } from './meaow.enum';

export class MainAppProcess {

    async start(): Promise<void> {
        const biela: Cat = new Cat(7, 'Biela');
        const lea: Person = new Person('Léa', 'Renoir');
        const cibi: Cat = new Cat(7, 'Cibi');
        const taka: Cat = new Cat(13, 'Taka');
        biela.hungry = true;
    }

}
