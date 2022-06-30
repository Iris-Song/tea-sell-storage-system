import { useEffect, useRef, useState } from "react";
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

import axios from "axios";
import { Url } from "../../routes";

import { customersTableData } from "./data/customersTableData";
import { authentication } from "../../App"
import { RegularAsk } from "./regular/regular";


function TableCustomer() {

  const [request, setRequest] = useState({ loading: true, data: customersTableData });

  const [modifyOpen, setModifyOpen] = useState(false);
  const [modifyID, setModifyID] = useState();

  const searchRef = useRef();

  useEffect(async () => {
    await axios.get(Url + "/customer" + "/findAll")
      .then(function (response) {
        console.log(response);
        renewData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    setRequest({ loading: false, data: request.data });
  }, []);


  function renewData(row) {
    request.data.rows = [];
    for (let i = 0; i < row.length; i++) {
      request.data.rows.push(genCustomer(row[i]));
    }
  }

  function genCustomer(aCus) {

    let id = aCus.id;
    let outSex = aCus.sex === "m" ? "男" : "女";
    let outType = char2type(aCus.type);

    return ({
      "id": id,
      "name": aCus.name,
      "sex": outSex,
      "type": outType,
      "编号": <ID id={aCus.id} />,
      "姓名": <Name name={aCus.name} />,
      "性别": <Sex sex={outSex} />,
      "类型": (
        <SuiBadge variant="gradient" badgeContent={outType} color="success" size="sm" container />
      ),
      "操作": (
        <SuiBox sx={{ display: 'flex' }} pl={2}>
          <SuiButton color="info" size="small" onClick={() => { setModifyDialog(id) }}>修改</SuiButton>
          <SuiButton color="error" size="small" onClick={() => { removeACustomer(id) }}>删除</SuiButton>
        </SuiBox>
      ),
    })
  }

  function addACustomer(aCus) {
    axios.post(Url + "/customer" + "/save", {
      id: aCus.id,
      name: aCus.name,
      sex: aCus.sex,
      type: aCus.type
    }, {
      timeout: 1000,
    })
      .then(function (response) {
        console.log(response)
        if (response.data === "success") {
          request.data.rows.push(genCustomer(aCus));
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

  function removeACustomer(id) {
    axios.delete(Url + "/customer" + "/deleteById/" + id)
      .then(function (response) {
        console.log(response)
        for (let i = 0; i < request.data.rows.length; i++) {
          if (request.data.rows[i].id === id) {
            request.data.rows.splice(i, 1);
            break;
          }
        }
        alert("删除成功")
        setRequest({ loading: false, data: request.data });
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

  function modifyACustomer(aCus) {

    axios.put(Url + "/customer" + "/update", {
      id: aCus.id,
      name: aCus.name,
      sex: aCus.sex,
      type: aCus.type
    }, {
      timeout: 1000,
    })
      .then(function (response) {
        console.log(response)
        for (let i = 0; i < request.data.rows.length; i++) {
          if (request.data.rows[i].id === aCus.id) {
            request.data.rows[i] = genCustomer(aCus);
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
      if (request.data.rows[i].id.indexOf(searchRef.current?.value) == -1
        && request.data.rows[i].name.indexOf(searchRef.current?.value) == -1
        && request.data.rows[i].sex.indexOf(searchRef.current?.value) == -1
        && request.data.rows[i].type.indexOf(searchRef.current?.value) == -1
      ) {
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
    axios.get(Url + "/customer" + "/findAll")
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

  if (authentication !== 0 && authentication !== 1 && authentication !== 2 && authentication !== 4)
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
              <SuiTypography variant="h6">顾客信息表</SuiTypography>
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
      <NewDialog addCustomer={addACustomer} />
      <ModifyDialog setOpen={setModifyOpen} open={modifyOpen}
        id={modifyID} modifyCustomer={modifyACustomer} />
      <RegularAsk />
    </DashboardLayout>
  );
}

export default TableCustomer;


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

function char2type(type) {
  if (type === "G") return "金卡会员"
  else if (type === "D") return "钻石会员"
  return "普通会员";
}


