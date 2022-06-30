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

import { purchaseTableData } from "./data/purchaseTableData";
import { authentication } from "../../App"


function TablePurchase() {

  const [request, setRequest] = useState({ loading: true, data: purchaseTableData });

  const [modifyOpen, setModifyOpen] = useState(false);
  //复合主键
  const [modifyPcsID, setModifyPcsID] = useState({ product_no: '', batch: '' });

  const searchRef = useRef();

  useEffect(async () => {
    await axios.get(Url + "/purchase" + "/findAll")
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
      request.data.rows.push(genPurchase(row[i]));
    }
  }

  function genPurchase(aPcs) {

    let id = aPcs.purchaseKey;

    return ({
      "id": id,
      "all_number": aPcs.all_number,
      "employee_no": aPcs.employee_no,
      "purchase_date": aPcs.purchase_date,
      "price": aPcs.price,
      "remarks": aPcs.remarks,
      "产品编号": <Item id={aPcs.purchaseKey.product_no} />,
      "批次": <Item id={aPcs.purchaseKey.batch} />,
      "数量": <Item id={aPcs.all_number} />,
      "负责员工编号": <Item id={aPcs.employee_no} />,
      "进货日期": <Item id={aPcs.purchase_date} />,
      "进价（单价）": <Item id={aPcs.price} />,
      "备注": <Remarks remarks={aPcs.remarks} />,
      "操作": (
        <SuiBox sx={{ display: 'flex' }} pl={2}>
          <SuiButton color="info" size="small" onClick={() => { setModifyDialog(id) }}>修改</SuiButton>
          <SuiButton color="error" size="small" onClick={() => { removeAPurchase(id) }}>删除</SuiButton>
        </SuiBox>
      ),
    })
  }

  function addAPurchase(aPcs) {
    axios.post(Url + "/purchase" + "/save",
      {
        purchaseKey: {
          product_no: aPcs.purchaseKey.product_no,
          batch: aPcs.purchaseKey.batch
        },
        all_number: aPcs.all_number,
        employee_no: aPcs.employee_no,
        purchase_date: aPcs.purchase_date,
        price: aPcs.price,
        remarks: aPcs.remarks
      }, {
      timeout: 1000,
    })
      .then(function (response) {
        console.log(response)
        if (response.data === "success") {
          request.data.rows.push(genPurchase(aPcs));
          setRequest({ loading: false, data: request.data });
          alert("添加成功");
        } else {
          alert("添加失败");
        }
        return true;
      })
      .catch(function (error) {
        console.log(error);
        alert("添加失败");
        return false;
      });

  }

  function removeAPurchase(purchaseKey) {
    axios.delete(Url + "/purchase" + "/deleteById", {
      params: {
        product_no: purchaseKey.product_no,
        batch: purchaseKey.batch
      }
    })
      .then(function (response) {
        console.log(response)
        for (let i = 0; i < request.data.rows.length; i++) {
          if (request.data.rows[i].id.product_no === purchaseKey.product_no
            || request.data.rows[i].id.batch === purchaseKey.batch) {
            request.data.rows.splice(i, 1);
            break;
          }
        }
        setRequest({ loading: true, data: request.data });
      })
      .catch(function (error) {
        console.log(error);
        alert("删除失败");
      });
  }

  function setModifyDialog(id) {
    setModifyOpen(true);
    setModifyPcsID(id);
  }

  function modifyAPurchase(aPcs) {

    axios.put(Url + "/purchase" + "/update",
      {
        purchaseKey: {
          product_no: aPcs.purchaseKey.product_no,
          batch: aPcs.purchaseKey.batch
        },
        all_number: aPcs.all_number,
        employee_no: aPcs.employee_no,
        purchase_date: aPcs.purchase_date,
        price: aPcs.price,
        remarks: aPcs.remarks
      }
      , {
        timeout: 1000,
      })
      .then(function (response) {
        console.log(response)
        for (let i = 0; i < request.data.rows.length; i++) {
          if (request.data.rows[i].id.product_no === aPcs.purchaseKey.product_no
            || request.data.rows[i].id.batch === aPcs.purchaseKey.batch) {
            request.data.rows[i] = genPurchase(aPcs);
            break;
          }
        }
        setRequest({ loading: false, data: request.data });
        alert("修改成功");
        setModifyOpen(false);
      })
      .catch(function (error) {
        console.log(aPcs.purchaseKey)
        console.log(aPcs)
        alert("修改失败");
        console.log(error);
      });
  }

  const search = () => {
    for (let i = request.data.rows.length - 1; i >= 0; i--) {
      if (request.data.rows[i].id.product_no.indexOf(searchRef.current?.value) != -1
        || request.data.rows[i].id.batch.indexOf(searchRef.current?.value) != -1
        || request.data.rows[i].all_number == searchRef.current?.value
        || request.data.rows[i].employee_no.indexOf(searchRef.current?.value) != -1
        || request.data.rows[i].price == searchRef.current?.value
        || request.data.rows[i].remarks.indexOf(searchRef.current?.value) != -1
        || request.data.rows[i].purchase_date.indexOf(searchRef.current?.value) != -1
      ) { } else {
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
    axios.get(Url + "/purchase" + "/findAll")
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

  if (authentication !== 0 && authentication !== 1 && authentication !== 3)
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
              <SuiTypography variant="h6">进货信息表</SuiTypography>
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
      <NewDialog addPurchase={addAPurchase} />
      <ModifyDialog setOpen={setModifyOpen} open={modifyOpen}
        ID={modifyPcsID} modifyPurchase={modifyAPurchase} />
    </DashboardLayout>
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


