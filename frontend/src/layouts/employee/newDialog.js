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
  const [isOnJob, setIsOnJob] = React.useState('y');
  const [perm, setPerm] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (id.current?.value == '') {
      alert('编号不能为空');
      return;
    }
    if (name.current?.value == '') {
      alert('姓名不能为空');
      return;
    }
    if (perm == '') {
      alert('权限不能为空');
      return;
    }
    if (password.current?.value == '') {
      alert('密码不能为空');
      return;
    }
    let aEpl = [];
    aEpl.id = id.current?.value;
    aEpl.name = name.current?.value;
    aEpl.tel = tel.current?.value;
    aEpl.type = type.current?.value;
    aEpl.password = password.current?.value;
    aEpl.sex = sex;
    aEpl.is_on_job = isOnJob;
    aEpl.permission = perm;
    props.addEmployee(aEpl);
    setOpen(false);
  }

  const id = useRef();
  const name = useRef();
  const tel = useRef();
  const type = useRef();
  const password = useRef();

  const handleSexChange = (event) => {
    setSex(event.target.value)
  };

  const handlePermChange = (event) => {
    setPerm(event.target.value)
  };

  const handleIsOnJobChange = (event) => {
    setIsOnJob(event.target.value)
  };

  return (
    <div>
      <SuiButton variant="contained" color="primary" onClick={handleClickOpen}>
        添加新员工
      </SuiButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>添加新员工</DialogTitle>
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
                  是否在职
                </SuiTypography>
              </SuiBox>
              <SuiBox mb={1} ml={3}>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="onJob-group-label"
                    name="onJob-group"
                    value={isOnJob}
                    onChange={handleIsOnJobChange}
                  >
                    <FormControlLabel value="y" control={<Radio />} label="是" />
                    <FormControlLabel value="n" control={<Radio />} label="否" />
                  </RadioGroup>
                </FormControl>
              </SuiBox>
            </SuiBox>
            <SuiBox mb={2}>
              <SuiBox mb={1} ml={0.5}>
                <SuiTypography component="label" variant="h6" fontWeight="bold">
                  电话
                </SuiTypography>
              </SuiBox>
              <SuiInput type="text" inputRef={tel} placeholder="电话号码" />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiBox mb={1} ml={0.5}>
                <SuiTypography component="label" variant="h6" fontWeight="bold">
                  类型
                </SuiTypography>
              </SuiBox>
              <SuiInput type="text" inputRef={type} placeholder="如：销售员" />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiBox mb={1} ml={0.5}>
                <SuiTypography component="label" variant="h6" fontWeight="bold">
                  权限
                </SuiTypography>
              </SuiBox>
              <SuiBox mb={1} ml={3}>
                <RadioGroup
                  row
                  aria-labelledby="perm-group-label"
                  defaultValue={2}
                  name="perm-group"
                  value={perm}
                  onChange={handlePermChange}
                >
                  <FormControlLabel value={0} control={<Radio />} label="系统管理员" />
                  <FormControlLabel value={1} control={<Radio />} label="全部" />
                  <FormControlLabel value={2} control={<Radio />} label="销售管理" />
                  <FormControlLabel value={3} control={<Radio />} label="库存管理" />
                  <FormControlLabel value={4} control={<Radio />} label="人员管理" />
                  <FormControlLabel value={5} control={<Radio />} label="定价管理" />
                </RadioGroup>
              </SuiBox>
            </SuiBox>
            <SuiBox mb={2}>
              <SuiBox mb={1} ml={0.5}>
                <SuiTypography component="label" variant="h6" fontWeight="bold">
                  密码
                </SuiTypography>
              </SuiBox>
              <SuiInput type="password" inputRef={password} />
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