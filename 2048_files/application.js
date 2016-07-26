// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
  var game = new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager);
  var interface = new Interface(game);
  new AI(interface);

  // TODO: This code is in need of a refactor (along with the rest)
});
