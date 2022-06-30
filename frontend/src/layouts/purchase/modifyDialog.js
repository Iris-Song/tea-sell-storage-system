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
import { Url } from '../../routes'

export default function ModifyDialog(props) {

    const [allNum, setAllNum] = React.useState('');
    const [eplID, setEplID] = React.useState('');
    const [pcsDate, setPcsDate] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [remarks, setRemarks] = React.useState('');


    const allNumRef = useRef();
    const eplIDRef = useRef();
    const pcsDateRef = useRef();
    const priceRef = useRef();
    const remarksRef = useRef();

    useEffect(async () => {
        if (props.ID) {
            await axios.get(Url + "/purchase" + "/findById" ,{
                params:{
                    product_no:props.ID.product_no,
                    batch:props.ID.batch
                }
            }
           )
                .then(function (response) {
                    console.log(response);
                    setAllNum(response.data.all_number);
                    setEplID(response.data.employee_no);
                    setPcsDate(response.data.purchase_date);
                    setPrice(response.data.price);
                    setRemarks(response.data.remarks);
                })
                .catch(function (error) {
                    console.log(JSON.stringify(props.ID))
                    console.log(error);
                });
        }
    }, [props]);


    const handleClose = () => {
        props.setOpen(false);
    };

    const handleSubmit = () => {
        if(allNumRef.current?.value==''){
            alert("数量不能为空");
            return;
        }
        if(allNumRef.current?.value<0){
            alert("数量不能小于0");
            return;
        }
        if(eplIDRef.current?.value==''){
            alert("负责员工编号不能为空");
            return;
        }
        if(priceRef.current?.value==''){
            alert("进价(单价)不能为空");
            return;
        }
        if(priceRef.current?.value<0){
            alert("进价(单价)不能小于0");
            return;
        }
        let aPcs = [];
        aPcs.purchaseKey=[];
        aPcs.purchaseKey.product_no = props.ID.product_no;
        aPcs.purchaseKey.batch = props.ID.batch;
        aPcs.all_number = allNumRef.current?.value;
        aPcs.employee_no = eplIDRef.current?.value;
        aPcs.purchase_date = pcsDateRef.current?.value;
        aPcs.price = priceRef.current?.value;
        aPcs.remarks = remarksRef.current?.value;
        props.modifyPurchase(aPcs);
    }

    return (
        <div>
            <Dialog open={props.open} onClose={handleClose}>
                <DialogTitle>修改进货信息</DialogTitle>
                <DialogContent>
                    <SuiBox component="form" role="form">
                        <SuiBox mb={2}>
                            <SuiBox mb={1} ml={0.5}>
                                <SuiTypography component="label" variant="h6" fontWeight="bold">
                                    产品批号
                                </SuiTypography>
                            </SuiBox>
                            <SuiInput type="text" defaultValue={props.ID.product_no} disabled={true} />
                        </SuiBox>
                        <SuiBox mb={2}>
                            <SuiBox mb={1} ml={0.5}>
                                <SuiTypography component="label" variant="h6" fontWeight="bold">
                                    批次
                                </SuiTypography>
                            </SuiBox>
                            <SuiInput type="text" defaultValue={props.ID.batch} disabled={true} />
                        </SuiBox>
                        <SuiBox mb={2}>
                            <SuiBox mb={1} ml={0.5}>
                                <SuiTypography component="label" variant="h6" fontWeight="bold">
                                    数量
                                </SuiTypography>
                            </SuiBox>
                            <SuiInput type="number" inputRef={allNumRef} value={allNum}
                                onChange={(e) => { setAllNum(e.target.value) }} />
                        </SuiBox>
                        <SuiBox mb={2}>
                            <SuiBox mb={1} ml={0.5}>
                                <SuiTypography component="label" variant="h6" fontWeight="bold">
                                    负责员工编号
                                </SuiTypography>
                            </SuiBox>
                            <SuiInput type="text" inputRef={eplIDRef} value={eplID}
                                onChange={(e) => { setEplID(e.target.value) }} />
                        </SuiBox>
                        <SuiBox mb={2}>
                            <SuiBox mb={1} ml={0.5}>
                                <SuiTypography component="label" variant="h6" fontWeight="bold">
                                    进货日期
                                </SuiTypography>
                            </SuiBox>
                            <SuiInput type="date" inputRef={pcsDateRef} value={pcsDate}
                                onChange={(e) => { setPcsDate(e.target.value) }} />
                        </SuiBox>
                        <SuiBox mb={2}>
                            <SuiBox mb={1} ml={0.5}>
                                <SuiTypography component="label" variant="h6" fontWeight="bold">
                                    进价（单价）
                                </SuiTypography>
                            </SuiBox>
                            <SuiInput type="number" inputRef={priceRef} value={price}
                                onChange={(e) => { setPrice(e.target.value) }} />
                        </SuiBox>
                        <SuiBox mb={2}>
                            <SuiBox mb={1} ml={0.5}>
                                <SuiTypography component="label" variant="h6" fontWeight="bold" >
                                    备注
                                </SuiTypography>
                            </SuiBox>
                            <SuiInput type="text" inputRef={remarksRef} value={remarks} multiline rows={3}
                                onChange={(e) => { setRemarks(e.target.value) }} />
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