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
import NewDialog from "./newDialog";
import ModifyDialog from "./modifyDialog";

import axios from "axios";
import { Url } from "../../routes";

import { cardsTableData } from "./data/cardTableData";
import { authentication } from "../../App"


function TableCard() {

  const [request, setRequest] = useState({ loading: true, data: cardsTableData });

  const [modifyOpen, setModifyOpen] = useState(false);
  const [modifycardID, setModifycardID] = useState();

  const searchRef = useRef();

  useEffect(async () => {
    await axios.get(Url + "/card" + "/findAll")
      .then(function (response) {
        console.log(response.data)
        renewData(response.data);
        console.log(request.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    setRequest({ loading: false, data: request.data });
  }, []);


  function renewData(row) {
    request.data.rows = [];
    for (let i = 0; i < row.length; i++) {
      request.data.rows.push(genCard(row[i]));
    }
  }

  function genCard(aCard) {

    let id = aCard.card_id;

    return ({
      "id": id,
      "cusId": aCard.customer_id,
      "balance": aCard.balance,
      "卡号": <ID id={aCard.card_id} />,
      "持卡人ID": <ID id={aCard.customer_id} />,
      "余额": <Balance balance={aCard.balance} />,
      "操作": (
        <SuiBox sx={{ display: 'flex' }} pl={2}>
          <SuiButton color="info" size="small" onClick={() => { setModifyDialog(id) }}>修改</SuiButton>
          <SuiButton color="error" size="small" onClick={() => { removeACard(id) }}>删除</SuiButton>
        </SuiBox>
      ),
    })
  }

  function addACard(aCard) {
    axios.post(Url + "/card" + "/save", {
      card_id: aCard.card_id,
      customer_id: aCard.customer_id,
      balance: aCard.balance
    }, {
      timeout: 1000,
    })
      .then(function (response) {
        console.log(response)
        if (response.data === "success") {
          request.data.rows.push(genCard(aCard));
          setRequest({ loading: false, data: request.data });
          alert("添加成功");
        } else {
          alert("添加失败");
        }
      })
      .catch(function (error) {
        console.log(error);
        alert("添加失败");
      });
  }

  function removeACard(cardID) {
    axios.delete(Url + "/card" + "/deleteById/" + cardID)
      .then(function (response) {
        console.log(response)
        for (let i = 0; i < request.data.rows.length; i++) {
          if (request.data.rows[i].card_id === cardID) {
            request.data.rows.splice(i, 1);
            break;
          }
        }
        setRequest({ loading: true, data: request.data });
      })
      .catch(function (error) {
        console.log(error);
        alert("删除失败")
      });
  }

  function setModifyDialog(cardID) {
    setModifyOpen(true);
    setModifycardID(cardID);
  }

  function modifyACard(aCard) {

    axios.put(Url + "/card" + "/update", {
      card_id: aCard.card_id,
      customer_id: aCard.customer_id,
      balance: aCard.balance
    }, {
      timeout: 1000,
    })
      .then(function (response) {
        console.log(response)
        for (let i = 0; i < request.data.rows.length; i++) {
          if (request.data.rows[i].id === aCard.card_id) {
            request.data.rows[i] = genCard(aCard);
            break;
          }
        }
        setRequest({ loading: false, data: request.data });
        alert("修改成功");
      })
      .catch(function (error) {
        alert("修改失败");
        console.log(error);
      });
  }

  const search = () => {
    for (let i = request.data.rows.length - 1; i >= 0; i--) {
      if (request.data.rows[i].id.indexOf(searchRef.current?.value) != -1
        || request.data.rows[i].cusId.indexOf(searchRef.current?.value) != -1
        || request.data.rows[i].balance==searchRef.current?.value
      ) {}else{
        request.data.rows.splice(i, 1);
      }
    }
  }

  const handleSearch = () => {
    if (request.loading) {
      handleReSearch(false);
    } else {
      search();
      setRequest({ loading: true, data: request.data });
    }
  }

  const handleReSearch = (reset) => {
    axios.get(Url + "/card" + "/findAll")
      .then(function (response) {
        console.log(response);
        renewData(response.data);
        if (!reset) {
          search();
          setRequest({ loading: true, data: request.data });
          return;
        }
        setRequest({ loading: false, data: request.data });
      })
      .catch(function (error) {
        console.log(error);
        alert("查询失败")
      });
  }

  if (authentication >= 3)
    return (
      <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        您无权限查看该页面</SuiBox>);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Card>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SuiTypography variant="h6">会员卡信息表</SuiTypography>
              <SuiBox display="flex">
                <SuiInput
                  placeholder="查询"
                  inputRef={searchRef}
                  icon={{ component: "search", direction: "left" }}
                />
                <SuiButton color="dark" onClick={handleSearch}>搜索</SuiButton>
                <SuiButton color="secondary" onClick={handleReSearch}>重置</SuiButton>
              </SuiBox>
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
      <NewDialog addCard={addACard} />
      <ModifyDialog setOpen={setModifyOpen} open={modifyOpen}
        cardID={modifycardID} modifyCard={modifyACard} />
    </DashboardLayout>
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

