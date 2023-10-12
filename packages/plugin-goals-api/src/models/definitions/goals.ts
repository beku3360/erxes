import { Document, Schema } from 'mongoose';
import { field, schemaHooksWrapper } from './utils';

export interface IGoal {
  entity: string;
  contributionType: string;
  chooseBoard: string;
  frequency: string;
  metric: string;
  goalType: string;
  contribution: string;
  chooseStage: string;
  startDate: string;
  endDate: string;
  target: string;
}

export interface IGoalDocument extends IGoal, Document {
  _id: string;
  createdAt: Date;
}

export const goalSchema = schemaHooksWrapper(
  new Schema({
    _id: field({ pkey: true }),
    entity: field({ type: String, label: 'Choose Entity' }),
    contributionType: field({
      type: String,
      label: 'Contribution Type'
    }),
    chooseBoard: field({ type: String, label: 'Choose Board,Pipeline' }),
    frequency: field({ type: String, label: 'Frequency' }),
    metric: field({ type: String, label: 'Metric' }),
    goalType: field({ type: String, label: 'Choose Goal Type' }),
    contribution: field({ type: String, label: 'contribution' }),
    startDate: field({ type: String, lable: 'StartDate Durable' }),
    endDate: field({ type: String, label: 'EndDate Durable' }),
    target: field({ type: String, label: 'Target' })
  }),
  'erxes_goals'
);

// for goals query. increases search speed, avoids in-memory sorting
goalSchema.index({ type: 1, IGoal: 1, name: 1 });
