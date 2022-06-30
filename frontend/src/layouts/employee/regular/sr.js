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

var serviceRecordsTableData = {
  columns: [
    { name: "服务员", align: "center" },
    { name: "服务编号", align: "center" },
    { name: "数量", align: "center" },
  ],

  rows: [
  ],
};

function TableServiceRecord(props) {

  const [request, setRequest] = useState({ loading: true, data: serviceRecordsTableData });

  useEffect(async () => {
    await axios.get(Url + "/employee" + "/findByName/" + props.name)
      .then(function (response) {
        if (response.data.length == 0) {
          renewData([]);
        } else {
          for (let i = 0; i < response.data.length; i++) {
            axios.get(Url + "/service_record" + "/findByEmployeeNo/" + response.data[i])
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
      request.data.rows.push(genServiceRecord(row[i]));
    }
    setRequest({ data: request.data });
  }

  function genServiceRecord(aSR) {
    return ({
      "服务员": <ID id={props.name} />,
      "服务编号": <ID id={aSR.service_no} />,
      "数量": <ID id={aSR.num} />,
    })
  }


  if (!props.isShow) return null;

  return (
    <>
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Card>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SuiTypography variant="h6">员工服务记录表</SuiTypography>
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
    </>
  );
}

export default TableServiceRecord;


function ID({ id }) {
  return (
    <SuiBox display="flex" flexDirection="column">
      <SuiTypography variant="caption" fontWeight="medium" color="text">
        {id}
      </SuiTypography>
    </SuiBox>
  );
}



