import React from 'react';
import { Link } from 'react-router-dom';
import notefulContext from './notefulContext';
import AddFolder from './AddFolder';

class MainSidebar extends React.Component {
    static contextType = notefulContext;
    render() {
        let value = this.context;
        const folders = value.folders.map((folder, i) => {
            //console.log('folder_id', folder)
            return(
                <AddFolder history={this.props.history} i={i} folderId={folder.id} folderName={folder.title}></AddFolder>
            )
        })
        return(
            <div>
                {folders}
                <Link to='/NewFolder'>Add Folder</Link>
            </div>
        )
    }
}

export default MainSidebar;