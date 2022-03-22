import { assign } from "xstate";

const assignSelectedScrum = assign({
  selectedScrum: (context: any, event: any) => {
    return event.data;
  },
});

const assignScrumList = assign({
  scrumList: (context: any, event: any) => {
    return event.data.scrum;
  },
  selectedScrum: (context:any, event:any) =>{
      return event.data.scrum[0].id;
  }
});

const assignTicketList = assign({
    ticketList: (context:any, event:any)=>{
        return event.data.ticket;
    }
})

export const actions = {
    assignSelectedScrum,
    assignScrumList,
    assignTicketList
}