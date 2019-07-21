import { route as home } from '../views/Home';
import { route as job } from '../views/Job';
import { route as jobDetails} from '../views/Job/JobDetails';
import { route as jobs } from '../views/Jobs';
import { route as cv } from '../views/Cv';

export default [
    ...home,
    ...job,
    ...jobDetails,
    ...jobs,
    ...cv
];

