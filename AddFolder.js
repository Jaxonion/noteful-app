import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function AddFolder(props) {
    

    return(
        <div key={props.i} className='folder'>
            <Link to={`/folder/${props.folderId}`}>{props.folderName}</Link>
        </div>
    );
    

}

AddFolder.propTypes = {
    key: PropTypes.number.isRequired,
    folderId: (folderId) => {
        if(folderId.length < 3) {
            return new Error(`folder id-${folderId} is to short`)
        }
    },
    folderName: PropTypes.string.isRequired
}