import groupArray from "group-array";

function DailyReportComponent(props: any) {
  const issueToReport = props?.dailyReport?.filter(
    (issue: any) => issue.report
  );
  const byProject: any = groupArray(
    issueToReport,
    "ticket.sprint.project.project",
    "ticket.sprint.sprint",
    "ticket.ticket"
  );
  console.log(byProject);
  return (
    <div>
      {Object.keys(byProject)?.map((projectIdx: any) => {
        return (
          <div>
            <div>*{projectIdx.toUpperCase()}*</div>
            {Object.keys(byProject[projectIdx])?.map((sprintIdx: any) => {
              return (
                <div>
                  <div>*{sprintIdx.toUpperCase()}*</div>
                  {Object.keys(byProject[projectIdx][sprintIdx])?.map(
                    (ticketIdx: any) => {
                      return (
                        <div>
                          <div>{ticketIdx}:</div>
                          {byProject[projectIdx][sprintIdx][ticketIdx].map(
                            (issue: any) => {
                              return (
                                <div>
                                  <div>
                                    • {issue.bug}
                                    {issue.evidence
                                      ? ". Link " + issue.evidence
                                      : "."}
                                  </div>
                                  <div>
                                    {issue.impact && "Impact: " + issue.impact}
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      );
                    }
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default DailyReportComponent;
