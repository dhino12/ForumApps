/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import { useState } from "react";

export default function ModalComment({ setOpenModal, addComment }) {
    const [body, setBody] = useState('');

    function handleBodyChange({ target }) {
        if (target.value.length !== 0) {
            setBody(target.value);
        }
    }

    function onAddComment() {
        addComment(body);
    }

    return (
      <div className="modalWrapper">
        <div
          className="modalBackground"
          onClick={() => {
                    setOpenModal(false);
                }}
        />
        <div className="modalContainer warning-notlogged">
          <div className="titleCloseBtn">
            <button onClick={() => {
                setOpenModal(false);
            }}
            >
              X
            </button>
          </div>
          <div className="title">
            <h1>Menurut kamu bagaimana ?</h1>
          </div>
          <div className="body">
            <p>
              <strong>{body.length}</strong>
              /320
            </p>
            <textarea cols="60" rows="8" placeholder="pendapatmu......." value={body} onChange={handleBodyChange} />
          </div>
          <div className="footer">
            <button
              id="cancelBtn"
              onClick={() => {
                            setOpenModal(false);
                        }}
            >
              Close
            </button>
            <button onClick={onAddComment}>Simpan</button>
          </div>
        </div>
      </div>
    );
}
