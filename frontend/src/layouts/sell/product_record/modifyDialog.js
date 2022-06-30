import React, { useRef, useEffect } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import SuiInput from "components/SuiInput";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography"

import axios from 'axios';
import { Url } from '../../../routes'

export default function ModifyDialog(props) {

    const [cusID, setcusID] = React.useState('');
    const [svID, setsvID] = React.useState('');
    const [eplID, seteplID] = React.useState('');
    const [num, setNum] = React.useState('');

    const cusIDRef = useRef();
    const svIDRef = useRef();
    const eplIDRef = useRef();
    const numRef =useRef();

    useEffect(async () => {
        if (props.ID) {
            await axios.get(Url + "/product_record" + "/findById/" + props.ID)
                .then(function (response) {
                    console.log(response);
                    setcusID(response.data.customer_no);
                    setsvID(response.data.product_no);
                    seteplID(response.data.employee_no)
                    setNum(response.data.num)
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
        if (svIDRef.current?.value == '') {
            alert("服务编号不能为空");
            return;
        }
        if (eplIDRef.current?.value == '') {
            alert("销售员编号不能为空");
            return;
        }
        if (numRef.current?.value == '') {
            alert("数量不能为空");
            return;
        }
        let aPR = [];
        aPR.id = props.ID;
        aPR.customer_no = cusIDRef.current?.value
        aPR.product_no = svIDRef.current?.value;
        aPR.employee_no=eplIDRef.current?.value;
        aPR.num = numRef.current?.value;
        props.modifyProductRecord(aPR);
        props.setOpen(false);
    }

    return (
        <div>
            <Dialog open={props.open} onClose={handleClose}>
                <DialogTitle>修改销货记录</DialogTitle>
                <DialogContent>
                    <SuiBox component="form" role="form">
                        <SuiBox mb={2}>
                            <SuiBox mb={1} ml={0.5}>
                                <SuiTypography component="label" variant="h6" fontWeight="bold">
                                    编号
                                </SuiTypography>
                            </SuiBox>
                            <SuiInput type="text" defaultValue={props.ID} disabled={true} />
                        </SuiBox>
                        <SuiBox mb={2}>
                            <SuiBox mb={1} ml={0.5}>
                                <SuiTypography component="label" variant="h6" fontWeight="bold">
                                    销售员编号
                                </SuiTypography>
                            </SuiBox>
                            <SuiInput type="text" inputRef={eplIDRef} value={eplID}
                                onChange={(e) => { seteplID(e.target.value) }} />
                        </SuiBox>
                        <SuiBox mb={2}>
                            <SuiBox mb={1} ml={0.5}>
                                <SuiTypography component="label" variant="h6" fontWeight="bold">
                                    销货编号
                                </SuiTypography>
                            </SuiBox>
                            <SuiInput type="text" inputRef={svIDRef} value={svID}
                                onChange={(e) => { setsvID(e.target.value) }} />
                        </SuiBox>
                        <SuiBox mb={2}>
                            <SuiBox mb={1} ml={0.5}>
                                <SuiTypography component="label" variant="h6" fontWeight="bold">
                                    顾客编号
                                </SuiTypography>
                            </SuiBox>
                            <SuiInput type="text" inputRef={cusIDRef} value={cusID}
                                onChange={(e) => { setcusID(e.target.value) }} />
                        </SuiBox>
                        <SuiBox mb={2}>
                            <SuiBox mb={1} ml={0.5}>
                                <SuiTypography component="label" variant="h6" fontWeight="bold">
                                    数量
                                </SuiTypography>
                            </SuiBox>
                            <SuiInput type="number" inputRef={numRef} value={num}
                                onChange={(e) => { setNum(e.target.value) }} />
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