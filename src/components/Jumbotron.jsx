/* eslint-disable react/prop-types */
import { useState } from "react";
import Modal from "./Modal";

export default function Jumbotron({ addThread, authUser }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {modalOpen && (
        <Modal
          setOpenModal={setModalOpen}
          addThread={addThread}
          authUser={authUser}
        />
      )}

      <div className="btn-create-thread">
        <button
          onClick={() => {
            setModalOpen(true);
          }}
        >
          Buat Thread
        </button>
        <span> ☜ untuk membuat thread baru silahkan klik</span>
      </div>
      <div className="landscape_1" />
    </>
  );
}
