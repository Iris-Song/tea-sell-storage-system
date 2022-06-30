/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import TableCustomer from "layouts/customer";
import TableCard from "layouts/card";
import ProductService from "layouts/product&service";
import TableEmployee from "layouts/employee";
import SignIn from "layouts/authentication/sign-in";
import TablePurchase from "layouts/purchase";
import TableShipment from "layouts/shipment";
import Sell from "layouts/sell"

// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Document from "examples/Icons/Document";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";
import Basket from "examples/Icons/Basket";

export const Url = "http://localhost:8082";


const routes = [
  { type: "title", title: "请登录", key: "sales-pages" },
  { type: "title", title: "销售管理", key: "sales-pages" },
  {
    type: "collapse",
    name: "商品/服务管理",
    key: "Product&Service",
    route: "/Product&Service",
    icon: <Basket size="12px" />,
    component: <ProductService />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "销售管理",
    key: "sell",
    route: "/sell",
    icon: <Document size="12px" />,
    component: <Sell />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "会员卡管理",
    key: "card",
    route: "/card",
    icon: <CreditCard size="12px" />,
    component: <TableCard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "顾客信息管理",
    key: "customer",
    route: "/customer",
    icon: <CustomerSupport size="12px" />,
    component: <TableCustomer />,
    noCollapse: true,
  },
  { type: "title", title: "仓库管理", key: "storage-pages" },
  {
    type: "collapse",
    name: "进货管理",
    key: "purchase",
    route: "/purchase",
    icon: <Shop size="12px" />,
    component: <TablePurchase />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "出货管理",
    key: "shipment",
    route: "/shipment",
    icon: <Office size="12px" />,
    component: <TableShipment />,
    noCollapse: true,
  },
  { type: "title", title: "人员管理", key: "employee-pages" },
  {
    type: "collapse",
    name: "员工管理",
    key: "employee",
    route: "/employee",
    icon: <Cube size="12px" />,
    component: <TableEmployee />,
    noCollapse: true,
  },
  {
    type: "none",//不显示
    name: "进货管理",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  {
    type: "none",
    name: "登录",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <Shop size="12px" />,
    component: <SignIn />,
    noCollapse: true,
  },
];

export default routes;
