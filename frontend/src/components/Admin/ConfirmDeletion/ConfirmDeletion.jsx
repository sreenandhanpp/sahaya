import React from 'react'
import './style.css'

const ConfirmDeletion = ({ ConfirmDelete, CancelDelete, showConfirmation }) => {
    return (
        <div
            className={`modal fade ${showConfirmation ? 'show' : ''}`}
            id="confirmationModal"
            tabIndex="-1"
            role="dialog"
            style={{ display: showConfirmation ? 'block' : 'none' }}
        >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-body">
                        <p>Are you sure you want to delete the campaign?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn cancel-deletion-btn text-white" onClick={CancelDelete}>
                            Cancel
                        </button>
                        <button type="button" className="btn confirm-deletion-btn text-white" onClick={ConfirmDelete}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ConfirmDeletion
