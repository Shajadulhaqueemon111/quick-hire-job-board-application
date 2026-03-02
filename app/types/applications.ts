// types/applications.ts
export interface IApplication {
  _id: string;
  jobId: string;
  name: string;
  email: string;
  resumeLink: string;
}

export interface IApplicationsResponse {
  success: boolean;
  message: string;
  data: IApplication[];
}
