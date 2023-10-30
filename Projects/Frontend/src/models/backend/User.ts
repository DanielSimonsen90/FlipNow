import { UserScore } from './UserScore';

export type User<Full extends boolean> = {
  id: string;
  username: string;
  avgScore: number;
} & (Full extends true ? {
  scores: Array<UserScore>;
} : {})