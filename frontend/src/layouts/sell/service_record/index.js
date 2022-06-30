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

import { serviceRecordsTableData } from "./data/serviceRecordTableData";
import {authentication} from "../../../App"


function TableServiceRecord() {

  const [request, setRequest] = useState({ loading: true, data: serviceRecordsTableData });

  const [modifyOpen, setModifyOpen] = useState(false);
  const [modifyID, setModifyID] = useState();

  const searchRef = useRef();

  useEffect(async () => {
    await axios.get(Url + "/service_record" + "/findAll")
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
      request.data.rows.push(genServiceRecord(row[i]));
    }
  }

  function genServiceRecord(aSR) {

    let id = aSR.id;

    return ({
      "id": id,
      "employee_no": aSR.employee_no,
      "service_no": aSR.service_no,
      "customer_no": aSR.customer_no,
      "num":aSR.num,
      "编号": <ID id={aSR.id} />,
      "员工编号": <ID id={aSR.employee_no} />,
      "服务编号": <ID id={aSR.service_no} />,
      "顾客编号": <ID id={aSR.customer_no} />,
      "数量": <ID id={aSR.num} />,
      "操作": (
        <SuiBox sx={{ display: 'flex' }} pl={2}>
          <SuiButton color="info" size="small" onClick={() => { setModifyDialog(id) }}>修改</SuiButton>
          <SuiButton color="error" size="small" onClick={() => { removeAServiceRecord(id) }}>删除</SuiButton>
        </SuiBox>
      ),
    })
  }

  function addAServiceRecord(aSR) {
    axios.post(Url + "/service_record" + "/save", {
      id: aSR.id,
      employee_no: aSR.employee_no,
      customer_no: aSR.customer_no== '' ? null : aSR.customer_no,
      service_no: aSR.service_no,
    }, {
      timeout: 1000,
    })
      .then(function (response) {
        console.log(response)
        if (response.data === "success") {
          request.data.rows.push(genServiceRecord(aSR));
        setRequest({ loading: false, data: request.data });
        alert("添加成功");
        } else {
          alert("添加失败");
        }
      })
      .catch(function (error) {
        console.log(error);
        console.log(aSR)
        alert("添加失败");
      });

  }

  function removeAServiceRecord(ID) {
    axios.delete(Url + "/service_record" + "/deleteById/" + ID)
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

  function modifyAServiceRecord(aSR) {

    axios.put(Url + "/service_record" + "/update", {
      id: aSR.id,
      employee_no: aSR.employee_no,
      customer_no: aSR.customer_no== '' ? null : aSR.customer_no,
      service_no: aSR.service_no,
      num:aSR.num,
    }, {
      timeout: 1000,
    })
      .then(function (response) {
        console.log(response)
        for (let i = 0; i < request.data.rows.length; i++) {
          if (request.data.rows[i].id === aSR.id) {
            request.data.rows[i] = genServiceRecord(aSR);
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
        || request.data.rows[i].service_no.indexOf(searchRef.current?.value) != -1
        || request.data.rows[i].customer_no.indexOf(searchRef.current?.value) != -1
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
    axios.get(Url + "/service_record" + "/findAll")
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
    return (null);

  return (
    <>
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Card>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SuiTypography variant="h6">服务记录信息表</SuiTypography>
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
      <NewDialog addServiceRecord={addAServiceRecord} />
      <ModifyDialog setOpen={setModifyOpen} open={modifyOpen}
        ID={modifyID} modifyServiceRecord={modifyAServiceRecord} />
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



