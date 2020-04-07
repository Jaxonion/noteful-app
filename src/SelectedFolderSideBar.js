import React from 'react';
import { Link } from 'react-router-dom';
import notefulContext from './notefulContext';
import NoteError from './NoteError';

export default class SelectedFolderSideBar extends React.Component {
    static contextType = notefulContext;
    getFolderName = (value) => {
        const selectedNote = value.notes.filter((note) => {
            console.log('note', note)
            return note.note_id == this.props.match.params.dynamic
        })
        console.log(selectedNote)
        const selectedFolder = value.folders.filter((folder) => {
            return folder.id == selectedNote[0].folder_id
        })
        return selectedFolder[0].title

    }
    render() {
        let value = this.context;
        const selectedNote = value.notes.filter((note) => {
            //console.log('not', note)
            return note.note_id == this.props.match.params.dynamic
        })
        console.log('selectedNote: ',selectedNote)
        /*if(selectedNote.length !== 0) {
            const selectedFolder = value.folders.filter((folder) => {
                return folder.id === selectedNote[0].folderId
            })
        }*/
        //console.log(selectedFolder)
        if(selectedNote.length === 0) {
            return(<NoteError />)
        }
        else {
            return(
                <div className='selectedFolderSideBar'>
                    <Link to='/'>Back</Link>
                    <p className='topToBottom'>{this.getFolderName(value)}</p>
                </div>
            )
        }
    }
}