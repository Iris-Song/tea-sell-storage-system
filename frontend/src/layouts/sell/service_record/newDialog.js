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
    if (ID.current?.value == '') {
      alert("编号不能为空");
      return;
    }
    if (svID.current?.value == '') {
      alert("服务编号不能为空");
      return;
    }
    if (eplID.current?.value == '') {
      alert("员工编号不能为空");
      return;
    }
    if (num.current?.value == '') {
      alert("数量不能为空");
      return;
    }
    let aSR = [];
    aSR.id = ID.current?.value;
    aSR.customer_no = cusID.current?.value;
    aSR.service_no = svID.current?.value;
    aSR.employee_no = eplID.current?.value;
    aSR.num=num.current?.value;
    props.addServiceRecord(aSR);
    setOpen(false);
  }

  const ID = useRef();
  const cusID = useRef();
  const svID = useRef();
  const eplID = useRef();
  const num = useRef();

  return (
    <div>
      <SuiButton variant="contained" color="primary" onClick={handleClickOpen}>
        添加服务记录
      </SuiButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>添加服务记录</DialogTitle>
        <DialogContent>
          <SuiBox component="form" role="form">
            <SuiBox mb={2}>
              <SuiBox mb={1} ml={0.5}>
                <SuiTypography component="label" variant="h6" fontWeight="bold">
                  编号
                </SuiTypography>
              </SuiBox>
              <SuiInput type="text" inputRef={ID} placeholder="如：10000100021000010002" />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiBox mb={1} ml={0.5}>
                <SuiTypography component="label" variant="h6" fontWeight="bold">
                  员工编号
                </SuiTypography>
              </SuiBox>
              <SuiInput type="text" inputRef={eplID} placeholder="如：10023" />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiBox mb={1} ml={0.5}>
                <SuiTypography component="label" variant="h6" fontWeight="bold">
                  服务编号
                </SuiTypography>
              </SuiBox>
              <SuiInput type="text" inputRef={svID} placeholder="如：1000010002" />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiBox mb={1} ml={0.5}>
                <SuiTypography component="label" variant="h6" fontWeight="bold">
                  顾客编号
                </SuiTypography>
              </SuiBox>
              <SuiInput type="text" inputRef={cusID} placeholder="如：100023" />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiBox mb={1} ml={0.5}>
                <SuiTypography component="label" variant="h6" fontWeight="bold">
                  数量
                </SuiTypography>
              </SuiBox>
              <SuiInput type="number" inputRef={num} placeholder="如：1" />
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