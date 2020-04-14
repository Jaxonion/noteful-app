import React from 'react';
import { Link } from 'react-router-dom';
import notefulContext from './notefulContext';

class NewNote extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            note: {
                name: '',
                touched: false,
                content: ''
                
            }
        }
    }
    static contextType = notefulContext;

    updateNote = () => {
        console.log(document.getElementById('folderId').value)
        this.context.setNote(document.getElementById('noteName').value, document.getElementById('folderId').value, document.getElementById('noteContent').value, this.createNote())
    }

    createNote = () => {
        return Math.round(Math.random() * 1000);
    }

    validateNote = () => {
        const {name, touched, content} = this.state.note;
        if(!touched) {
            return 'no name'
        }
        if(name && name.length < 1) {
            return 'no name'
        }
        if(name === '') {
            return 'no name'
        }
        if(!content) {
            return 'no content'
        }
        if(content && content.length < 1) {
            return 'no content'
        }
        if(content === '') {
            return 'no content'
        }
    }

    updateContent = (content) => {
        this.setState({
            note: {
                name: this.state.note.name,
                touched: this.state.note.touched,
                content: content
            }
        })
        //console.log('the note', this.state.note)
    }

    updateState = (name, touched) => {
        //console.log(name, touched)
        this.setState({
            note: {
                name: name,
                touched: touched,
                content: this.state.note.content

            }
        })
    }

    render() {
        //let noteContent = document.getElementById('noteContent').value;
        //let noteName = document.getElementById('noteName').value;

        let value = this.context;
        //console.log('value:', value)
        const options = value.folders.map((folder, id) => {
            return(
                <option value={folder.id}>{folder.title}</option>
            )
        })
        return(
                <div className='NewNote'>

                    <label>Create A Note</label>

                    <div className='newNote'>

                        <label>Name</label>

                        <input
                            onChange={(name, touched) => this.updateState(document.getElementById('noteName').value, true)} type='text' id='noteName' placeholder='Note Name' />

                        <label>Content</label>

                        <input onChange={(content) => this.updateContent(document.getElementById('noteContent').value)} type='text' id='noteContent' placeholder='Content' />

                        <select name='folderName' id='folderId'>
                            {options}
                        </select>

                        <Link to='/'>
                            <button
                                disabled={
                                    this.validateNote()
                                }
                                onClick={this.updateNote}
                                >
                                Add Note
                            </button>
                        </Link>

                    </div>
                </div>
        )
    }
}

export default NewNote;