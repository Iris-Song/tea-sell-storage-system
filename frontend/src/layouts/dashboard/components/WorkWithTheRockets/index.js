// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";

// Images
import dylogo from "assets/images/dayi.jpg";

function WorkWithTheRockets() {
  return (
    <Card sx={{ height: "100%" }}>
      <SuiBox position="relative" height="100%" p={2}>
        <SuiBox
          display="flex"
          flexDirection="column"
          height="100%"
          py={2}
          px={2}
          borderRadius="lg"
          sx={{
            backgroundImage: `url(${dylogo})`,
            backgroundSize: "cover",
          }}
        >
         
        </SuiBox>
      </SuiBox>
    </Card>
  );
}

export default WorkWithTheRockets;
