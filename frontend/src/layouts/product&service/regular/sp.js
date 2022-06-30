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

export var shipmentTableData = {
  columns: [
    { name: "产品名", align: "center" },
    { name: "批次", align: "center" },
    { name: "数量", align: "center" },
    { name: "出货日期", align: "center" },
    { name: "备注", align: "center" }
  ],
  rows: [],
};


function TableShipment(props) {

  const [request, setRequest] = useState({ data: shipmentTableData });

  useEffect(async () => {
    await axios.get(Url + "/product" + "/findByName/" + props.name)
      .then(function (response) {
        console.log(response.data);
        if (response.data.length == 0) {
          renewData([]);
        } else {
          for (let i = 0; i < response.data.length; i++) {
            console.log(response.data[i])
            axios.get(Url + "/shipment" + "/findByProductNo/" + response.data[i].id)
              .then(function (res) {
                renewData(res.data,response.data[i].name);
              })
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [props]);


  function renewData(row,name) {
    request.data.rows = [];
    for (let i = 0; i < row.length; i++) {
      request.data.rows.push(genShipment(row[i],name));
    }
    setRequest({ data: request.data });
  }

  function genShipment(aSpm,name) {

    return ({
      "产品名": <Item id={name} />,
      "批次": <Item id={aSpm.shipmentKey.batch} />,
      "数量": <Item id={aSpm.all_number} />,
      "出货日期": <Item id={aSpm.shipment_date} />,
      "备注": <Remarks remarks={aSpm.remarks} />,
    })
  }

  if(!props.isShow)return null;

  return (
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Card>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SuiTypography variant="h6">产品出货表</SuiTypography>
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

export default TableShipment;


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


