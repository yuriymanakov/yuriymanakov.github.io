import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import {
  orderedWarehousesSelector,
  activeItemIdSelector,
  activeWarehouseSelector,
  IMatchParams,
  IWarehousesOrderedListItem
} from '../../redux/selectors';

import EntitiesPage from '../../components/BaseEntitiesPage';

import WarehouseEditForm from './components/EditForm';

interface StateProps {
  warehouses: IWarehousesOrderedListItem[],
  currentItemId: string,
  currentWarehouse?: IWarehouse
}

type OwnProps = RouteComponentProps<IMatchParams>

type IProps = StateProps & OwnProps;

const WarehousesContainer: React.FC<IProps> = ({ warehouses, currentWarehouse, currentItemId }) => {
  return (
    <EntitiesPage
      entities={warehouses}
      currentItemId={currentItemId}
      currentItem={currentWarehouse}
      currentItemComponent={WarehouseEditForm}
      entitiesName="warehouses"
      addButtonTitle="Добавить склад"
      notFoundTitle={`Cклад #${currentItemId} не найден`}
    />
  );
};

const mapStateToProps = (states: IReducerStates, ownProps: RouteComponentProps<IMatchParams>): StateProps => ({
  warehouses: orderedWarehousesSelector(states),
  currentItemId: activeItemIdSelector(states, ownProps),
  currentWarehouse: activeWarehouseSelector(states, ownProps)
});

const mapDispatchToProps = (): {} => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WarehousesContainer);
