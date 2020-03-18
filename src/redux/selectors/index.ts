import { createSelector } from 'reselect';
import { RouteComponentProps } from 'react-router';

export interface IMatchParams {
  id: string;
}

export interface IWarehousesOrderedListItem extends IWarehouse {
  id: number
}

export interface IGoodsOrderedListItem extends IGood {
  id: number
}

const sortItemsByIds = (item1: {id: number}, item2: {id : number}) => +item1.id > +item2.id ? 1 : -1;

export const warehousesSelector = (state: IReducerStates) => state.warehouses;

export const goodsSelector = (state: IReducerStates) => state.goods;

export const goodsDistributionSelector = (state: IReducerStates) => state.goodsDistribution;

export const orderedWarehousesSelector =
  createSelector<IReducerStates, IWarehousesState, IWarehousesOrderedListItem[]>(
    warehousesSelector,
    warehouses => Object.entries(warehouses)
      .map(([id, data]) => ({ id, ...data }))
      .sort(sortItemsByIds)
  );

export const orderedGoodsSelector =
  createSelector<IReducerStates, IGoodsState, IGoodsOrderedListItem[]>(
    goodsSelector,
    goods => Object.entries(goods)
      .map(([id, data]) => ({ id, ...data }))
      .sort(sortItemsByIds)
  );

export const activeItemIdSelector = (state: IReducerStates, props: RouteComponentProps<IMatchParams>) =>
  props.match.params.id;

export const activeWarehouseSelector =
  createSelector<IReducerStates, RouteComponentProps<IMatchParams>, IWarehousesState, string, IWarehouse | undefined>(
    warehousesSelector,
    activeItemIdSelector,
    (items, itemId) => (isFinite(+itemId) && items[+itemId]) || undefined
  );

export const activeGoodSelector =
  createSelector<IReducerStates, RouteComponentProps<IMatchParams>, IGoodsState, string, IGood | undefined>(
    goodsSelector,
    activeItemIdSelector,
    (items, itemId) => (isFinite(+itemId) && items[+itemId]) || undefined
  );

const parseGoodDistributionKey = (key: string) => {
  const [goodIdString, warehouseIdString] = key.split('_');

  return {
    goodId: parseInt(goodIdString, 10) || 0,
    warehouseId: parseInt(warehouseIdString, 10) || undefined
  }
}

const warehouseGoodsSelectorCombainer = (distributionItems: IGoodsDistributionState, goods: IGoodsState,
                                         warehouseId?: number, isUnalloated?: boolean) =>
  Object.entries(distributionItems)
    .filter(([key, item]) => (parseGoodDistributionKey(key).warehouseId === warehouseId) && (isUnalloated? !!item : true))
    .map(([key, itemNumber]) => {
        const { goodId } = parseGoodDistributionKey(key);
        const good = goods[goodId];

        return {
          id: goodId,
          title: good.title,
          number: itemNumber
        }
      }
    ).sort(sortItemsByIds);

export const unallocatedGoodsSelector =
  createSelector<IReducerStates, IGoodsDistributionState, IGoodsState, any>(
    goodsDistributionSelector,
    goodsSelector,
    (distributionItems, goods) =>
      warehouseGoodsSelectorCombainer(distributionItems, goods, undefined, true)
  );

export const activeWarehouseGoodsSelector =
  createSelector<IReducerStates, RouteComponentProps<IMatchParams>, IGoodsDistributionState, string, IGoodsState, IUnallocatedGood[]>(
    goodsDistributionSelector,
    activeItemIdSelector,
    goodsSelector,
    (distributionItems, warehouseId, goods) =>
      warehouseGoodsSelectorCombainer(distributionItems, goods, parseInt(warehouseId, 10) || undefined, true)
);



    /*
    .map([itemKey: string, itemNumber: number] => ({
        id: 3,
        title: '',
        number: 0
      })
     */
/*(distributionItems, goods) => unallocatedItems.filter(item => !item.warehouseId)
  .map(item => ({
    id: item.goodId,
    title: goods[item.goodId].title,
    number: item.number
  }))
  .sort((left, right) => (left.id > right.id ? 1 : -1)) *
);

/*
const expensiveSelector = createSelector(
  state => state.items,
  items => memoize(
    minValue => items.filter(item => item.value > minValue)
  )
)


export const warehouseGoodsSelector =
  createSelector<[IReducerStates, number], IGoodsDistributionState, IGoodsState, IUnallocatedGood[]>(
    goodsDistributionSelector(),
    goodsSelector,
    (distributionItems, goods) => {
      console.log('+++++++++++++++++++++++++++++');
      console.log(distributionItems);
      console.log(goods);

      return [];
    }
  );

/*
export const warehouseGoodsSelector =
  createSelector<[IReducerStates, number], IGoodsDistributionState, IGoodsState, IUnallocatedGood[]>(
    goodsDistributionSelector(),
    goodsSelector,
    (distributionItems, goods) => {
      console.log('+++++++++++++++++++++++++++++');
      console.log(distributionItems);
      console.log(goods);

      return [];
    }
);*/

/*
export const unallocatedGoodsSelector =
createSelector<IReducerStates, IGoodsDistributionState, IGoodsState, IUnallocatedGood[]>(
goodsDistributionSelector,
goodsSelector,
(distributionItems, goods) => Object.entries(distributionItems).map()
/*(distributionItems, goods) => unallocatedItems.filter(item => !item.warehouseId)
  .map(item => ({
    id: item.goodId,
    title: goods[item.goodId].title,
    number: item.number
  }))
  .sort((left, right) => (left.id > right.id ? 1 : -1)) *
);
*/