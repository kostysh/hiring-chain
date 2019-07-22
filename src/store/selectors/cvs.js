const hashedObjToArray = obj => Object.entries(obj).map(r => r[1]).sort((v1,v2) => v2.time - v1.time);

export const cvsLoading = state => state.cvs.loading;
export const cvsClosing = state => state.cvs.closing;
export const cvs = state => hashedObjToArray(state.cvs.cvs);
export const cvsApply = state => state.cvs.apply;
export const applied = state => state.cvs.appied;