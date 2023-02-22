$(document).ready(function () {
  let pieces = createPieces(true);
  $("#pieceContainer").html(pieces);

  // create peaces
  function createPieces(withImage) {
    let rows = 4,
      columns = 4;
    let pieces = "";
    for (let i = 0, top = 0, order = 0; i < rows; i++, top -= 100) {
      for (let j = 0, left = 0; j < columns; j++, left -= 100, order++) {
        if (withImage) {
          pieces +=
            "<div style = 'background-position:" +
            left +
            "px " +
            top +
            "px;' class='piece' data-order=" +
            order +
            "></div>";
        } else {
          pieces +=
            "<div style = 'background-image: none;' class='piece droppableSpace'></div>";
        }
      }
    }
    return pieces;
  }

  // shuffle pieces
  let list = document.getElementById("pieceContainer");
  function shuffle(items) {
    let cached = items.slice(0),
      temp,
      i = cached.length,
      rand;
    while (--i) {
      rand = Math.floor(i * Math.random());
      temp = cached[rand];
      cached[rand] = cached[i];
      cached[i] = temp;
    }
    return cached;
  }

  function shuffleNodes() {
    let nodes = list.children,
      i = 0;
    nodes = Array.prototype.slice.call(nodes);
    nodes = shuffle(nodes);
    while (i < nodes.length) {
      list.appendChild(nodes[i]);
      ++i;
    }
    elementsPosition();
  }

  // btn new game
  $(".btnNewGame").click(function () {
    stopTimer();
    $(".timer").text("01:00");
    $(".time").text("01:00");

    let piece = createPieces(true);
    $("#pieceContainer").html(piece);

    let pieces = $("#pieceContainer div");

    pieces.each(function () {
      $(this).addClass("draggablePiece").css({
        position: "absolute",
      });
    });

    let emptyString = createPieces(false);
    $("#puzzleContainer").html(emptyString);
    shuffleNodes();
    implementLogic();
    $("#btnStartGame").removeAttr("disabled");
    $("#checkResults").attr("disabled", "disabled");
  });

  // implement logic
  function implementLogic() {
    $(".draggablePiece").draggable({
      revert: "invalid",
      start: function () {
        if ($(this).hasClass("droppedPiece")) {
          $(this).removeClass("droppedPiece");
          $(this).parent().removeClass("piecePresent");
        }
        if ($("#pieceContainer div").length == 16) {
          startTimer();
          $("#btnStartGame").attr("disabled", "disabled");
          $("#checkResults").removeAttr("disabled");
        }
      },
    });
    $(".droppableSpace").droppable({
      hoverClass: "ui-state-highlight",
      accept: function () {
        return !$(this).hasClass("piecePresent");
      },
      drop: function (event, ui) {
        let draggableElement = ui.draggable;
        let droppedOn = $(this);
        droppedOn.addClass("piecePresent");
        $(draggableElement)
          .addClass("droppedPiece")
          .css({
            top: 0,
            left: 0,
            position: "relative",
          })
          .appendTo(droppedOn);
      },
    });
  }

  // start timer
  let intervalId;
  function startTimer() {
    const timeScreen = document.querySelector(".timer");
    const timeModal = document.querySelector("#time");

    let seconds = 0;
    let stop = false;
    clearInterval(intervalId);

    let minutes = 1;

    if (stop == false) seconds = 0;

    intervalId = setInterval(() => {
      if (seconds === 0) {
        minutes--;
        seconds = 60;
      }

      seconds--;

      if (minutes < 0) return;

      let min = null;

      if (stop == true) {
        min = timeScreen.innerText;
        min = timeModal.innerText;
        minutes = Number(min[0] + min[1]);
      }

      minutes = minutes.toString();
      seconds = seconds.toString();

      seconds = seconds.length === 1 ? "0" + seconds : seconds;
      minutes = minutes.length === 1 ? "0" + minutes : minutes;

      timeScreen.innerText = `${minutes}:${seconds}`;
      timeModal.innerText = `${minutes}:${seconds}`;

      seconds = Number(seconds);
      if (seconds === 0) {
        clearInterval(intervalId);
        $(".modal-lost__wrapper").removeClass("dNone");
        $("#checkResults").attr("disabled", "disabled");
        $(".btn-win-lost").click(function () {
          $(".modal-lost__wrapper").addClass("dNone");
        });
      }
    }, 1000);
  }

  //   stop timer
  function stopTimer() {
    clearInterval(intervalId);
  }

  // btn start game
  function startGame() {
    $("#btnStartGame").click(function () {
      $("#btnStartGame").attr("disabled", "disabled");
      $("#checkResults").removeAttr("disabled");
      startTimer();
      let pieces = $("#pieceContainer div");

      pieces.each(function () {
        $(this).addClass("draggablePiece").css({
          position: "absolute",
        });
      });

      let emptyString = createPieces(false);
      $("#puzzleContainer").html(emptyString);
      elementsPosition();
      implementLogic();
    });
  }
  startGame();

  // position of elements
  function elementsPosition() {
    $(".draggablePiece:eq(0)").css({
      left: 0 + "px",
      top: 0 + "px",
    });

    $(".draggablePiece:eq(1)").css({
      left: 100 + "px",
      top: 0,
    });

    $(".draggablePiece:eq(2)").css({
      left: 200 + "px",
      top: 0,
    });

    $(".draggablePiece:eq(3)").css({
      left: 300 + "px",
      top: 0,
    });

    $(".draggablePiece:eq(4)").css({
      left: 0,
      top: 100 + "px",
    });

    $(".draggablePiece:eq(5)").css({
      left: 100 + "px",
      top: 100 + "px",
    });

    $(".draggablePiece:eq(6)").css({
      left: 200 + "px",
      top: 100 + "px",
    });

    $(".draggablePiece:eq(7)").css({
      left: 300 + "px",
      top: 100 + "px",
    });

    $(".draggablePiece:eq(8)").css({
      left: 0,
      top: 200 + "px",
    });

    $(".draggablePiece:eq(9)").css({
      left: 100 + "px",
      top: 200 + "px",
    });

    $(".draggablePiece:eq(10)").css({
      left: 200 + "px",
      top: 200 + "px",
    });

    $(".draggablePiece:eq(11)").css({
      left: 300 + "px",
      top: 200 + "px",
    });

    $(".draggablePiece:eq(12)").css({
      left: 0,
      top: 300 + "px",
    });

    $(".draggablePiece:eq(13)").css({
      left: 100 + "px",
      top: 300 + "px",
    });

    $(".draggablePiece:eq(14)").css({
      left: 200 + "px",
      top: 300 + "px",
    });

    $(".draggablePiece:eq(15)").css({
      left: 300 + "px",
      top: 300 + "px",
    });
  }

  // close modal
  $(".btn-close-lost").click(function () {
    $(".modal-lost__wrapper").addClass("dNone");
  });

  $(".btn-close-check").click(function () {
    $(".modal-check__wrapper").addClass("dNone");
  });

  $(".btn-win-lost").click(function () {
    $(".modal-lost__wrapper").addClass("dNone");
  });

  // btn check results
  $("#checkResults").click(function () {
    $(".modal-check__wrapper").removeClass("dNone");
  });

  // btn check modal
  $(".btn-check").click(function () {
    checkIfPuzzleSolved();
  });

  function puzzleLost() {
    $(".modal-check__wrapper").addClass("dNone");
    $(".modal-lost__wrapper").removeClass("dNone");
    stopTimer();
    $("#checkResults").attr("disabled", "disabled");
  }

  // check puzzle solved
  function checkIfPuzzleSolved() {
    if ($("#puzzleContainer .droppedPiece").length != 16) {
      puzzleLost();
      return false;
    }

    for (let k = 0; k < 16; k++) {
      let item = $("#puzzleContainer .droppedPiece:eq(" + k + ")");
      let order = item.data("order");
      if (k != order) {
        puzzleLost();
        return false;
      }
    }

    $(".modal-win__wrapper").removeClass("dNone");
    $("#checkResults").attr("disabled", "disabled");
    $("#btnStartGame").attr("disabled", "disabled");
    $(".btn-close-lost").click(function () {
      $(".modal-win__wrapper").addClass("dNone");
      $(".modal-check__wrapper").addClass("dNone");
    });
    stopTimer();
    return true;
  }

});
