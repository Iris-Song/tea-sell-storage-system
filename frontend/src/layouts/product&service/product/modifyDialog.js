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

    const [name, setName] = React.useState('');
    const [number_in_shop, setNumber_in_shop] = React.useState(0);
    const [number_in_storehouse, setNumber_in_storehouse] = React.useState(0);
    const [price, setPrice] = React.useState(0);
    const [remarks, setRemarks] = React.useState('');

    const nameRef = useRef();
    const priceRef = useRef();
    const remarksRef = useRef();

    useEffect(async () => {
        if (props.id) {
            await axios.get(Url + "/product" + "/findById/" + props.id)
                .then(function (response) {
                    console.log(response);
                    setName(response.data.name);
                    setNumber_in_shop(response.data.number_in_shop);
                    setNumber_in_storehouse(response.data.number_in_storehouse);
                    setPrice(response.data.price);
                    setRemarks(response.data.remarks);
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
        if(nameRef.current?.value==''){
            alert("名称不能为空");
            return;
        }
        if(priceRef.current?.value==''){
            alert("指导价不能为空");
            return;
        }
        if(priceRef.current?.value<0){
            alert("指导价不能小于0");
            return;
        }
        let aPdct = [];
        aPdct.id = props.id;
        aPdct.name = nameRef.current?.value;
        aPdct.number_in_shop = number_in_shop;
        aPdct.number_in_storehouse = number_in_storehouse;
        aPdct.price = priceRef.current?.value;
        aPdct.remarks = remarksRef.current?.value;
        props.modifyProduct(aPdct);
        props.setOpen(false);
    }


    return (
        <div>
            <Dialog open={props.open} onClose={handleClose}>
                <DialogTitle>修改产品信息</DialogTitle>
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
                                    名称
                                </SuiTypography>
                            </SuiBox>
                            <SuiInput type="text" inputRef={nameRef} value={name}
                                onChange={(e) => { setName(e.target.value) }} />
                        </SuiBox>
                        <SuiBox mb={2}>
                            <SuiBox mb={1} ml={0.5}>
                                <SuiTypography component="label" variant="h6" fontWeight="bold">
                                    店内现存量
                                </SuiTypography>
                            </SuiBox>
                            <SuiInput type="number" disabled={true} defaultValue={number_in_shop}/>
                        </SuiBox>
                        <SuiBox mb={2}>
                            <SuiBox mb={1} ml={0.5}>
                                <SuiTypography component="label" variant="h6" fontWeight="bold">
                                    仓库剩余存货量
                                </SuiTypography>
                            </SuiBox>
                            <SuiInput type="number" disabled={true}  defaultValue={number_in_storehouse} />
                        </SuiBox>
                        <SuiBox mb={2}>
                            <SuiBox mb={1} ml={0.5}>
                                <SuiTypography component="label" variant="h6" fontWeight="bold">
                                    指导价
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