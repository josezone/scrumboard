import styled from "styled-components";

export const NewNoteStyle = styled.div`
  width: 720px;
  height: 175px;
  padding: 20px;

  .versionContainer {
    display: flex;
    justify-content: center;
  }

  .noteType {
    width: 12rem;
  }

  .noteSection {
    display: flex;
  }

  .dateEntry {
    width: 12rem;
  }

  .noteData {
    width: 500px;
  }

  .addButton {
    position: absolute;
    bottom: 16px;
    right: 16px;
  }
`;
