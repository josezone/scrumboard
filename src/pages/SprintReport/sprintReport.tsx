import { Button } from "@mui/material";
import { useMachine } from "@xstate/react";
import { FC, useEffect } from "react";
import FullScreenLoader from "../../components/fullScreenLoader/fullScreenLoader";
import SpreadSheet from "../../services/spreadSheet/spreadSheet";
import ReportTable from "./component/reportTable";
import { SprintReportStyled } from "./component/sprinReport.style";
import { useGetSprintReport } from "./dataService";
import { SprintReportMachine, SprintReportMachineEvents } from "./sprintReportMachine";
import { actions } from "./stateActions";

const SprintReport: FC<any> = (props) => {
    const { mutateAsync: getSprintReport } = useGetSprintReport(
        props.graphQLClient
      );

    const [{ context }, send] = useMachine(SprintReportMachine, {
        actions,
        services: {
            getSprintReport: (cxt: any) => getSprintReport(cxt)
        }
    })

    useEffect(() => {
        send(SprintReportMachineEvents.INVOKE_GET_SPRINT_REPORT)
    }, [])

    const handleSprintReport = () => {
        new SpreadSheet()
            .init()
            .setData(context?.sprintReportList)
            .download()
    }
    


    if(context.loading)return <FullScreenLoader />;
    return (
        <SprintReportStyled>
            <div className="btnContainer" >
                <Button variant="contained" onClick={handleSprintReport} >Download Sprint Report </Button>
            </div>
            <ReportTable reportList={context?.sprintReportList} />
        </SprintReportStyled>
    );
}

export default SprintReport;