import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import {
  orderedGoodsSelector,
  activeItemIdSelector,
  activeGoodSelector,
  IMatchParams,
  IGoodsOrderedListItem
} from '../../redux/selectors';

import EntitiesPage from '../../components/BaseEntitiesPage';

import GoodsEditForm from './components/EditForm';

interface StateProps {
  goods: IGoodsOrderedListItem[],
  currentItemId: string,
  currentGood?: IGood
}

type OwnProps = RouteComponentProps<IMatchParams>

type IProps = StateProps & OwnProps;

const WarehousesContainer: React.FC<IProps> = ({ goods, currentGood, currentItemId }) => {
  return (
    <EntitiesPage
      entities={goods}
      currentItemId={currentItemId}
      currentItem={currentGood}
      currentItemComponent={GoodsEditForm}
      entitiesName="goods"
      addButtonTitle="Добавить товар"
      notFoundTitle={`Товар #${currentItemId} не найден`}
    />
  );
};

const mapStateToProps = (states: IReducerStates, ownProps: RouteComponentProps<IMatchParams>): StateProps => ({
  goods: orderedGoodsSelector(states),
  currentItemId: activeItemIdSelector(states, ownProps),
  currentGood: activeGoodSelector(states, ownProps)
});

const mapDispatchToProps = (): {} => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WarehousesContainer);
