import React from 'react';
import { Link } from 'react-router-dom';
import notefulContext from './notefulContext';
import NoteError from './NoteError';

class Main extends React.Component {
    static contextType = notefulContext;
    removeNote = (noteId) => {
        //console.log(`removeNote: ${noteId}`)
        this.context.removeNote(noteId);
    }
    render() {
        let value = this.context;
        console.log(this.props)
        const notes = value.notes.map((note, i) => {
            return(
                
                <div key={i} id={note.not_id} className='note'>
                    <Link to={`/note/${note.note_id}`}>{note.title}</Link>
                    <button
                        className='deleteButton'
                        onClick={e => this.removeNote(e.target.parentElement.id)}>Delete</button>
                </div>
                
               
            )
        })
        return(
            <notefulContext.Consumer>
                {value =>
                <div>
                    {notes}
                    <Link to='/NewNote'>New Note</Link>
                </div>}
            </notefulContext.Consumer>
        )
    }
}

export default Main;