import { route as home } from '../views/Home';
import { route as job } from '../views/Job';
import { route as jobs } from '../views/Jobs';
import { route as cv } from '../views/Cv';
import { route as cvs } from '../views/Cvs';
import { route as jobDetails} from '../views/Job/JobDetails';
import { route as cvDetails} from '../views/Cv/CvDetails';

export default [
    ...home,
    ...job,
    ...jobs,
    ...cv,
    ...cvs,
    ...jobDetails,
    ...cvDetails
];

