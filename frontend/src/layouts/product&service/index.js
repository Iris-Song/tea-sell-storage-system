// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { RegularAsk } from "./regular/regular";
import TableProduct from "./product";
import TableService from "./service";


function ProductService() {

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <TableProduct/>
      <TableService/>
      <RegularAsk/>
    </DashboardLayout>
  );
}

export default ProductService;
