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
    const [isOnJob, setIsOnJob] = React.useState('y');
    const [tel, setTel] = React.useState('');
    const [type, setType] = React.useState('');
    const [perm, setPerm] = React.useState('');
    const [password, setPassword] = React.useState('');


    const nameRef = useRef();
    const onJobRef = useRef();
    const telRef = useRef();
    const typeRef = useRef();
    const pwdRef = useRef();

    useEffect(async () => {
        if (props.id) {
            await axios.get(Url + "/employee" + "/findById/" + props.id)
                .then(function (response) {
                    console.log(response);
                    setName(response.data.name);
                    setSex(response.data.sex);
                    setIsOnJob(response.data.is_on_job);
                    setTel(response.data.tel);
                    setType(response.data.type);
                    setPerm(response.data.permission);
                    setPassword(response.data.password);
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
        if (props.id == '') {
            alert('??????????????????');
            return;
        }
        if (nameRef.current?.value == '') {
            alert('??????????????????');
            return;
        }
        if (perm == '') {
            alert('??????????????????');
            return;
        }
        if (pwdRef.current?.value == '') {
            alert('??????????????????');
            return;
        }
        let aEpl = [];
        aEpl.id = props.id;
        aEpl.name = nameRef.current?.value;
        aEpl.sex = sex;
        aEpl.is_on_job = isOnJob;
        aEpl.tel = telRef.current?.value;
        aEpl.type = typeRef.current?.value;
        aEpl.permission = perm;
        aEpl.password = pwdRef.current?.value;
        props.modifyEmployee(aEpl);
    }

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
            <Dialog open={props.open} onClose={handleClose}>
                <DialogTitle>??????????????????</DialogTitle>
                <DialogContent>
                    <SuiBox component="form" role="form">
                        <SuiBox mb={2}>
                            <SuiBox mb={1} ml={0.5}>
                                <SuiTypography component="label" variant="h6" fontWeight="bold">
                                    ??????
                                </SuiTypography>
                            </SuiBox>
                            <SuiInput type="text" defaultValue={props.id} disabled={true} />
                        </SuiBox>
                        <SuiBox mb={2}>
                            <SuiBox mb={1} ml={0.5}>
                                <SuiTypography component="label" variant="h6" fontWeight="bold">
                                    ??????
                                </SuiTypography>
                            </SuiBox>
                            <SuiInput type="text" inputRef={nameRef} value={name}
                                onChange={(e) => { setName(e.target.value) }} />
                        </SuiBox>
                        <SuiBox mb={2}>
                            <SuiBox mb={1} ml={0.5}>
                                <SuiTypography component="label" variant="h6" fontWeight="bold">
                                    ??????
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
                                        <FormControlLabel value="f" control={<Radio />} label="???" />
                                        <FormControlLabel value="m" control={<Radio />} label="???" />
                                    </RadioGroup>
                                </FormControl>
                            </SuiBox>
                        </SuiBox>
                        <SuiBox mb={2}>
                            <SuiBox mb={1} ml={0.5}>
                                <SuiTypography component="label" variant="h6" fontWeight="bold">
                                    ????????????
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
                                        <FormControlLabel value="y" control={<Radio />} label="???" />
                                        <FormControlLabel value="n" control={<Radio />} label="???" />
                                    </RadioGroup>
                                </FormControl>
                            </SuiBox>
                        </SuiBox>
                        <SuiBox mb={2}>
                            <SuiBox mb={1} ml={0.5}>
                                <SuiTypography component="label" variant="h6" fontWeight="bold">
                                    ??????
                                </SuiTypography>
                            </SuiBox>
                            <SuiInput type="tel" inputRef={telRef} value={tel}
                                onChange={(e) => { setTel(e.target.value) }} />
                        </SuiBox>
                        <SuiBox mb={2}>
                            <SuiBox mb={1} ml={0.5}>
                                <SuiTypography component="label" variant="h6" fontWeight="bold">
                                    ??????
                                </SuiTypography>
                            </SuiBox>
                            <SuiInput type="text" inputRef={typeRef} value={type}
                                onChange={(e) => { setType(e.target.value) }} />
                        </SuiBox>
                        <SuiBox mb={2}>
                            <SuiBox mb={1} ml={0.5}>
                                <SuiTypography component="label" variant="h6" fontWeight="bold">
                                    ??????
                                </SuiTypography>
                            </SuiBox>
                            <SuiBox mb={1} ml={3}>
                                <RadioGroup
                                    row
                                    aria-labelledby="perm-group-label"
                                    name="perm-group"
                                    value={perm}
                                    onChange={handlePermChange}
                                >
                                    <FormControlLabel value={0} control={<Radio />} label="???????????????" />
                                    <FormControlLabel value={1} control={<Radio />} label="??????" />
                                    <FormControlLabel value={2} control={<Radio />} label="????????????" />
                                    <FormControlLabel value={3} control={<Radio />} label="????????????" />
                                    <FormControlLabel value={4} control={<Radio />} label="????????????" />
                                    <FormControlLabel value={5} control={<Radio />} label="????????????" />
                                </RadioGroup>
                            </SuiBox>
                        </SuiBox>
                        <SuiBox mb={2}>
                            <SuiBox mb={1} ml={0.5}>
                                <SuiTypography component="label" variant="h6" fontWeight="bold">
                                    ??????
                                </SuiTypography>
                            </SuiBox>
                            <SuiInput type="password" inputRef={pwdRef} value={password}
                                onChange={(e) => { setPassword(e.target.value) }} />
                        </SuiBox>
                    </SuiBox>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>??????</Button>
                    <Button onClick={handleSubmit}>??????</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}