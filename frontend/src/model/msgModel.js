const _msgArea = document.createElement('div');
const _body = document.querySelector('body');
const _delay = 2000;
_msgArea.classList.add('msg');

const msgModel = (_txt = '', _type = false) => {
  displayMsg(_type, _txt);
};

function _removeMsg() {
  _body.removeChild(_msgArea);
  _msgArea.classList.add('hide');
}

function displayMsg(_type, _txt) {
  if (_type) {
    _msgArea.classList.add('delete');
  }
  _body.appendChild(_msgArea);

  _msgArea.classList.remove('hide');
  setTimeout(_removeMsg, _delay);
  _msgArea.innerHTML = _txt;
}

export default msgModel;
