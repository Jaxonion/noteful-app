import React from 'react';
import { Route } from 'react-router-dom';

import Main from './Main.js';
import NewNote from './NewNote.js';
import MainSidebar from './MainSidebar.js';
import AddSidebar from './AddSidebar.js';
import NewFolder from './NewFolder.js';
import notefulContext from './notefulContext';
import './index.css'
//import STORE from './STORE';
import SelectedFolder from './SelectedFolder';
import SelectedNote from './SelectedNote';
import SelectedFolderSideBar from './SelectedFolderSideBar';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      folders: [],
      notes: [],
      selectedFolder: null
    }
  }

  componentDidMount() {
    fetch('http://localhost:9090/folders')
      .then(res => {
        if(!res.ok) {
          throw new Error('fetch didnt work')
        }
        return res;
      })
      .then(response => {
        return response.json()
      })
      .then(res => {
        console.log(res)
        this.setState({
          folders: res
        })
      })
    fetch('http://localhost:9090/notes')
      .then(res => {
        if(!res.ok) {
          throw new Error('fetch didnt work')
        }
        return res;
      })
      .then(response => {
        return response.json()
      })
      .then(res => {
        console.log(res)
        this.setState({
          notes: res
        })
      })
  }

  addNote = (noteToAdd, folderId, noteContent, noteId) => {
    fetch(`http://localhost:9090/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        id: noteId,
        name: noteToAdd,
        folderId: folderId,
        content: noteContent
      })
    })
    this.setState({ notes: [...this.state.notes, {name: noteToAdd, folderId: folderId, content: noteContent}]})
  }
  
  addFolder = (folderToAdd, createdId) => {
    fetch(`http://localhost:9090/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        id: createdId,
        name: folderToAdd
      })
    })
    console.log(createdId)
    console.log(folderToAdd)
    this.setState({ folders: [...this.state.folders, {id: createdId, name: folderToAdd}]})
  
    
  }

  deleteNote = (noteId) => {
    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
    //const notes = this.state.notes
    //console.log(notes)
    //console.log(noteName);
    let notes = this.state.notes.filter(note=> note.id !== noteId)
    //console.log(notes) 
    this.setState({
      notes
    })
    console.log(this.state.notes)
  }
  
  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      setFolder: this.addFolder,
      setNote: this.addNote,
      removeNote: this.deleteNote
    }
    return(
      <notefulContext.Provider
        value={contextValue}>
        <div  className='App'>

          <div className='Sidebar' >
            <Route path={['/note/:dynamic']}
              render={(props) => {
                return(
                  <SelectedFolderSideBar {...props} />
                )
              }} />
            <Route exact path={'/'}
              render={() => {
                return(
                  <MainSidebar />
                )
              }} />
            <Route path={['/folder/:dynamic']}
              render={() => {
                return(
                  <MainSidebar />
                )
              }} />
            <Route path={['/NewNote', '/NewFolder']}
              render={() => {
                return(
                  <AddSidebar />
                )
              }} />

          </div>

          <section className='Notes'>
            <Route exact path='/' render={() => {
              return(              
                <Main />
              )
            }} />
            <Route path='/NewNote' render={() => {
              return(
                <NewNote />
              )
            }} />
            <Route path='/NewFolder' render={(props) => {
              return(
                <NewFolder {...props} />
              )
            }} />
            <Route path='/folder/:dynamic' render={(props) => {
              return(
                <SelectedFolder {...props} />
              )
            }} />
            <Route path='/note/:dynamic' render={(props) => {
              return(
                <SelectedNote {...props}/>
              )
            }}/>
          </section>

        </div>
      </notefulContext.Provider>
    )
  }
}

export default App;
