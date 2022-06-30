import { useEffect, useState, useRef } from "react";
// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";
import SuiBadge from "components/SuiBadge";
import SuiInput from "components/SuiInput";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "examples/Tables/Table";
import NewDialog from "./newDialog";
import ModifyDialog from "./modifyDialog";
import { RegularAsk } from "./regular/regular";

import axios from "axios";
import { Url } from "../../routes";

import { employeesTableData } from "./data/employeesTableData";
import { authentication } from "../../App" 


function TableEmployee() {

  const [request, setRequest] = useState({ loading: true, data: employeesTableData });

  const [modifyOpen, setModifyOpen] = useState(false);
  const [modifyID, setModifyID] = useState();

  const searchRef = useRef();

  useEffect(async () => {
    await axios.get(Url + "/employee" + "/findAll")
      .then(function (response) {
        console.log(response)
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
      request.data.rows.push(genEmployee(row[i]));
    }
  }

  function genEmployee(aEpl) {

    let id = aEpl.id;
    let outSex = aEpl.sex === "m" ? "男" : "女";
    let outJob = aEpl.is_on_job == "y" ? "是" : "否";
    let outPermissiom = char2Perm(aEpl.permission);

    return ({
      "id": id,
      "name": aEpl.name,
      "sex": outSex,
      "isOnJob": outJob,
      "tel": aEpl.tel,
      "type": aEpl.type,
      "perm": outPermissiom,
      "password": aEpl.password,
      "编号": <ID id={aEpl.id} />,
      "姓名": <Name name={aEpl.name} />,
      "性别": <Sex sex={outSex} />,
      "是否在职": <OnJob isOnJob={outJob} />,
      "电话": <Tel tel={aEpl.tel} />,
      "类型": <Type type={aEpl.type} />,
      "权限": (
        <SuiBadge variant="gradient" badgeContent={outPermissiom} color="success" size="sm" container />
      ),
      "密码": <Password password={aEpl.password} />,
      "操作": (
        <SuiBox sx={{ display: 'flex' }} pl={2}>
          <SuiButton color="info" size="small" onClick={() => { setModifyDialog(id) }}>修改</SuiButton>
          <SuiButton color="error" size="small" onClick={() => { removeAEmployee(id) }}>删除</SuiButton>
        </SuiBox>
      ),
    })
  }

  function addAEmployee(aEpl) {
    axios.post(Url + "/employee" + "/save", {
      id: aEpl.id,
      name: aEpl.name,
      sex: aEpl.sex,
      type: aEpl.type,
      is_on_job: aEpl.is_on_job,
      tel: aEpl.tel,
      permission: aEpl.permission,
      password: aEpl.password
    }, {
      timeout: 1000,
    })
      .then(function (response) {
        console.log(response)
        if (response.data === "success") {
          request.data.rows.push(genEmployee(aEpl));
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

  function removeAEmployee(id) {
    axios.delete(Url + "/employee" + "/deleteById/" + id)
      .then(function (response) {
        console.log(response)
        for (let i = 0; i < request.data.rows.length; i++) {
          if (request.data.rows[i].id === id) {
            request.data.rows.splice(i, 1);
            break;
          }
        }
        alert("删除成功")
        setRequest({ loading: true, data: request.data });
      })
      .catch(function (error) {
        console.log(error);
        alert("删除失败")
      });
  }

  function setModifyDialog(id) {
    setModifyOpen(true);
    setModifyID(id);
  }

  function modifyAEmployee(aEpl) {

    axios.put(Url + "/employee" + "/update", {
      id: aEpl.id,
      name: aEpl.name,
      sex: aEpl.sex,
      type: aEpl.type,
      is_on_job: aEpl.is_on_job,
      tel: aEpl.tel,
      permission: aEpl.permission,
      password: aEpl.password
    }, {
      timeout: 1000,
    })
      .then(function (response) {
        console.log(response)
        for (let i = 0; i < request.data.rows.length; i++) {
          if (request.data.rows[i].id === aEpl.id) {
            request.data.rows[i] = genEmployee(aEpl);
            break;
          }
        }
        setRequest({ loading: false, data: request.data });
        setModifyOpen(false);
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
        || request.data.rows[i].name.indexOf(searchRef.current?.value) != -1
        || request.data.rows[i].sex.indexOf(searchRef.current?.value) != -1
        || request.data.rows[i].isOnJob.indexOf(searchRef.current?.value) != -1
        || request.data.rows[i].tel && request.data.rows[i].tel.indexOf(searchRef.current?.value) != -1
        || request.data.rows[i].type && request.data.rows[i].type.indexOf(searchRef.current?.value) != -1
        || request.data.rows[i].perm.indexOf(searchRef.current?.value) != -1
        || request.data.rows[i].password.indexOf(searchRef.current?.value) != -1
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
    axios.get(Url + "/employee" + "/findAll")
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

  if (authentication !== 0 && authentication !== 1 && authentication !== 4)
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
              <SuiTypography variant="h6">员工信息表</SuiTypography>
              <SuiBox display="flex">
                <SuiInput
                  placeholder="单表查询"
                  inputRef={searchRef}
                  type="text"
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
      <NewDialog addEmployee={addAEmployee} />
      <ModifyDialog setOpen={setModifyOpen} open={modifyOpen}
        id={modifyID} modifyEmployee={modifyAEmployee} />
       <RegularAsk/>
    </DashboardLayout>
  );
}

export default TableEmployee;


function Name({ name }) {
  return (
    <SuiBox display="flex" alignItems="center" px={1} py={0.5}>
      <SuiBox display="flex" flexDirection="column">
        <SuiTypography variant="button" fontWeight="medium">
          {name}
        </SuiTypography>
      </SuiBox>
    </SuiBox>
  );
}

function ID({ id }) {
  return (
    <SuiBox display="flex" flexDirection="column">
      <SuiTypography variant="caption" fontWeight="medium" color="text">
        {id}
      </SuiTypography>
    </SuiBox>
  );
}

function Sex({ sex }) {
  return (
    <SuiBox display="flex" flexDirection="column">
      <SuiTypography variant="caption" fontWeight="medium" color="text">
        {sex}
      </SuiTypography>
    </SuiBox>
  );
}

function Tel({ tel }) {
  return (
    <SuiBox display="flex" flexDirection="column">
      <SuiTypography variant="caption" fontWeight="medium" color="text">
        {tel}
      </SuiTypography>
    </SuiBox>
  );
}

function Type({ type }) {
  return (
    <SuiBox display="flex" flexDirection="column">
      <SuiTypography variant="caption" fontWeight="medium" color="text">
        {type}
      </SuiTypography>
    </SuiBox>
  );
}


function OnJob({ isOnJob }) {
  return (
    <SuiBox display="flex" flexDirection="column">
      <SuiTypography variant="caption" fontWeight="medium" color="text">
        {isOnJob}
      </SuiTypography>
    </SuiBox>
  );
}

function Password({ password }) {
  return (
    <SuiBox display="flex" flexDirection="column">
      <SuiTypography variant="caption" fontWeight="medium" color="text">
        {password}
      </SuiTypography>
    </SuiBox>
  );
}

function char2Perm(permission) {
  if (permission == 0) return "系统管理员"
  else if (permission == 1) return "全部"
  else if (permission == 2) return "销售管理"
  else if (permission == 3) return "库存管理"
  else if (permission == 4) return "人员管理"
  else if (permission == 5) return "定价管理"
  return "error";
}


