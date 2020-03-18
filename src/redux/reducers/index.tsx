import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import list from './list';
import warehouses from './warehouses';
import goods from './goods';
import goodsDistribution from './goodsDistribution';

export default (history: History) =>
  combineReducers<IReducerStates>({
    list,
    warehouses,
    goods,
    goodsDistribution,
    router: connectRouter(history)
  });
