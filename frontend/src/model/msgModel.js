const _msgArea = document.querySelector('#msg');

const _delay = 2000;
let _type;
let _msg = '';

const msgModel = (txt = '', type = false) => {
  _type = type;
  _msg = txt;
  displayMsg();
};

function _removeMsg() {
  _msgArea.classList.remove('msg');
  _msgArea.classList.add('hide');
  _msgArea.classList.remove('delete');
}

function displayMsg() {
  if (_type) {
    _msgArea.classList.add('delete');
  }

  _msgArea.classList.add('msg');
  _msgArea.classList.remove('hide');

  _msgArea.innerHTML = _msg;

  setTimeout(_removeMsg, _delay);
}

export default msgModel;
