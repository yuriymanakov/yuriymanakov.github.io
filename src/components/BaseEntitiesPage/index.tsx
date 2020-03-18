import React from 'react';
import { Layout, Button, Card } from 'antd';
import './EntitiesPage.less';
import ListItem from './ListItem';
import { Link } from 'react-router-dom';

const { Sider, Content } = Layout;

interface Entity {
  id: number;
  title: string;
}

interface IProps<T> {
  entities: Entity[];
  currentItemId: string;
  currentItem: T;
  currentItemComponent?: React.ComponentClass<{isNew: boolean; id?: number; data?: T}> | any;
  entitiesName: string;
  addButtonTitle: string;
  notFoundTitle: string;
}

type IEntitiesPage<T = any> = React.FC<IProps<T>>;

const EntitiesPage: IEntitiesPage = props => {
  const CurrentItemComponent = props.currentItemComponent;
  const { currentItem, currentItemId, entitiesName } = props;
  const isNewCurrentItem = currentItemId === 'new';

  return (
    <Layout>
      <Sider>
        <Button type="primary" size="large">
          <Link to={{pathname: `/${entitiesName}/new`}}>
            {props.addButtonTitle}
          </Link>
        </Button>
        {props.entities.map(entity =>
          <ListItem
            key={entity.id}
            id={entity.id}
            title={entity.title}
            entitiesName={entitiesName}
          />
        )}
      </Sider>
      <Content>
        {(!isNewCurrentItem && currentItemId && !currentItem) &&
        <Card title={props.notFoundTitle} />}
        {(isNewCurrentItem || currentItem) && CurrentItemComponent &&
        <CurrentItemComponent
          isNew={isNewCurrentItem}
          id={!isNewCurrentItem ? +props.currentItemId : undefined}
          data={currentItem}
        />}
      </Content>
    </Layout>
  );
};

export default EntitiesPage;
