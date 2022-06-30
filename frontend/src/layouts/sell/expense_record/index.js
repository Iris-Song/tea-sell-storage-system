import { useEffect, useState, useRef } from "react";
// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";

// Soft UI Dashboard React examples
import Table from "examples/Tables/Table";
import NewDialog from "./newDialog";
import ModifyDialog from "./modifyDialog";

import axios from "axios";
import { Url } from "../../../routes";

import { expenseRecordsTableData } from "./data/expenseRecordTableData";
import { authentication } from "../../../App"


function TableExpenseRecord() {

  const [request, setRequest] = useState({ loading: true, data: expenseRecordsTableData });

  const [modifyOpen, setModifyOpen] = useState(false);
  const [modifyID, setModifyID] = useState();

  const searchRef = useRef();

  useEffect(async () => {
    await axios.get(Url + "/expense_record" + "/findAll")
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
      request.data.rows.push(genExpenseRecord(row[i]));
    }
  }

  function genExpenseRecord(aER) {

    let id = aER.id;
    let outPay = char2payWay(aER.pay_way);

    return ({
      "id": id,
      "employee_no": aER.employee_no,
      "product_record_no": aER.product_record_no,
      "service_record_no": aER.service_record_no,
      "should_pay_amount": aER.should_pay_amount,
      "actual_pay_amount": aER.actual_pay_amount,
      "outPay": outPay,
      "card_no": aER.card_no,
      "编号": <ID id={aER.id} />,
      "操作员编号": <ID id={aER.employee_no} />,
      "购货记录编号": <ID id={aER.product_record_no} />,
      "服务记录编号": <ID id={aER.service_record_no} />,
      "应付金额": <Price price={aER.should_pay_amount} />,
      "实付金额": <Price price={aER.actual_pay_amount} />,
      "结算方式": <ID id={outPay} />,
      "消费卡号": <ID id={aER.card_no} />,
      "操作": (
        <SuiBox sx={{ display: 'flex' }} pl={2}>
          <SuiButton color="info" size="small" onClick={() => { setModifyDialog(id) }}>修改</SuiButton>
          <SuiButton color="error" size="small" onClick={() => { removeAExpenseRecord(id) }}>删除</SuiButton>
        </SuiBox>
      ),
    })
  }

  function addAExpenseRecord(aER) {
    axios.post(Url + "/expense_record" + "/save", {
      id: aER.id,
      employee_no: aER.employee_no,
      product_record_no: aER.product_record_no == '' ? null : aER.product_record_no,
      service_record_no: aER.service_record_no == '' ? null : aER.service_record_no,
      should_pay_amount: aER.should_pay_amount,
      actual_pay_amount: aER.actual_pay_amount,
      pay_way: aER.pay_way == '' ? null : aER.pay_way,
      card_no: aER.card_no == '' ? null : aER.card_no
    }, {
      timeout: 1000,
    })
      .then(function (response) {
        console.log(response)
        if (response.data === "success") {
          request.data.rows.push(genExpenseRecord(aER));
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

  function removeAExpenseRecord(ID) {
    axios.delete(Url + "/expense_record" + "/deleteById/" + ID)
      .then(function (response) {
        console.log(response)
        for (let i = 0; i < request.data.rows.length; i++) {
          if (request.data.rows[i].id === ID) {
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

  function setModifyDialog(ID) {
    setModifyOpen(true);
    setModifyID(ID);
  }

  function modifyAExpenseRecord(aER) {

    axios.put(Url + "/expense_record" + "/update", {
      id: aER.id,
      employee_no: aER.employee_no,
      product_record_no: aER.product_record_no == '' ? null : aER.product_record_no,
      service_record_no: aER.service_record_no == '' ? null : aER.service_record_no,
      should_pay_amount: aER.should_pay_amount,
      actual_pay_amount: aER.actual_pay_amount,
      pay_way: aER.pay_way == '' ? null : aER.pay_way,
      card_no: aER.card_no == '' ? null : aER.card_no
    }, {
      timeout: 1000,
    })
      .then(function (response) {
        console.log(response)
        for (let i = 0; i < request.data.rows.length; i++) {
          if (request.data.rows[i].id === aER.id) {
            request.data.rows[i] = genExpenseRecord(aER);
            break;
          }
        }
        setRequest({ loading: false, data: request.data });
        alert("修改成功");
        setModifyOpen(false);
      })
      .catch(function (error) {
        alert("修改失败");
        console.log(error);
      });
  }

  const search = () => {
    for (let i = request.data.rows.length - 1; i >= 0; i--) {
      if (request.data.rows[i].id.indexOf(searchRef.current?.value) != -1
        || request.data.rows[i].employee_no.indexOf(searchRef.current?.value) != -1
        || request.data.rows[i].product_record_no.indexOf(searchRef.current?.value) != -1
        || request.data.rows[i].service_record_no.indexOf(searchRef.current?.value) != -1
        || request.data.rows[i].should_pay_amount == searchRef.current?.value
        || request.data.rows[i].actual_pay_amount == searchRef.current?.value
        || request.data.rows[i].outPay.indexOf(searchRef.current?.value) != -1
        || request.data.rows[i].card_no.indexOf(searchRef.current?.value) != -1
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
    axios.get(Url + "/expense_record" + "/findAll")
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

  if (authentication !== 0 && authentication !== 1 && authentication !== 2)
    return (
      <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        您无权限查看该页面</SuiBox>);

  return (
    <>
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Card>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SuiTypography variant="h6">消费记录信息表</SuiTypography>
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
      <NewDialog addExpenseRecord={addAExpenseRecord} />
      <ModifyDialog setOpen={setModifyOpen} open={modifyOpen}
        ID={modifyID} modifyExpenseRecord={modifyAExpenseRecord} />
    </>
  );
}

export default TableExpenseRecord;


function ID({ id }) {
  return (
    <SuiBox display="flex" flexDirection="column">
      <SuiTypography variant="caption" fontWeight="medium" color="text">
        {id}
      </SuiTypography>
    </SuiBox>
  );
}

function Price({ price }) {
  return (
    <SuiBox display="flex" flexDirection="column">
      <SuiTypography variant="caption" fontWeight="medium" color="text">
        {price}
      </SuiTypography>
    </SuiBox>
  );
}

function char2payWay(ch) {
  if (ch == 1) {
    return "现金";
  } else if (ch == 2) {
    return "信用卡";
  } else if (ch == 3) {
    return "店内会员卡";
  }
  return "error";
}
