export interface CreateNoteBody{
    title?: string,
    text?: string
}
export interface UpdateNoteBody {
    title?: string,
    text?: string
}
export interface UpdateNoteParams {
    noteId?: string,
}
export interface DeleteNoteParamas {
    noteId?: string
}