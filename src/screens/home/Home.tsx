import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@layout/header';
import { Tabs } from 'antd';
import { Link, Switch, Route } from 'react-router-dom';

import WarehousesContainer from '../../modules/warehouses/Warehouses';
import GoodsContainer from '../../modules/goods/Goods';

import './Home.less';
const { TabPane } = Tabs;

const publicPaths = [
  { exact: true, path: '/warehouses/:id?', component:  WarehousesContainer },
  { exact: true, path: '/goods/:id?', component:  GoodsContainer },
];

const Home = () => {
  const { t } = useTranslation('homeScreen');

  return (
    <>
      <Header />
      <Tabs type="card">
        <TabPane tab={<Link className="tab-link" to="/warehouses">Склады</Link>} key="warehouses"/>
        <TabPane tab={<Link className="tab-link" to="/goods">Продукция</Link>} key="goods"/>
      </Tabs>
      <div className="home">
        <Switch>
          <Route path={'/warehouses/:id?'} exact={true} component={WarehousesContainer} />
          <Route path={'/goods/:id?'} exact={true} component={GoodsContainer} />
        </Switch>
      </div>
    </>
  );
};

export default Home;
