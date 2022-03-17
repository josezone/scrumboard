import { Container } from "@mui/material";
import { FC, Fragment } from "react";
import { Interface } from "readline";
import ReportComponent from "./Report";
import { ReportStyled } from "./Report.style";

interface IReport {
  reportItems: Array<any>;
  title: String;
}

const DailyReport: FC<IReport> = (props) => {
  const { title, reportItems } = props;

  return (
    <ReportStyled>
      <Container>
        <ReportComponent reportItems={reportItems} title={title}/>
      </Container>
    </ReportStyled>
  );
};

export default DailyReport;
