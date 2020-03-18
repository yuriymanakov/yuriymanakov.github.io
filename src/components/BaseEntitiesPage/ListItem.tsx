import React from 'react';
import { NavLink } from 'react-router-dom';

import './ListItem.less';

export interface ItemProps {
  id: number;
  title: string;
  entitiesName: string;
}

const ListItem:  React.FC<ItemProps> = ({ id, entitiesName, title }) =>
  <div className="list-item">
    <NavLink to={{pathname: `/${entitiesName}/${id}`}} className={'link'} activeClassName={'active-link'}>
      {title}
    </NavLink>
  </div>;

export default ListItem;
