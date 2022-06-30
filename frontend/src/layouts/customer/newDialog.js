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
  const [sex, setSex] = React.useState('f');
  const [type, setType] = React.useState('P');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if(id.current?.value==''){
      alert('编号不能为空');
      return;
    }
    if(name.current?.value==''){
      alert('姓名不能为空');
      return;
    }
    let aCus=[];
    aCus.id=id.current?.value;
    aCus.name=name.current?.value;
    aCus.sex=sex;
    aCus.type=type;
    props.addCustomer(aCus);
    setOpen(false);
  }

  const id = useRef();
  const name = useRef();

  const handleSexChange = (event) => {
    // console.log(event.target.value);
    setSex(event.target.value)
  };

  const handleTypeChange = (event) => {
    // console.log(event.target.value);
    setType(event.target.value)
  };

  return (
    <div>
      <SuiButton variant="contained" color="primary" onClick={handleClickOpen}>
        添加新顾客
      </SuiButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>添加新顾客</DialogTitle>
        <DialogContent>
          <SuiBox component="form" role="form">
            <SuiBox mb={2}>
              <SuiBox mb={1} ml={0.5}>
                <SuiTypography component="label" variant="h6" fontWeight="bold">
                  编号
                </SuiTypography>
              </SuiBox>
              <SuiInput type="text" inputRef={id} placeholder="如：10087" />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiBox mb={1} ml={0.5}>
                <SuiTypography component="label" variant="h6" fontWeight="bold">
                  姓名
                </SuiTypography>
              </SuiBox>
              <SuiInput type="text" inputRef={name} placeholder="姓名" />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiBox mb={1} ml={0.5}>
                <SuiTypography component="label" variant="h6" fontWeight="bold">
                  性别
                </SuiTypography>
              </SuiBox>
              <SuiBox mb={1} ml={3}>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="sex-group-label"
                    name="sx-group"
                    value={sex}
                    onChange={handleSexChange}
                  >
                    <FormControlLabel value="f" control={<Radio />} label="女" />
                    <FormControlLabel value="m" control={<Radio />} label="男" />
                  </RadioGroup>
                </FormControl>
              </SuiBox>
            </SuiBox>
            <SuiBox mb={2}>
              <SuiBox mb={1} ml={0.5}>
                <SuiTypography component="label" variant="h6" fontWeight="bold">
                  类型
                </SuiTypography>
              </SuiBox>
              <SuiBox mb={1} ml={3}>
                <RadioGroup
                  row
                  aria-labelledby="type-group-label"
                  defaultValue="P"
                  name="type-group"
                  value={type}
                  onChange={handleTypeChange}
                >
                  <FormControlLabel value="P" control={<Radio />} label="普通会员" />
                  <FormControlLabel value="G" control={<Radio />} label="金卡会员" />
                  <FormControlLabel value="D" control={<Radio />} label="钻石会员" />
                </RadioGroup>
              </SuiBox>
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