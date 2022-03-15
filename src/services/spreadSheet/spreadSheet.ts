import ExcelJS from "exceljs";
import { saveAs } from 'file-saver';
import groupArray from "group-array";

class SpreadSheet {
    protected workbook: any;
    protected worksheet: any;
    protected dataList: Array<any> = [];
    protected alphabets: Array<string> = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

    init() {
        this.workbook = new ExcelJS.Workbook();
        this.worksheet = this.workbook.addWorksheet("Report");
        this.setHeaders()
        return this;
    }

    protected getDevStoryPoint = ({ fe_story = 0, be_story = 0 }) => {
        return fe_story + be_story
    }

    protected setHeaders() {
        const columns = [
            { header: 'Project', key: 'project', width: 15, height: 10 },
            { header: 'Sprint', key: 'sprintName', width: 15, height: 10 },
            { header: 'Ticket', key: 'ticket', width: 15, height: 10 },
            { header: 'Story Points (DEV)', key: 'devSp', width: 15, height: 10 },
            { header: 'Story Points (QA)', key: 'qaSp', width: 15, height: 10 },
            { header: 'Issue History', key: 'issues', width: 15, height: 10 },
            { header: 'Issue Impact', key: 'impact', width: 15, height: 10 },
        ]
        this.worksheet.columns = columns;
        columns.map((col, i) => {
            const key = this.alphabets[i] + 1;
            this.worksheet.getCell(key).fill = {
                type: 'pattern',
                pattern:'solid',
                fgColor:{ argb:'4a86e8' }
            };
            this.worksheet.getCell(key).alignment = { horizontal:'center', vertical: "middle"};
        })
    }

    protected getBugs(bugs: Array<any>){
        let bugText: string = ""
        bugs?.map((bug, i: number) =>{
            bugText += new Date(bug.date).getDate().toString().padStart(2, "0") + "/" + (new Date(bug.date).getMonth()+ 1).toString().padStart(2, "0") + " - " + bug.bug;
            if(i + 1 !== bugs.length){
                bugText += "\n"
            }
        })
        return bugText;
    }

    protected getImapact = (bugs: Array<any>) => {
        const issues = bugs.find(bug => bug.report === true)
        if(issues)return "Spilled over"
        return "Delivered on time"
    }

    setData(data: any) {
        let sortedData: any = [];
        Object.keys(data).map((key) => {
            const sprints: Array<any> = data[key];
            sprints.map((sprint) => {
                const tickets: Array<any> = sprint.tickets || [];
                tickets.map((ticket) => {
                    const payload = {
                        sprintName: sprint?.sprint,
                        project: key,
                        ticket: ticket.ticket,
                        devSp: this.getDevStoryPoint(ticket) || 0,
                        qaSp: ticket.qa_story || 0,
                        issues: this.getBugs(ticket.bugs),
                        impact: this.getImapact(ticket.bugs)
                    }
                    sortedData.push(payload)
                })
            });
        })
        this.dataList = sortedData;
        this.writeToSpreadSheet()
        return this;
    }


    writeToSpreadSheet(){
        this.dataList.map((data, i) => {
            this.worksheet.insertRow(i+ 2, data)
        })
        this.mergeCells("project");
        this.mergeCells("sprintName");
    }

    mergeCells(type: string){
        const mergeCells: Array<any> = [];
        this.worksheet.getColumn(type).eachCell(function(cell: any, rowNumber: any, i: any) {
           mergeCells.push({ address: cell.address, rowNumber, value: cell.value })
          });
          const groupCells: any = groupArray(mergeCells, "value")
         Object.keys(groupCells).map((key, i) => {
             if(i !== 0){
                const project:Array<any> = groupCells[key] || [];
                if(project.length > 0){
                    const startAddress = project[0]?.address;
                    const endAddress = project[project.length -1]?.address;
                    const cell = `${startAddress}:${endAddress}`;        
                    this.worksheet.unMergeCells(cell);
                    this.worksheet.mergeCells(cell);
                    this.worksheet.getCell(startAddress).value = key;
                    this.worksheet.getCell(startAddress).alignment = { horizontal:'center', vertical: "middle"};
                    if(type === "project"){
                        this.worksheet.getCell(startAddress).fill = {
                            type: 'pattern',
                            pattern:'solid',
                            fgColor:{ argb:'4a86e8' }
                        };
                        this.worksheet.getCell(startAddress).border = {
                            top: {style:'double', color: {argb:'000000'}},
                            left: {style:'double', color: {argb:'000000'}},
                            bottom: {style:'double', color: {argb:'000000'}},
                            right: {style:'double', color: {argb:'000000'}}
                          };
                    }
                }
             }
         })
    }

    download() {
        this.workbook.xlsx.writeBuffer().then(function (data: any) {
            const blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            saveAs(blob, "fileName.xlsx");
        });
    }

};

export default SpreadSheet;