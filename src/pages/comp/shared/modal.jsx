//CloseModal function to close the modal



function Modal({CloseModal , children}) {
  return (
    <div className="parent-of-modal">
    <form className={`modal`}>
    <div
      onClick={() => {
        CloseModal();
      }}
      className="close"
    >
      <i class="fa-solid fa-circle-xmark"></i>
    </div>
  {children}
    
  </form>
  </div>
  )
}

export default Modal



