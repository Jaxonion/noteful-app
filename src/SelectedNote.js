import React from 'react';
import notefulContext from './notefulContext';
import { Link } from 'react-router-dom';
import NoteError from './NoteError';

export default class SelectedNote extends React.Component {
    static contextType = notefulContext;
    render() {
        let value = this.context;
        let noteId = this.props.match.params.dynamic;
        const existingNote = value.notes.find((note) => note.note_id == noteId)
        //console.log('existingNote: ', existingNote)
        
        //console.log('executed')
        const selectedNote = value.notes.filter((note) => {
            return note.note_id == this.props.match.params.dynamic
        })
        const note = selectedNote.map((note, i) => {
            return(
                <div key={i} className='note'>
                    <Link to={`/note/${note.title}`}>{note.title}</Link>
                    <p>{note.content}</p>
                </div>
            )
        })
        
    
        if(existingNote) {
            return(
                <div className='selectedNote'>
                    {note}
                </div>
            )
        }
        else {
            return(
                <NoteError>

                </NoteError>
            )
        }
        
    }
}