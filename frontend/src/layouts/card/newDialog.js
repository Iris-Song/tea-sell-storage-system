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
    if (cardID.current?.value == '') {
      alert("卡号不能为空");
      return;
    }
    if (cusID.current?.value == '') {
      alert("持卡人编号不能为空");
      return;
    }
    if (balance.current?.value == '') {
      alert("余额不能为空");
      return;
    }
    if (balance.current?.value < 0) {
      alert("余额应为正数");
      return;
    }
    let aCard = [];
    aCard.card_id = cardID.current?.value;
    aCard.customer_id = cusID.current?.value;
    aCard.balance = balance.current?.value;
    props.addCard(aCard);
    setOpen(false);
  }

  const cardID = useRef();
  const cusID = useRef();
  const balance = useRef();

  return (
    <div>
      <SuiButton variant="contained" color="primary" onClick={handleClickOpen}>
        添加新卡
      </SuiButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>添加新卡</DialogTitle>
        <DialogContent>
          <SuiBox component="form" role="form">
            <SuiBox mb={2}>
              <SuiBox mb={1} ml={0.5}>
                <SuiTypography component="label" variant="h6" fontWeight="bold">
                  卡号
                </SuiTypography>
              </SuiBox>
              <SuiInput type="text" inputRef={cardID} placeholder="如：1000010002" />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiBox mb={1} ml={0.5}>
                <SuiTypography component="label" variant="h6" fontWeight="bold">
                  持卡人ID
                </SuiTypography>
              </SuiBox>
              <SuiInput type="text" inputRef={cusID} placeholder="如：10023" />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiBox mb={1} ml={0.5}>
                <SuiTypography component="label" variant="h6" fontWeight="bold">
                  余额
                </SuiTypography>
              </SuiBox>
              <SuiInput type="number" inputRef={balance} placeholder="余额" />
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