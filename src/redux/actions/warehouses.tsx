export const ADD_WAREHOUSE = 'ADD_WAREHOUSE';
export const EDIT_WAREHOUSE = 'EDIT_WAREHOUSE';
export const DELETE_WAREHOUSE = 'DELETE_WAREHOUSE';

export interface IAddWarehouseAction {
  type: typeof ADD_WAREHOUSE;
  payload: IWarehouseEditRequest;
}

export interface IEditWarehouseAction {
  type: typeof EDIT_WAREHOUSE;
  id: number;
  payload: IWarehouseEditRequest;
}

export interface IDeleteWarehouseAction {
  type: typeof DELETE_WAREHOUSE;
  id: number;
}

export type IWarehousesActionTypes = IAddWarehouseAction | IEditWarehouseAction | IDeleteWarehouseAction;

export const addWarehouse = (payload: IWarehouseEditRequest): IAddWarehouseAction => ({
  payload,
  type: ADD_WAREHOUSE
});

export const editWarehouse = (id: number, payload: IWarehouseEditRequest): IEditWarehouseAction => ({
  id,
  payload,
  type: EDIT_WAREHOUSE
});

export const deleteWarehouse = (id: number): IDeleteWarehouseAction => ({
  id,
  type: DELETE_WAREHOUSE
});
