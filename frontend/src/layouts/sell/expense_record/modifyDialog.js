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
import { Url } from '../../../routes'

export default function ModifyDialog(props) {

    const [eplID, seteplID] = React.useState('');
    const [prID, setprID] = React.useState('');
    const [srID, setsrID] = React.useState('');
    const [sdPrice, setsdPrice] = React.useState('');
    const [acPrice, setacPrice] = React.useState('');
    const [payWay, setpayWay] = React.useState('');
    const [cardID, setcardID] = React.useState('');

    const prIDRef = useRef();
    const srIDRef = useRef();
    const eplIDRef = useRef();
    const sdPriceRef = useRef();
    const acPriceRef = useRef();
    const cardIDRef = useRef();

    useEffect(async () => {
        if (props.ID) {
            await axios.get(Url + "/expense_record" + "/findById/" + props.ID)
                .then(function (response) {
                    console.log(response);
                    setprID(response.data.product_record_no);
                    setsrID(response.data.service_record_no);
                    seteplID(response.data.employee_no);
                    setsdPrice(response.data.should_pay_amount);
                    setacPrice(response.data.actual_pay_amount);
                    setpayWay(response.data.pay_way);
                    setcardID(response.data.card_no);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }, [props]);


    const handlePayWayChange = (event) => {
        setpayWay(event.target.value)
    };

    const handleClose = () => {
        props.setOpen(false);
    };

    const handleSubmit = () => {
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
        if (payWay == 3 && cardIDRef.current?.value == '') {
            alert("卡号不能为空");
            return;
        }
        let aER = [];
        aER.id = props.ID;
        aER.product_record_no = prIDRef.current?.value;
        aER.service_record_no = srIDRef.current?.value;
        aER.employee_no = eplIDRef.current?.value;
        aER.should_pay_amount = sdPriceRef.current?.value;
        aER.actual_pay_amount = acPriceRef.current?.value;
        aER.pay_way = payWay;
        aER.card_no = cardIDRef.current?.value;
        props.modifyExpenseRecord(aER);
        props.setOpen(false);
    }

    return (
        <div>
            <Dialog open={props.open} onClose={handleClose}>
                <DialogTitle>修改消费记录</DialogTitle>
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
                                    操作员编号
                                </SuiTypography>
                            </SuiBox>
                            <SuiInput type="text" inputRef={eplIDRef} value={eplID}
                                onChange={(e) => { seteplID(e.target.value) }} />
                        </SuiBox>
                        <SuiBox mb={2}>
                            <SuiBox mb={1} ml={0.5}>
                                <SuiTypography component="label" variant="h6" fontWeight="bold">
                                    销货记录编号
                                </SuiTypography>
                            </SuiBox>
                            <SuiInput type="text" inputRef={prIDRef} value={prID}
                                onChange={(e) => { setprID(e.target.value) }} />
                        </SuiBox>
                        <SuiBox mb={2}>
                            <SuiBox mb={1} ml={0.5}>
                                <SuiTypography component="label" variant="h6" fontWeight="bold">
                                    服务记录编号
                                </SuiTypography>
                            </SuiBox>
                            <SuiInput type="text" inputRef={srIDRef} value={srID}
                                onChange={(e) => { setsrID(e.target.value) }} />
                        </SuiBox>
                        <SuiBox mb={2}>
                            <SuiBox mb={1} ml={0.5}>
                                <SuiTypography component="label" variant="h6" fontWeight="bold">
                                    应付金额
                                </SuiTypography>
                            </SuiBox>
                            <SuiInput type="number" inputRef={sdPriceRef} value={sdPrice}
                                onChange={(e) => { setsdPrice(e.target.value) }} />
                        </SuiBox>
                        <SuiBox mb={2}>
                            <SuiBox mb={1} ml={0.5}>
                                <SuiTypography component="label" variant="h6" fontWeight="bold">
                                    实付金额
                                </SuiTypography>
                            </SuiBox>
                            <SuiInput type="number" inputRef={acPriceRef} value={acPrice}
                                onChange={(e) => { setacPrice(e.target.value) }} />
                        </SuiBox>
                        <SuiBox mb={2}>
                            <SuiBox mb={1} ml={0.5}>
                                <SuiTypography component="label" variant="h6" fontWeight="bold">
                                    结算方式
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
                        </SuiBox>
                        <SuiBox mb={2}>
                            <SuiBox mb={1} ml={0.5}>
                                <SuiTypography component="label" variant="h6" fontWeight="bold">
                                    消费卡号
                                </SuiTypography>
                            </SuiBox>
                            <SuiInput type="text" inputRef={cardIDRef} value={cardID}
                                onChange={(e) => { setcardID(e.target.value) }} />
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