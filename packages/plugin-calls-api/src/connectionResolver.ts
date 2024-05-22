import * as mongoose from 'mongoose';

import { IContext as IMainContext } from '@erxes/api-utils/src/types';
import { createGenerateModels } from '@erxes/api-utils/src/core';
import { IIntegrationModel, loadIntegrationClass } from './models/Integrations';
import { IIntegrationDocument } from './models/definitions/integrations';
import { ICustomerModel, loadCustomerClass } from './models/Customers';

import { ICustomerDocument } from './models/definitions/customers';
import { IActiveSessionDocument } from './models/definitions/activeSessions';
import {
  IActiveSessionModel,
  loadActiveSessionClass,
} from './models/ActiveSessions';
import { ICallHistoryDocument } from './models/definitions/callHistories';
import {
  ICallHistoryModel,
  loadCallHistoryClass,
} from './models/CallHistories';
import {
  IConfigDocument,
  IConfigModel,
  loadConfigClass,
} from './models/Configs';
import { IOperator, IOperatorDocuments } from './models/definitions/operators';
import { IOperatorModel } from './models/Operators';
export interface IModels {
  Integrations: IIntegrationModel;
  Customers: ICustomerModel;
  ActiveSessions: IActiveSessionModel;
  CallHistory: ICallHistoryModel;
  Configs: IConfigModel;
  Operators: IOperatorModel;
}

export interface IContext extends IMainContext {
  subdomain: string;
  models: IModels;
}

export const loadClasses = (db: mongoose.Connection): IModels => {
  const models = {} as IModels;

  models.Integrations = db.model<IIntegrationDocument, IIntegrationModel>(
    'calls_integrations',
    loadIntegrationClass(models),
  );
  models.Customers = db.model<ICustomerDocument, ICustomerModel>(
    'calls_customers',
    loadCustomerClass(models),
  );
  models.ActiveSessions = db.model<IActiveSessionDocument, IActiveSessionModel>(
    'calls_active_sessions',
    loadActiveSessionClass(models),
  );
  models.CallHistory = db.model<ICallHistoryDocument, ICallHistoryModel>(
    'calls_history',
    loadCallHistoryClass(models),
  );
  models.Configs = db.model<IConfigDocument, IConfigModel>(
    'calls_configs',
    loadConfigClass(models),
  );
  models.Operators = db.model<IOperatorDocuments, IOperatorModel>(
    'calls_operators',
    loadConfigClass(models),
  );

  return models;
};

export const generateModels = createGenerateModels<IModels>(loadClasses);
