import { useEffect, useState, useRef } from "react";
// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "examples/Tables/Table";

import axios from "axios";
import { Url } from "../../../routes";

const cardsTableData = {
    columns: [
      { name: "持卡人", align: "center" },
      { name: "卡号", align: "center" },
      { name: "余额", align: "center" },
    ],
    rows: [
    ],
  };
  
  

function TableCard(props) {

  const [request, setRequest] = useState({ loading: true, data: cardsTableData });

  useEffect(async () => {
    await axios.get(Url + "/customer" + "/findByName/" + props.name)
      .then(function (response) {
        if (response.data.length == 0) {
          renewData([]);
        } else {
          for (let i = 0; i < response.data.length; i++) {
            axios.get(Url + "/card" + "/findByCustomerId/" + response.data[i])
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
      request.data.rows.push(genCard(row[i]));
    }
    setRequest({ loading: false, data: request.data });
  }

  function genCard(aCard) {
    return ({
      "卡号": <ID id={aCard.card_id} />,
      "持卡人": <ID id={props.name} />,
      "余额": <Balance balance={aCard.balance} />,
    })
  }

  if(!props.isShow) return null;


  return (
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Card>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SuiTypography variant="h6">会员卡信息表</SuiTypography>
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

export default TableCard;


function ID({ id }) {
  return (
    <SuiBox display="flex" flexDirection="column">
      <SuiTypography variant="caption" fontWeight="medium" color="text">
        {id}
      </SuiTypography>
    </SuiBox>
  );
}


function Balance({ balance }) {
  return (
    <SuiBox display="flex" flexDirection="column">
      <SuiTypography variant="caption" fontWeight="medium" color="text">
        {balance}
      </SuiTypography>
    </SuiBox>
  );
}

