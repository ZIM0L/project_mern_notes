import { NoteInput } from "../interfaces/PropsTypes";
import { Note } from "../models/note";
import { LoginCredentials, SignUpWithCredentials, User } from "../models/user";

const endpointNotes = "http://localhost:5000/api/notes"
const endpointUser = "http://localhost:5000/api/users"

export const fetchDataGetReq = async (): Promise<Note[]> => {
  return await fetch(endpointNotes, {
    method: "GET",
    credentials: 'include',
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
    return await fetch(endpointNotes,
    { method: "POST",
    credentials: 'include',
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
  return await fetch(endpointNotes + "/" + noteId,
    { method: "PATCH",
    credentials: 'include',
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
  await fetch(endpointNotes + "/" + noteId, {
    method: "DELETE",
    credentials: 'include'
  })
}

export const loginUserWithCookie = async () : Promise<User> => {
  return await fetch(endpointUser, {
    method: "GET",
    credentials: 'include',
  }).then((response) => {
    return response.json()
  })
}

export const signUp = async ( credentials : SignUpWithCredentials ) : Promise<User> => {
  return await fetch(endpointUser + "/signup" , {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credentials)
  }).then((response) => {
    return response.json()
  })
}

export const login = async (  credentials : LoginCredentials ) : Promise<User> => {
  return await fetch(endpointUser + "/login" , {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credentials)
  }).then((response) => {
    return response.json()
  })
}

export const logout = async () => {
    await fetch(endpointUser + "/logout", {
      method: "POST",
      credentials: 'include',
    })
}