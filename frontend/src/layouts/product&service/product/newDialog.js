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

import { authentication } from 'App';

export default function NewDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (id.current?.value == '') {
      alert("编号不能为空");
      return;
    }
    if (name.current?.value == '') {
      alert("名称不能为空");
      return;
    }
    if (price.current?.value == '') {
      alert("指导价不能为空");
      return;
    }
    if (price.current?.value < 0) {
      alert("指导价不能小于0");
      return;
    }
    let aPdct = [];
    aPdct.id = id.current?.value;
    aPdct.name = name.current?.value;
    aPdct.number_in_shop = 0;
    aPdct.number_in_storehouse = 0;
    aPdct.price = price.current?.value;
    aPdct.remarks = remarks.current?.value;
    props.addProduct(aPdct);
    setOpen(false);
  }

  const id = useRef();
  const name = useRef();
  const price = useRef();
  const remarks = useRef();

  if (authentication === 2)
    return null;


  return (
    <div>
      <SuiButton variant="contained" color="primary" onClick={handleClickOpen}>
        添加新产品
      </SuiButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>添加新产品</DialogTitle>
        <DialogContent>
          <SuiBox component="form" role="form">
            <SuiBox mb={2}>
              <SuiBox mb={1} ml={0.5}>
                <SuiTypography component="label" variant="h6" fontWeight="bold">
                  编号
                </SuiTypography>
              </SuiBox>
              <SuiInput type="text" inputRef={id} placeholder="如：1234567890" />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiBox mb={1} ml={0.5}>
                <SuiTypography component="label" variant="h6" fontWeight="bold">
                  名称
                </SuiTypography>
              </SuiBox>
              <SuiInput type="text" inputRef={name} placeholder="名称" />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiBox mb={1} ml={0.5}>
                <SuiTypography component="label" variant="h6" fontWeight="bold">
                  指导价
                </SuiTypography>
              </SuiBox>
              <SuiInput type="text" inputRef={price} placeholder="价格（元）" />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiBox mb={1} ml={0.5}>
                <SuiTypography component="label" variant="h6" fontWeight="bold" >
                  备注
                </SuiTypography>
              </SuiBox>
              <SuiInput type="text" inputRef={remarks} multiline rows={3} />
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