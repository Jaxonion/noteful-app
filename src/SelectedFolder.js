import React from 'react';
import { Link } from 'react-router-dom';
import notefulContext from './notefulContext';
import FolderError from './FolderError';

export default class SelectedFolder extends React.Component {
    static contextType = notefulContext;
    removeNote = (noteId) => {
        //console.log(`removeNote: ${noteId}`)
        this.context.removeNote(noteId);
    }
    render() {
        let value = this.context;
        //console.log(this.props)
        let folderId = this.props.match.params.dynamic;
        //console.log(this.props.match.params.dynamic)
        const existingFolder = value.folders.find((folder) => folder.id == folderId)
        //console.log('existingFolder: ', existingFolder)
        const selectedNotes = value.notes.filter((note) => {
            //console.log('**', note.folder_id, '**', this.props.match.params.dynamic)
            return note.folder_id == this.props.match.params.dynamic
        })
        //console.log('selectedNote', selectedNotes)
        const foldersNotes = selectedNotes.map((note) => {
            return(
                <div key={note.id} id={note.title} className='note'>
                    <Link to={`/note/${note.note_id}`}>{note.title}</Link>
                    <button
                        className='deleteButton'
                        onClick={e => this.removeNote(e.target.parentElement.id)}>Delete</button>
                </div>
            )
        })
        //console.log('note', foldersNotes)
        //console.log(selectedNotes)
        if(existingFolder === undefined) {
            return(
                <FolderError />
            )
        }
        else {
            return(
                <div className='selectedFolder'>
                    {foldersNotes}
                    <Link to='/NewNote'>New Note</Link>
                </div>
            )
        }
        
    }
}