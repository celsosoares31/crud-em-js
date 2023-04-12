const body = document.querySelector('body');
const divElem = document.createElement('div');

const modal = () => {
  divElem.innerHTML = ` <div class="wrapper">
<div class="modal">
  <div class="modal-info">
    <span class="material-symbols-outlined"> warning </span>
    <div class="modal-text">
      <h2>Your are about to delete this task?</h2>
      <h5>Do you really want to delete this task, click yes to confirm and leave to cancel</h5>
    </div>
  </div>

  <div class="modal-buttons"><button>Cancel</button> <button>Confirm</button></div>
</div>
</div>`;

  body.appendChild(divElem);
  return divElem;
};

export { modal };
