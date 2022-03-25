import { Button } from "@mui/material";
import { useMachine } from "@xstate/react";
import { FC } from "react";
import ProjectGroup from "../../components/estimateGraph/ProjectGroup";
import FullScreenLoader from "../../components/fullScreenLoader/fullScreenLoader";
import ScrumSelect from "../../components/scrumSelect/ScrumSelect";
import SpreadSheet from "../../services/spreadSheet/spreadSheet";
import ReportTable from "./component/reportTable";
import { SprintReportStyled } from "./component/sprinReport.style";
import { useServices } from "./dataService";
import { SprintReportMachine } from "./sprintReportMachine";
import { actions } from "./stateActions";

const SprintReport: FC<any> = (props) => {

    const services = useServices(props);

    const [{ context }, send] = useMachine(SprintReportMachine, {
        actions,
        services
    })

    const handleSprintReport = () => {
        new SpreadSheet()
            .init()
            .setData(context?.sprintReportList)
            .download()
    }

    if (context.loading) return <FullScreenLoader />;
    return (
        <SprintReportStyled>
            <ProjectGroup {...context} send={send} />
            <ScrumSelect {...context} send={send} />
            <div className="btnContainer" >
                <Button variant="contained" onClick={handleSprintReport} >Download Sprint Report </Button>
            </div>
            <ReportTable reportList={context?.sprintReportList} />
        </SprintReportStyled>
    );
}

export default SprintReport;