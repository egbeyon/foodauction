import React, { lazy, Suspense } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Loading from './components/Loading';
import { ProtectedRoute, WithLayoutRoute } from './routers';

import { AdminLayout, PublicLayout } from './layouts';

// Admin
const DashboardPage = lazy(() => import('./pages/Admin/Dashboard'));
const ProductList = lazy(() => import('./pages/Admin/ProductList'));
const FarmList = lazy(() => import('./pages/Admin/FarmList'));
const HotbuyList = lazy(() => import('./pages/Admin/HotbuyList'));
const ReserveList = lazy(() => import('./pages/Admin/ReserveList'));
const User = lazy(() => import('./pages/Admin/User'));
const Account = lazy(() => import('./pages/Admin/Account'));

// Register - Login
const Register = lazy(() => import('./pages/Public/Register'));
const Login = lazy(() => import('./pages/Public/Login'));

// Public
const HomePage = lazy(() => import('./pages/Public/HomePage'));
const MyDashboard = lazy(() => import('./pages/Public/MyDashboard'));

const ProductPage = lazy(() => import('./pages/Public/ProductPage'));
const ProductCategoryPage = lazy(() =>
  import('./pages/Public/ProductCategoryPage')
);

const OrderPage = lazy(() => import('./pages/Public/OrderPage'));

const FarmsPage = lazy(() => import('./pages/Public/FarmsPage'));

const Checkin = lazy(() => import('./pages/Public/Checkin'));

const Routes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />

          <WithLayoutRoute
            exact
            path="/checkin/:reservationId"
            component={Checkin}
            layout={PublicLayout}
          />

          <WithLayoutRoute
            exact
            path="/"
            layout={PublicLayout}
            component={HomePage}
          />
          <WithLayoutRoute
            exact
            path="/mydashboard"
            layout={PublicLayout}
            component={MyDashboard}
          />
          <WithLayoutRoute
            exact
            path="/farms"
            layout={PublicLayout}
            component={FarmsPage}
          />
          <WithLayoutRoute
            exact
            path="/product/category/:category"
            layout={PublicLayout}
            component={ProductCategoryPage}
          />
          
          <WithLayoutRoute
            exact
            path="/product/:id"
            layout={PublicLayout}
            layoutProps={{ withFooter: false }}
            component={ProductPage}
          />
          <WithLayoutRoute
            exact
            path="/product/booking/:id"
            layout={PublicLayout}
            layoutProps={{ withFooter: false }}
            component={OrderPage}
          />
          <ProtectedRoute
            exact
            path="/admin/dashboard"
            layout={AdminLayout}
            component={DashboardPage}
          />
          <ProtectedRoute
            exact
            path="/admin/users"
            layout={AdminLayout}
            component={User}
          />
          <ProtectedRoute
            exact
            path="/admin/hotbuys"
            layout={AdminLayout}
            component={HotbuyList}
          />
          <ProtectedRoute
            exact
            path="/admin/reserves"
            layout={AdminLayout}
            component={ReserveList}
          />
          <ProtectedRoute
            exact
            path="/admin/farms"
            layout={AdminLayout}
            component={FarmList}
          />
          <ProtectedRoute
            exact
            path="/admin/products"
            layout={AdminLayout}
            component={ProductList}
          />
          <ProtectedRoute
            exact
            path="/admin/account"
            layout={AdminLayout}
            component={Account}
          />
          <Route path="*" component={() => '404 NOT FOUND'} />
        </Switch>
      </Router>
    </Suspense>
  );
};

export default Routes;
