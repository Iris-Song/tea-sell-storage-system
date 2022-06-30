// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import TableServiceRecord from "./service_record";
import TableProductRecord from "./product_record"
import TableExpenseRecord from "./expense_record";

function Sell() {

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <TableServiceRecord />
            <TableProductRecord />
            <TableExpenseRecord />
        </DashboardLayout>
    );
}

export default Sell;
