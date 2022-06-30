import React, { useRef } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import SuiButton from 'components/SuiButton';
import SuiInput from "components/SuiInput";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography"

export default function NewDialog(props) {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (pdcNoRef.current?.value == '') {
      alert("产品编号不能为空");
      return;
    }
    if (batchRef.current?.value == '') {
      alert("批次不能为空");
      return;
    }
    if (allNumRef.current?.value == '') {
      alert("数量不能为空");
      return;
    }
    if (allNumRef.current?.value < 0) {
      alert("数量不能小于0");
      return;
    }
    if (eplIDRef.current?.value == '') {
      alert("负责员工编号不能为空");
      return;
    }
    if (priceRef.current?.value == '') {
      alert("进价(单价)不能为空");
      return;
    }
    if (priceRef.current?.value < 0) {
      alert("进价(单价)不能小于0");
      return;
    }
    let aPcs = [];
    aPcs.purchaseKey = [];
    aPcs.purchaseKey.product_no = pdcNoRef.current?.value;
    aPcs.purchaseKey.batch = batchRef.current?.value;
    aPcs.all_number = allNumRef.current?.value;
    aPcs.employee_no = eplIDRef.current?.value;
    aPcs.purchase_date = pcsDateRef.current?.value;
    aPcs.price = priceRef.current?.value;
    aPcs.remarks = remarksRef.current?.value;
    props.addPurchase(aPcs);
    setOpen(false);
  }

  const pdcNoRef = useRef();
  const batchRef = useRef();
  const allNumRef = useRef();
  const eplIDRef = useRef();
  const pcsDateRef = useRef();
  const priceRef = useRef();
  const remarksRef = useRef();

  return (
    <div>
      <SuiButton variant="contained" color="primary" onClick={handleClickOpen}>
        添加进货信息
      </SuiButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>添加进货信息</DialogTitle>
        <DialogContent>
          <SuiBox component="form" role="form">
            <SuiBox mb={2}>
              <SuiBox mb={1} ml={0.5}>
                <SuiTypography component="label" variant="h6" fontWeight="bold">
                  产品编号
                </SuiTypography>
              </SuiBox>
              <SuiInput type="text" inputRef={pdcNoRef} placeholder="如：1000010002" />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiBox mb={1} ml={0.5}>
                <SuiTypography component="label" variant="h6" fontWeight="bold">
                  批次
                </SuiTypography>
              </SuiBox>
              <SuiInput type="text" inputRef={batchRef} placeholder="如：10000" />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiBox mb={1} ml={0.5}>
                <SuiTypography component="label" variant="h6" fontWeight="bold">
                  数量
                </SuiTypography>
              </SuiBox>
              <SuiInput type="number" inputRef={allNumRef} placeholder="数量" />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiBox mb={1} ml={0.5}>
                <SuiTypography component="label" variant="h6" fontWeight="bold">
                  负责员工编号
                </SuiTypography>
              </SuiBox>
              <SuiInput type="text" inputRef={eplIDRef} placeholder="如：10023" />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiBox mb={1} ml={0.5}>
                <SuiTypography component="label" variant="h6" fontWeight="bold">
                  进货日期
                </SuiTypography>
              </SuiBox>
              <SuiInput type="date" inputRef={pcsDateRef} />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiBox mb={1} ml={0.5}>
                <SuiTypography component="label" variant="h6" fontWeight="bold">
                  进价（单价）
                </SuiTypography>
              </SuiBox>
              <SuiInput type="number" inputRef={priceRef} placeholder="单位：元" />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiBox mb={1} ml={0.5}>
                <SuiTypography component="label" variant="h6" fontWeight="bold" >
                  备注
                </SuiTypography>
              </SuiBox>
              <SuiInput type="text" inputRef={remarksRef} multiline rows={3} />
            </SuiBox>
          </SuiBox>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleSubmit}>提交</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}