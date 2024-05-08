import { NoteInput } from "../interfaces/PropsTypes";
import { Note } from "../models/note";

export const fetchDataGetReq = async (): Promise<Note[]> => {
  return await fetch("http://localhost:5000/api/notes", {
    method: "GET",
  }).then(async (response) => {
    if (!response.ok) {
      const errorMsg = await response.json();
      throw Error(errorMsg.error);
    }
    return await response.json();
  });
};
export const createNote = async (
  note: NoteInput
): Promise<Note> => {
    return await fetch("http://localhost:5000/api/notes",
    { method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(note)  
    }
    ).then( async (response)=> {
        if (!response.ok) {
            const errorMsg = await response.json();
            throw Error(errorMsg.error);
          }
        return await response.json()
    })
};
