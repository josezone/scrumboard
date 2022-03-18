import { Button, Card, CardActions, CardContent } from "@mui/material";
import groupArray from "group-array";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useRef, useState } from "react";

function ReportComponent(props: any) {
  const contentRef = useRef<any>(null);
  const [btnText, setBtnText] = useState<string>("Copy");
  const { reportItems, title } = props;
  const byProject: any = groupArray(
    reportItems,
    "ticket.sprint.project.project",
    "ticket.sprint.sprint",
    "ticket.ticket"
  );

  const onCopyClick = () => {
    if (window.getSelection) {
      setBtnText("Copied");
      let range = document.createRange();
      range.selectNode(contentRef.current);
      window.getSelection()?.addRange(range);
      document.execCommand("copy");
    }
  };

  return (
    <Card className="cardContainer" sx={{ maxWidth: 500, margin: "auto" }}>
      <CardActions>
        <h2>{title}</h2>
        <Button
          size="small"
          variant="contained"
          onClick={onCopyClick}
          startIcon={<ContentCopyIcon />}
        >
          {btnText}
        </Button>
      </CardActions>
      <CardContent ref={contentRef}>
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
                                      • {issue.estimate_bug || issue.bug}
                                      {issue.evidence ? (
                                        <>
                                          . Link{" "}
                                          <a href={issue.evidence}>here</a>
                                        </>
                                      ) : (
                                        "."
                                      )}
                                    </div>
                                    <div>
                                      {issue.impact &&
                                        "Impact: " + issue.impact}
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
      </CardContent>
    </Card>
  );
}

export default ReportComponent;
