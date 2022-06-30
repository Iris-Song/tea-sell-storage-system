import React, { useRef } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { FormControl } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { RadioGroup } from '@mui/material';
import { Radio } from '@mui/material';

import SuiButton from 'components/SuiButton';
import SuiInput from "components/SuiInput";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography"

export default function NewDialog(props) {

  const [open, setOpen] = React.useState(false);
  const [payWay, setpayWay] = React.useState('2');

  const IDRef = useRef();
  const prIDRef = useRef();
  const srIDRef = useRef();
  const eplIDRef = useRef();
  const sdPriceRef = useRef();
  const acPriceRef = useRef();
  const cardIDRef = useRef();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePayWayChange = (event) => {
    setpayWay(event.target.value)
  };

  const handleSubmit = () => {
    if (IDRef.current?.value == '') {
      alert("编号不能为空");
      return;
    }
    if (prIDRef.current?.value == '' && srIDRef.current?.value == '') {
      alert("销货记录和服务记录不能都为空")
      return;
    }
    if (eplIDRef.current?.value == '') {
      alert("操作员编号不能为空");
      return;
    }
    if (sdPriceRef.current?.value == '') {
      alert("应付金额不能为空");
      return;
    }
    if (sdPriceRef.current?.value < 0) {
      alert("应付金额不能为负");
      return;
    }
    if (acPriceRef.current?.value == '') {
      alert("实付金额不能为空");
      return;
    }
    if (acPriceRef.current?.value < 0) {
      alert("实付金额不能为负");
      return;
    }
    if(payWay==3&&cardIDRef.current?.value==''){
      alert("卡号不能为空");
      return;
    }
    let aER = [];
    aER.id = IDRef.current?.value;
    aER.product_record_no = prIDRef.current?.value;
    aER.service_record_no = srIDRef.current?.value;
    aER.employee_no = eplIDRef.current?.value;
    aER.should_pay_amount = sdPriceRef.current?.value;
    aER.actual_pay_amount = acPriceRef.current?.value;
    aER.pay_way = payWay;
    aER.card_no = cardIDRef.current?.value;
    props.addExpenseRecord(aER);
    setOpen(false);
  }

  return (
    <div>
      <SuiButton variant="contained" color="primary" onClick={handleClickOpen}>
        添加消费记录
      </SuiButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>添加消费记录</DialogTitle>
        <DialogContent>
          <SuiBox component="form" role="form">
            <SuiBox mb={2}>
              <SuiBox mb={1} ml={0.5}>
                <SuiTypography component="label" variant="h6" fontWeight="bold">
                  编号
                </SuiTypography>
              </SuiBox>
              <SuiInput type="text" inputRef={IDRef} placeholder="如：10000100021000010002" />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiBox mb={1} ml={0.5}>
                <SuiTypography component="label" variant="h6" fontWeight="bold">
                  操作员编号
                </SuiTypography>
              </SuiBox>
              <SuiInput type="text" inputRef={eplIDRef} placeholder="如：10023" />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiBox mb={1} ml={0.5}>
                <SuiTypography component="label" variant="h6" fontWeight="bold">
                  购货记录编号
                </SuiTypography>
              </SuiBox>
              <SuiInput type="text" inputRef={prIDRef} placeholder="如：10000100021000010002" />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiBox mb={1} ml={0.5}>
                <SuiTypography component="label" variant="h6" fontWeight="bold">
                  服务记录编号
                </SuiTypography>
              </SuiBox>
              <SuiInput type="text" inputRef={srIDRef} placeholder="如：10000100021000010002" />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiBox mb={1} ml={0.5}>
                <SuiTypography component="label" variant="h6" fontWeight="bold">
                  应付金额
                </SuiTypography>
              </SuiBox>
              <SuiInput type="number" inputRef={sdPriceRef} placeholder="单位：元" />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiBox mb={1} ml={0.5}>
                <SuiTypography component="label" variant="h6" fontWeight="bold">
                  实付金额
                </SuiTypography>
              </SuiBox>
              <SuiInput type="number" inputRef={acPriceRef} placeholder="单位：元" />
            </SuiBox>
            <SuiBox mb={1} ml={0.5}>
              <SuiTypography component="label" variant="h6" fontWeight="bold">
                支付方式
              </SuiTypography>
            </SuiBox>
            <SuiBox mb={1} ml={3}>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="payWay-group-label"
                  name="payWay-group"
                  value={payWay}
                  onChange={handlePayWayChange}
                >
                  <FormControlLabel value={1} control={<Radio />} label="现金" />
                  <FormControlLabel value={2} control={<Radio />} label="信用卡" />
                  <FormControlLabel value={3} control={<Radio />} label="店内会员卡" />
                </RadioGroup>
              </FormControl>
            </SuiBox>
            <SuiBox mb={2}>
              <SuiBox mb={1} ml={0.5}>
                <SuiTypography component="label" variant="h6" fontWeight="bold">
                  消费卡号
                </SuiTypography>
              </SuiBox>
              <SuiInput type="text" inputRef={cardIDRef} placeholder="如：100001" />
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