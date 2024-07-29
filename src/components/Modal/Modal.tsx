import React from 'react';
import Backdrop from "../Backdrop/Backdrop";

interface Props extends React.PropsWithChildren{
    show: boolean;
    title: string;
    onClose: React.MouseEventHandler;
}
const Modal: React.FC<Props> = ({show, title, onClose,children}) => {

    return (
        <>
            <Backdrop show={show}/>
            <div
                className="modal show fade"
                style={{display: show ? 'block' : 'none'}}
                onClick={onClose}
            >
                <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-content bg-dark">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-white">{title}</h1>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;