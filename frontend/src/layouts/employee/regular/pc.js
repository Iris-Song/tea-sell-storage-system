import { useEffect, useState, useRef } from "react";
// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard React examples
import Table from "examples/Tables/Table";

import axios from "axios";
import { Url } from "../../../routes";

const purchaseTableData = {
    columns: [
      { name: "负责员工", align: "center" },
      { name: "产品编号", align: "center" },
      { name: "批次", align: "center" },
      { name: "数量", align: "center" },
      { name: "进货日期", align: "center" },
      { name: "进价（单价）", align: "center" },
      { name: "备注", align: "center" },
    ],
    rows: [],
};



function TablePurchase(props) {

  const [request, setRequest] = useState({ loading: true, data: purchaseTableData });

  useEffect(async () => {
    await axios.get(Url + "/employee" + "/findByName/" + props.name)
      .then(function (response) {
        console.log(response.data);
        if (response.data.length == 0) {
          renewData([]);
        } else {
          for (let i = 0; i < response.data.length; i++) {
            console.log(response.data[i])
            axios.get(Url + "/purchase" + "/findByEmployeeNo/" + response.data[i])
              .then(function (res) {
                renewData(res.data);
              })
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [props]);


  function renewData(row) {
    request.data.rows = [];
    for (let i = 0; i < row.length; i++) {
      request.data.rows.push(genPurchase(row[i]));
    }
    setRequest({ data: request.data });
  }

  function genPurchase(aPcs) {

    return ({
      "负责员工": <Item id={props.name} />,
      "产品编号": <Item id={aPcs.purchaseKey.product_no} />,
      "批次": <Item id={aPcs.purchaseKey.batch} />,
      "数量": <Item id={aPcs.all_number} />,
      "进货日期": <Item id={aPcs.purchase_date} />,
      "备注": <Remarks remarks={aPcs.remarks} />,
    })
  }

  if(!props.isShow)return null;

  return (
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Card>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SuiTypography variant="h6">员工进货表</SuiTypography>
            </SuiBox>
            <SuiBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={request.data.columns} rows={request.data.rows} />
            </SuiBox>
          </Card>
        </SuiBox>
      </SuiBox>
  );
}

export default TablePurchase;


function Item({ id }) {
  return (
    <SuiBox display="flex" flexDirection="column">
      <SuiTypography variant="caption" fontWeight="medium" color="text">
        {id}
      </SuiTypography>
    </SuiBox>
  );
}

function Remarks({ remarks }) {

  let strSplice = [];
  for (let i = 0; remarks && i < remarks.length; i += 5) {
    strSplice.push(remarks.substr(i, Math.min(5, remarks.length - i)));
  }
  const renderRemarks = strSplice.map(str => {
    return (
      <SuiTypography variant="string" color="text">
        {str}
      </SuiTypography>
    )
  });

  return (
    <SuiBox display="flex" flexDirection="column">
      {renderRemarks}
    </SuiBox>
  );
}


