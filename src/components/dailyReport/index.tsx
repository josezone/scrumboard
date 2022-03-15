import { Container } from "@mui/material";
import { FC, Fragment } from "react";
import DailyReportComponent from "./DailyReport"
import { DailyReportStyled } from "./dailyReport.style";

const DailyReport: FC<any> = (props) => {

    return(
        <DailyReportStyled>
            <Container>
                <h2>Daily Report for Scrum: {props?.scrumName?.split("T")[0]}</h2>
                <DailyReportComponent {...props} />
            </Container>
        </DailyReportStyled>
    )
}

export default DailyReport;