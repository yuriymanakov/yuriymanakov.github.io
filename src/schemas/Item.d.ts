interface IItem {
  id: number;
  name: string;
}

interface IWarehouse {
  title: string;
  address: string;
}

interface IGood {
  title: string;
  description: string;
}

interface IUnallocatedGood {
  id: number;
  title: string;
  number: number;
}

interface IWarehousesState {
  [id: number]: IWarehouse;
}

interface IGoodsState {
  [id: number]: IGood;
}

interface IWarehouseUnallocatedGoodsRequest {
  [goodId: number]: number
}

interface IWarehouseEditRequest {
  data: IWarehouse
  unallocatedGoodsRequest: IWarehouseUnallocatedGoodsRequest
}

type IGoodsDistributionState = {
  [compoundkey: string]: number;
};