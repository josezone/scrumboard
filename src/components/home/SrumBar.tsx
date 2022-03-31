import TopBar from "./TopBar";
import Select from "react-select";

export function dateConvert(val: string) {
  return (
    new Date(val).toLocaleString("default", {
      month: "long",
    }) +
    " " +
    new Date(val).getDate()
  );
}

function ScrumBar(props: any) {
  const scrumItems: Array<any> = props.scrumList?.map((scrum: any) => ({
    key: scrum?.id,
    value: scrum?.id,
    label: dateConvert(scrum.scrum),
  }));

  const sprintItem = props.sprintList?.map((sprint: any) => ({
    key: sprint?.id,
    value: sprint?.id,
    label: sprint.sprint,
  }));

  const handleScrumChange = (val: any) => {
    const data = props.scrumList?.filter(
      (scrum: any) => val.value === scrum.id
    )[0];
    props.send({ type: "scrumChanged", data });
  };

  const handleSprintChange = (val: any) => {
    const data = props.sprintList?.filter(
      (sprint: any) => val.value === sprint.id
    )[0];
    props.send({ type: "sprintChanged", data });
  };

  return (
    <div>
      <TopBar {...props} />
      {props.scrumSelected && (
        <Select
          value={{
            key: props.scrumSelected?.id,
            value: props.scrumSelected?.id,
            label: dateConvert(props.scrumSelected?.scrum),
          }}
          onChange={handleScrumChange}
          options={scrumItems}
        />
      )}
      {props.sprintSelected && (
        <Select
          value={{
            key: props.sprintSelected?.id,
            value: props.sprintSelected?.id,
            label: props.sprintSelected?.sprint,
          }}
          onChange={handleSprintChange}
          options={sprintItem}
        />
      )}
    </div>
  );
}

export default ScrumBar;
