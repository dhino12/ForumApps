/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Modal({ setOpenModal, addThread, authUser }) {
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  function handleBodyChange({ target }) {
    if (target.value.length !== 0) {
      setBody(target.value);
    }
  }

  function handleTitleChange({ target }) {
    setTitle(target.value);
  }

  function handleCategoryChange({ target }) {
    if (target.value.length !== 0) {
      setCategory(target.value);
    }
  }

  function submitThread() {
    if (body.trim()) {
      addThread(title, body, category);
      setBody("");
    }
  }

  if (authUser == null) {
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
            <button
              onClick={() => {
                setOpenModal(false);
              }}
            >
              X
            </button>
          </div>
          <div className="title">
            <h1>
              Kenalin aku For-U
              <sub>m</sub>
              ,
              <br />
              {' '}
              kamu siapa ? ...
            </h1>
            <p>milih login atau register ?</p>
          </div>
          <div className="footer">
            <Link to="/register">
              <button id="cancelBtn">Register</button>
            </Link>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modalWrapper">
      <div
        className="modalBackground"
        onClick={() => {
          setOpenModal(false);
        }}
      />
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>
            Es buah pake blewah,
            {' '}
            <br />
            {' '}
            kamu lagi mikir apa yah ?
          </h1>
          <textarea
            id="title"
            cols="60"
            rows="2"
            placeholder="Cerita kamu kasih judul apa ya ?"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="category">
          <p>Category, kalem ini opsional kok</p>
          <textarea
            cols="60"
            rows="2"
            placeholder="lebih dari 1 ? pisahkan dengan koma (,)"
            value={category}
            onChange={handleCategoryChange}
          />
        </div>
        <div className="body">
          <p>masukan curhatan kamu dibawah, aku rahasiain kok!</p>
          <p>
            <strong>{body.length}</strong>
            /320
          </p>
          <textarea
            id="body"
            cols="60"
            rows="8"
            placeholder="apa yang kamu pikirkan ?"
            value={body}
            onChange={handleBodyChange}
          />
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Batal
          </button>
          <button onClick={submitThread}>Simpan</button>
        </div>
      </div>
    </div>
  );
}
