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

import { productsTableData } from "./data/productsTableData";
import { authentication } from "../../../App"


function TableProduct() {

  const [request, setRequest] = useState({ loading: true, data: productsTableData });

  const [modifyOpen, setModifyOpen] = useState(false);
  const [modifyID, setModifyID] = useState();

  const searchRef = useRef();

  useEffect(async () => {
    await axios.get(Url + "/product" + "/findAll")
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
      request.data.rows.push(genProduct(row[i]));
    }
  }

  function genProduct(aPdct) {

    let id = aPdct.id;

    return ({
      "id": id,
      "name": aPdct.name,
      "numShop": aPdct.number_in_shop,
      "numStore": aPdct.number_in_storehouse,
      "price": aPdct.price,
      "remarks": aPdct.remarks,
      "编号": <ID id={aPdct.id} />,
      "名称": <Name name={aPdct.name} />,
      "店内现存量": <Number number={aPdct.number_in_shop} />,
      "仓库剩余存货量": <Number number={aPdct.number_in_storehouse} />,
      "指导价": <Price price={aPdct.price} />,
      "备注": <Remarks remarks={aPdct.remarks} />,
      "操作": (
        <SuiBox sx={{ display: 'flex' }} pl={2}>
          <SuiButton color="info" size="small" onClick={() => { setModifyDialog(id) }}>修改</SuiButton>
          <SuiButton color="error" size="small" onClick={() => { removeAProduct(id) }}>删除</SuiButton>
        </SuiBox>
      ),
    })
  }

  function addAProduct(aPdct) {
    axios.post(Url + "/product" + "/save", {
      id: aPdct.id,
      name: aPdct.name,
      number_in_shop: aPdct.number_in_shop,
      number_in_storehouse: aPdct.number_in_storehouse,
      price: aPdct.price,
      remarks: aPdct.remarks
    }, {
      timeout: 1000,
    })
      .then(function (response) {
        console.log(response)
        if (response.data === "success") {
          request.data.rows.push(genProduct(aPdct));
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

  function removeAProduct(id) {
    axios.delete(Url + "/product" + "/deleteById/" + id)
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

  function modifyAProduct(aPdct) {

    axios.put(Url + "/product" + "/update", {
      id: aPdct.id,
      name: aPdct.name,
      number_in_shop: aPdct.number_in_shop,
      number_in_storehouse: aPdct.number_in_storehouse,
      price: aPdct.price,
      remarks: aPdct.remarks
    }, {
      timeout: 1000,
    })
      .then(function (response) {
        console.log(response)
        for (let i = 0; i < request.data.rows.length; i++) {
          if (request.data.rows[i].id === aPdct.id) {
            request.data.rows[i] = genProduct(aPdct);
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
        || request.data.rows[i].name.indexOf(searchRef.current?.value) != -1
        || request.data.rows[i].numShop == searchRef.current?.value
        || request.data.rows[i].numStore == searchRef.current?.value
        || request.data.rows[i].price == searchRef.current?.value
        || request.data.rows[i].remarks&&request.data.rows[i].remarks.indexOf(searchRef.current?.value) != -1
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
    axios.get(Url + "/product" + "/findAll")
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

  if (authentication !== 0 && authentication !== 1 && authentication !== 2 && authentication !== 5 )
    return (
      <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        您无权限查看该页面</SuiBox>);

  return (
    <>
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Card>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SuiTypography variant="h6">产品信息表</SuiTypography>
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
      <NewDialog addProduct={addAProduct} />
      <ModifyDialog setOpen={setModifyOpen} open={modifyOpen}
        id={modifyID} modifyProduct={modifyAProduct} />
    </>
  );
}

export default TableProduct;


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

function Number({ number }) {
  return (
    <SuiBox display="flex" flexDirection="column">
      <SuiTypography variant="caption" fontWeight="medium" color="text">
        {number}
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



