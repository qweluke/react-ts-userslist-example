import requestStatus from '../store/requestStatus';

type Keys = keyof typeof requestStatus;
export type RequestLoadingStatusType = typeof requestStatus[Keys];
