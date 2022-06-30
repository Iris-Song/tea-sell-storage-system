import { useRef,useState } from "react";
import { Navigate } from 'react-router-dom';

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";

import axios from "axios";
import { Url } from '../../../routes'
import { setAuth } from "App";

export var logInName = "登录"

function SignIn() {

  const [jumpto, setJumpTo] = useState(false);

  const IDRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = () => {
    axios.get(Url + "/employee" + "/findById/" + IDRef.current?.value)
      .then(function (response) {
        console.log(response);
        if(response.data){
          if(response.data.password==passwordRef.current?.value){
            logInName = response.data.name;
            setAuth(response.data.permission);
            console.log(response.data);
            alert("登录成功，准备跳转");
            setJumpTo(true);
          }else{
            alert("账号密码不符");
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  if (jumpto === true) {
    return <Navigate to='/dashboard' />
  }
  
  return (
    <CoverLayout
      title="请登录 Sign in"
      description="请输入您的ID和密码，详情咨询管理员 "
      image={curved9}
    >
      <SuiBox component="form" role="form">
        <SuiBox mb={2}>
          <SuiBox mb={1} ml={0.5}>
            <SuiTypography component="label" variant="h6" fontWeight="bold">
              ID
            </SuiTypography>
          </SuiBox>
          <SuiInput type="text" placeholder="ID" inputRef={IDRef} />
        </SuiBox>
        <SuiBox mb={2}>
          <SuiBox mb={1} ml={0.5}>
            <SuiTypography component="label" variant="h6" fontWeight="bold">
              密码
            </SuiTypography>
          </SuiBox>
          <SuiInput type="password" placeholder="密码" inputRef={passwordRef} />
        </SuiBox>
        <SuiBox mt={4} mb={1}>
          <SuiButton variant="gradient" color="info" fullWidth onClick={handleSubmit}>
            登录
          </SuiButton>
        </SuiBox>
      </SuiBox>
    </CoverLayout>
  );
}

export default SignIn;
