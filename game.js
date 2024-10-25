(function () {
  const car = document.querySelector(".car");
  const trees = document.querySelectorAll(".tree");
  const gameButton = document.querySelector(".game-button");

  const speed = 2;
  let isPause = false;
  let animationId = null;
  const tree1 = trees[0];
  const treesCoords = [];

  const carCoords = getCoords(car);
  const carMoveInfo = {
    top: null,
    bottom: null,
    left: null,
    right: null,
  };

  for (let i = 0; i < trees.length; i++) {
    const tree = trees[i];
    const coordsTree = getCoords(tree);
    treesCoords.push(coordsTree);
  }
  //keydown, keyup
  document.addEventListener("keydown", (event) => {
    const code = event.code;

    if (code === "ArrowUp" && carMoveInfo.top === null) {
      carMoveInfo.top = requestAnimationFrame(carMoveToTop);
    } 
    else if (code === "ArrowDown" && carMoveInfo.bottom === null) {
      carMoveInfo.bottom = requestAnimationFrame(carMoveToBottom);
    } 
    else if (code === "ArrowLeft" && carMoveInfo.left === null) {
      carMoveInfo.left = requestAnimationFrame(carMoveToLeft);
    } 
    else if (code === "ArrowRight" && carMoveInfo.right === null) {
      carMoveInfo.right = requestAnimationFrame(carMoveToRight);
    }
  });

  document.addEventListener("keyup", (event) => {
    if (code === "ArrowUp") {
      cancelAnimationFrame(carMoveInfo.top);
      carMoveInfo.top = null;
    }
     else if (code === "ArrowDown") {
      cancelAnimationFrame(carMoveInfo.bottom);
      carMoveInfo.bottom = null;
    }
    else if (code === "ArrowLeft") {
      cancelAnimationFrame(carMoveInfo.left);
      carMoveInfo.left = null;
    } 
    else if (code === "ArrowRight") {
      cancelAnimationFrame(carMoveInfo.right);
      carMoveInfo.right = null;
    }
  });

  function carMoveToTop() {
    const newY = carCoords.y - 5;
    carCoords.y = newY;
    carMove(carCoords.x, newY);
    carMoveInfo.top = requestAnimationFrame(carMoveToTop);
  }
  function carMoveToBottom() {
    const newY = carCoords.y + 5;
    carCoords.y = newY;
    carMove(carCoords.x, newY);
    carMoveInfo.bottom = requestAnimationFrame(carMoveToBottom);
  }
  function carMoveToLeft() {
    const newX = carCoords.x - 5;
    carCoords.x = newX;
    carMove(newX, carCoords.y);
    carMoveInfo.left = requestAnimationFrame(carMoveToLeft);
  }
  function carMoveToRight() {
    const newX = carCoords.x + 5;
    carCoords.x = newX;
    carMove(newX, carCoords.y);
    carMoveInfo.right = requestAnimationFrame(carMoveToRight);
  }
  function carMove(x, y) {
    car.style.transform = `translate(${x}px, ${y}px)`;
  }

  animationId = requestAnimationFrame(startGame);

  function startGame() {
    treesAnimation();
    animationId = requestAnimationFrame(startGame);
  }

  function treesAnimation() {
    for (let i = 0; i < trees.length; i++) {
      const tree = trees[i];
      const coords = treesCoords[i];

      let newYCoord = coords.y + speed;

      if (newYCoord > window.innerHeight) {
        newYCoord = -300;
      }

      treesCoords[i].y = newYCoord;

      treesCoords[i].y = newYCoord;
      tree.style.transform = `translate(${coords.x}px, ${newYCoord}px)`;
    }
  }

  function getCoords(element) {
    const matrix = window.getComputedStyle(element).transform;
    const array = matrix.split(",");
    const y = array[array.length - 1];
    const x = array[array.length - 2];
    const numericY = parseFloat(y);
    const numericX = parseFloat(x);

    return { x: numericX, y: numericY };
  }

  gameButton.addEventListener("click", () => {
    isPause = !isPause;
    if (isPause) {
      cancelAnimationFrame(animationId);
      gameButton.children[0].style.display = "none";
      gameButton.children[1].style.display = "initial";
    } else {
      animationId = requestAnimationFrame(startGame);
      gameButton.children[0].style.display = "initial";
      gameButton.children[1].style.display = "none";
    }
  });
})();
