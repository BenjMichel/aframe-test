const socket = io();

document.addEventListener('keydown', (event) => {
  const keyName = event.key;

  if (keyName === 'Control') {
    // not alert when only Control key is pressed.
    return;
  }

  if (event.ctrlKey) {
    // Even though event.key is not 'Control' (i.e. 'a' is pressed),
    // event.ctrlKey may be true if Ctrl key is pressed at the time.
    alert(`Combination of ctrlKey + ${keyName}`);
  } else {
    console.log(`Key pressed ${keyName}`);
    socket.emit('move', keyName);
  }
}, false);

socket.on('move', function (data) {
  console.log('move', data);
});
