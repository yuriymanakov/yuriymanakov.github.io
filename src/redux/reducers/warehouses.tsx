import { ADD_WAREHOUSE, DELETE_WAREHOUSE, EDIT_WAREHOUSE, IWarehousesActionTypes,
  IAddWarehouseAction, IEditWarehouseAction, IDeleteWarehouseAction } from '@redux/actions/warehouses';

const INITIAL_STATE: IWarehousesState = {
  1: {
    title: 'Склад 1',
    address: 'Адрес склада 1',
  },
  2: {
    title: 'Склад 2',
    address: 'Адрес склада 2',
  },
  3: {
    title: 'Склад 3',
    address: 'Адрес склада 3',
  }
}

let newWarehouseId = 3;

export default (state: IWarehousesState = INITIAL_STATE, action: IWarehousesActionTypes): IWarehousesState => {
  switch (action.type) {
    case ADD_WAREHOUSE:
      newWarehouseId += 1;
      return {
        ...state,
        [newWarehouseId]: (action as IAddWarehouseAction).payload.data
      }

    case EDIT_WAREHOUSE:
      return {
        ...state,
        [action.id]: (action as IEditWarehouseAction).payload.data
      }

    case DELETE_WAREHOUSE:
      const {[action.id]: omit, ...res} = state;
      return res;

    default:
      return state;
  }
};
