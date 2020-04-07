import React from 'react';
import { Link } from 'react-router-dom';
import notefulContext from './notefulContext';

class NewFolder extends React.Component {
    static contextType = notefulContext;
    constructor(props) {
        super(props)
        this.state = {
            newFolderInput: {
                value: '',
                touched: false
            }
        }
    }
    folderHandler = (e) => {
        e.preventDefault();
        const newFolderInput = document.getElementById('newFolder').value
        console.log(newFolderInput)
        this.context.setFolder(newFolderInput, this.createFolder())
        this.props.history.push('/')
    }

    createFolder = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    validateFolderName() {
        const { touched, value } = this.state.newFolderInput;

        if(!touched) {
            return 'no name';
        }
        if(value && value.length < 1) {
            return 'no name'
        }
        if(value.length === 0 || value === '') {
            return 'no name';
        }
    
        

    }
    changeState = (value, touched) => {
        console.log(value, touched)
        this.setState({
            newFolderInput: {
                value: value,
                touched: touched
            }
        })
    }

    render(){

        //const newFolderInput = document.getElementById('newFolder').value
        return(
            <div className='NewFolder'>

                <label>Add Folder</label>

                <div className='newFolder'>
                    <label>Name</label>
                    <input id='newFolder'
                        onChange={(value, trueOrFalse) => this.changeState(document.getElementById('newFolder').value, true)}
                        type='text' placeholder='New Folder Name' />
                    <Link to='/'>
                        <button type='submit'
                            disabled={
                                this.validateFolderName()
                            }
                        onClick={(e) => this.folderHandler(e)}>Add Folder</button>
                    </Link>
                    
                </div>

            </div>
        )
    }
}

export default NewFolder;