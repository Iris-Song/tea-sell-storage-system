import { useState, useRef } from "react";
import { FormControl, FormControlLabel } from "@mui/material";
import { RadioGroup, Checkbox } from "@mui/material";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";
import { Card } from "@mui/material";


import TablePurchase from "./pc";
import TableShipment from "./sp";

export function RegularAsk() {

    const [pcShow, setPcShow] = useState(false);
    const [spShow, setSpShow] = useState(false);
    const [name, setName] = useState(false);

    const nameRef = useRef();
    const pcRef = useRef();
    const spRef = useRef();

    const handleSearch = () => {
        if (pcRef.current?.checked) {
            setPcShow(true);
        } else {
            setPcShow(false);
        }
        if (spRef.current?.checked) {
            setSpShow(true);
        } else {
            setSpShow(false);
        }
        setName(nameRef.current?.value);
    };

    return (
        <SuiBox mt={10} ml={0} color="grey">
            <Card>
                <SuiBox mt={5} ml={5}>
                    <SuiTypography component="label" variant="h6" fontWeight="bold">
                        产品进出货信息查找
                    </SuiTypography>
                </SuiBox>
                <SuiBox mt={2} ml={5}>
                    <FormControl>
                        <RadioGroup row >
                            <FormControlLabel control={<Checkbox inputRef={pcRef} />} label="进货记录" />
                            <FormControlLabel control={<Checkbox inputRef={spRef} />} label="出货记录" />
                        </RadioGroup>
                    </FormControl>
                </SuiBox>
                <SuiBox mt={1} mb={2} width={200}>
                    <SuiBox mb={1} ml={5} >
                        <SuiTypography component="label" variant="h6" fontWeight="bold" >
                            产品名
                        </SuiTypography>
                        <SuiInput type="text" inputRef={nameRef} placeholder="产品名" />
                        <SuiBox mt={3}>
                            <SuiButton color="dark" onClick={handleSearch}>搜索</SuiButton>
                        </SuiBox>
                    </SuiBox>

                </SuiBox>
                <TablePurchase isShow={pcShow} name={name} />
                <TableShipment isShow={spShow} name={name} />
            </Card>

        </SuiBox>
    );
}