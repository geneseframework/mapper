import { Company } from '../models/company.model';
import { Ngo } from '../models/ngo.model';

export type Employer = Ngo | Company | Ngo[];
