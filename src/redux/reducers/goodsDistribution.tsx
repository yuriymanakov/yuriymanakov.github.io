import { EDIT_WAREHOUSE, IEditWarehouseAction, IWarehousesActionTypes } from '@redux/actions/warehouses';

const INITIAL_STATE: IGoodsDistributionState = {
  '1_': 330,
  '2_2': 120,
  '3_': 100,
  '2_4': 500
}

const buildGoodDistributionKey = (goodId: number, warehouseId?: number) => `${goodId}_${warehouseId || ''}`;

export default (state: IGoodsDistributionState = INITIAL_STATE, action: IWarehousesActionTypes):
  IGoodsDistributionState => {
  switch (action.type) {
    case EDIT_WAREHOUSE:
      const goods = action.payload.unallocatedGoodsRequest;

      const newValues = Object
        .entries(goods)
        .reduce((newDistributionValues: IGoodsDistributionState, [goodId, delta]) => {
          const distributedKey = buildGoodDistributionKey(+goodId, action.id);
          const notDistributedKey = buildGoodDistributionKey(+goodId);

          newDistributionValues[distributedKey] = (state[notDistributedKey] || 0) + delta;
          newDistributionValues[notDistributedKey] = (state[notDistributedKey] || 0) - delta;

          return newDistributionValues;
        }, {});

        return {
          ...state,
          ...newValues
        }

    default:
      return state;
  }
};
