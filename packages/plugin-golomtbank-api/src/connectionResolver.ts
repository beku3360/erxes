import {
  IGolomtBankConfigModel,
  loadGolomtBankConfigClass,
} from './models/golomtBankConfigs';
import { IContext as IMainContext } from '@erxes/api-utils/src';
import { createGenerateModels } from '@erxes/api-utils/src/core';
import * as mongoose from 'mongoose';
import { IGolomtBankConfigDocument } from './models/definitions/golomtBankConfigs';
import { IGolomtBankTransactionModel } from './models/golomtBankTransaction';

export interface IModels {
 GolomtBankConfigs: IGolomtBankConfigModel;
}

export interface IContext extends IMainContext {
  subdomain: string;
  models: IModels;
}

export const loadClasses = (db: mongoose.Connection): IModels => {
  const models = {} as IModels;

  models.GolomtBankConfig = db.model<
    IGolomtBankConfigDocument,
    IGolomtBankConfigModel
  >('khanbank_configs', loadGolomtBankConfigClass(models));

  return models;
};

export const generateModels = createGenerateModels<IModels>(loadClasses);
