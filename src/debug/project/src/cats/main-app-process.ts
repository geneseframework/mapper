import { Person } from './person.model';
import { Cat } from './cat.model';
import { Meaow } from './meaow.enum';

export class MainAppProcess {

    async start(): Promise<void> {
        const biela: Cat = new Cat(7, 'Biela');
        const lea: Person = new Person('Léa', 'Renoir');
        biela.meaow();
        const cibi: Cat = new Cat(7, 'Cibi');
        const taka: Cat = new Cat(13, 'Taka');
        lea.adopt(biela).adopt(cibi).adopt(taka);
        // lea.adopt(biela);
        lea.adopt(undefined);
        biela.hungry = true;
        const meaows: Meaow[] = await lea.giveFood('croquettes');
    }

}
