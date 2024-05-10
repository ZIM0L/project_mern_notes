import { NoteInput } from "../interfaces/PropsTypes";
import { Note } from "../models/note";

const endpoint = "http://localhost:5000/api/notes"
export const fetchDataGetReq = async (): Promise<Note[]> => {
  return await fetch(endpoint, {
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
    return await fetch(endpoint,
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

export const updateNote = async (noteId : string, note : NoteInput) : Promise<Note> => {
  return await fetch(endpoint + "/" + noteId,
    { method: "PATCH",
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
}

export const deleteNote = async (noteId : string) => {
  await fetch(endpoint + "/" +noteId, {
    method: "DELETE"
  })
}
