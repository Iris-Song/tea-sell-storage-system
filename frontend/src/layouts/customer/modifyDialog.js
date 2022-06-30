import React, { useRef, useEffect } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { FormControl } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { RadioGroup } from '@mui/material';
import { Radio } from '@mui/material';

import SuiInput from "components/SuiInput";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography"

import axios from 'axios';
import { Url } from '../../routes'

export default function ModifyDialog(props) {

    const [name, setName] = React.useState('');
    const [sex, setSex] = React.useState('f');
    const [type, setType] = React.useState('P');

    const nameRef = useRef();

    useEffect(async () => {
        if (props.id) {
            await axios.get(Url + "/customer" + "/findById/" + props.id)
                .then(function (response) {
                    console.log(response);
                    setSex(response.data.sex);
                    setType(response.data.type);
                    setName(response.data.name);
                    // console.log(response.data.name);
                    // console.log(orgName);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }, [props]);


    const handleClose = () => {
        props.setOpen(false);
    };

    const handleSubmit = () => {
        console.log(nameRef.current?.value);
        if(nameRef.current?.value==''){
            alert('姓名不能为空');
            return;
        }
        let aCus = [];
        aCus.id = props.id;
        aCus.name = nameRef.current?.value;
        aCus.sex = sex;
        aCus.type = type;
        props.modifyCustomer(aCus);
        props.setOpen(false);
    }

    const handleSexChange = (event) => {
        setSex(event.target.value)
    };

    const handleTypeChange = (event) => {
        setType(event.target.value)
    };

    return (
        <div>
            <Dialog open={props.open} onClose={handleClose}>
                <DialogTitle>修改顾客信息</DialogTitle>
                <DialogContent>
                    <SuiBox component="form" role="form">
                        <SuiBox mb={2}>
                            <SuiBox mb={1} ml={0.5}>
                                <SuiTypography component="label" variant="h6" fontWeight="bold">
                                    编号
                                </SuiTypography>
                            </SuiBox>
                            <SuiInput type="text" defaultValue={props.id} disabled={true} />
                        </SuiBox>
                        <SuiBox mb={2}>
                            <SuiBox mb={1} ml={0.5}>
                                <SuiTypography component="label" variant="h6" fontWeight="bold">
                                    姓名
                                </SuiTypography>
                            </SuiBox>
                            <SuiInput type="text" inputRef={nameRef} value={name}
                                onChange={(e) => { setName(e.target.value) }} />
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