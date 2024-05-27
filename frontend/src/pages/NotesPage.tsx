import NotesPageLoggedInView from '../components/NotesView/NotesPageLoggedInView'
import NotesPageLoggedOutView from '../components/NotesView/NotesPageLoggedOutView'
import { NotesPageProps } from '../interfaces/PropsTypes'


const NotesPage = ({loggedInUser,notes,setNote}: NotesPageProps) => {
  return (
    <>
         {loggedInUser ? (
          <NotesPageLoggedInView notes={notes} setNote={setNote} />
        ) : (
          <NotesPageLoggedOutView />
        )}
    </>
  )
}

export default NotesPage