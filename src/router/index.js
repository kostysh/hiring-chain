import { route as home } from '../views/Home';
import { route as job } from '../views/Job';
import { route as jobs } from '../views/Jobs';
import { route as cv } from '../views/Cv';

export default [
    ...home,
    ...job,
    ...jobs,
    ...cv
];

