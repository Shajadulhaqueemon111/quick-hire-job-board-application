export interface IJob {
  _id?: string;
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
  createdAt?: Date;
}
