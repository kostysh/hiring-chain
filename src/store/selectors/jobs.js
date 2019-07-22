import config from '../../config.json';

const hashedObjToArray = obj => Object.entries(obj).map(r => r[1]).sort((v1,v2) => v2.time - v1.time);

const filterByQuery = state => {
    const records = hashedObjToArray(state.jobs.cache);
    const query = state.jobs.query;
    const recentLimit = query.tag === '' && query.location === '';

    if (recentLimit) {
        return records.splice(0, config.recentCount);
    }

    return records.filter(rec => {
        const tags = [
            ...rec.job.categories, 
            ...rec.job.skills, 
            rec.job.title,
            rec.job.description,
        ].join(' ').replace(/\r?\n|\r/, ' ').trim();
        const isRemote = !!query.location.match(new RegExp('remote', 'gi'));
        const locationRule = isRemote ? rec.job.remote : query.location !== '' && rec.job.location.match(new RegExp(query.location, 'gi'));
        return (query.tag !== '' && tags.match(new RegExp(query.tag, 'gi'))) || locationRule;
    });
};

export const jobsLoading = state => state.jobs.loading;
export const jobsCacheLoading = state => state.jobs.cacheLoading;
export const jobsQuery = state => state.jobs.query;
export const jobs = state => hashedObjToArray(state.jobs.jobs);
export const jobsClosing = state => state.jobs.closing;
export const jobsCache = state => filterByQuery(state);
export const jobsError = state => state.jobs.error;
