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

    const [cusID, setcusID] = React.useState('');
    const [balance, setBalance] = React.useState('');

    const cusIDRef = useRef();
    const balanceRef = useRef();

    useEffect(async () => {
        if (props.cardID) {
            await axios.get(Url + "/card" + "/findById/" + props.cardID)
                .then(function (response) {
                    console.log(response);
                    setcusID(response.data.customer_id);
                    setBalance(response.data.balance)
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
        if(cusIDRef.current?.value==''){
            alert("持卡人编号不能为空");
            return;
        }
        if(balanceRef.current?.value==''){
            alert("余额不能为空");
            return;
        }
        if(balanceRef.current?.value<0){
            alert("余额应为正数");
            return;
        }
        let aCard = [];
        aCard.card_id = props.cardID;
        aCard.customer_id = cusIDRef.current?.value;
        aCard.balance = balanceRef.current?.value;
        props.modifyCard(aCard);
        props.setOpen(false);
    }

    return (
        <div>
            <Dialog open={props.open} onClose={handleClose}>
                <DialogTitle>修改会员卡信息</DialogTitle>
                <DialogContent>
                    <SuiBox component="form" role="form">
                        <SuiBox mb={2}>
                            <SuiBox mb={1} ml={0.5}>
                                <SuiTypography component="label" variant="h6" fontWeight="bold">
                                    卡号
                                </SuiTypography>
                            </SuiBox>
                            <SuiInput type="text" defaultValue={props.cardID} disabled={true} />
                        </SuiBox>
                        <SuiBox mb={2}>
                            <SuiBox mb={1} ml={0.5}>
                                <SuiTypography component="label" variant="h6" fontWeight="bold">
                                    持卡人ID
                                </SuiTypography>
                            </SuiBox>
                            <SuiInput type="text" inputRef={cusIDRef} value={cusID}
                                onChange={(e) => { setcusID(e.target.value) }} />
                        </SuiBox>
                        <SuiBox mb={2}>
                            <SuiBox mb={1} ml={0.5}>
                                <SuiTypography component="label" variant="h6" fontWeight="bold">
                                    余额
                                </SuiTypography>
                            </SuiBox>
                            <SuiInput type="text" inputRef={balanceRef} value={balance}
                                onChange={(e) => { setBalance(e.target.value) }} />
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