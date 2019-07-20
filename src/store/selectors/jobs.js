const hashedObjToArray = obj => Object.entries(obj).map(r => r[1]).sort((v1,v2) => v2.time - v1.time);

export const jobsLoading = state => state.jobs.loading;
export const jobs = state => hashedObjToArray(state.jobs.jobs);
export const jobsClosing = state => state.jobs.closing;
