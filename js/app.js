/**
 * Logic
 */

$(document).ready(function() {
  let openedCardId = null;
  let ready = true;
  let movesCount = 0;

  $('.card').click(function() {
    if ($(this).is('[data-success]')) {
      return;
    }

    const currentId = flipCard($(this));

    // if another card is open
    if (openedCardId !== null) {
      movesCount = updateMoves(movesCount);

      if (currentId === openedCardId) {
        setSuccess(currentId);
      } else {
        flipWrongCards();
      }

      // reset
      openedCardId = null;
    } else {
      openedCardId = currentId;
    }
  });
});

/**
 * Functions
 */

/**
 * @description Updates the element whis moves count and records new value
 * @param {number} count Current number of moves
 * @returns Incremented number of moves
 */
function updateMoves(count) {
  const updated = count + 1;
  $('#moves-count').text(updated);
  return updated;
}

/**
 * @description Flips the given card and returns its id
 * @param {jQuery} card Card to flip
 * @returns {number} Id of the flipped card
 */
function flipCard(card) {
  card.find('.flipper').addClass('flipper-open');
  return card.attr('data-card-id');
}

/**
 * @description Sets the card to success state
 * @param {number} cardId The id of the card
 */
function setSuccess(cardId) {
  $(`div[data-card-id=${cardId}]`).attr('data-success', true);
}

/**
 * @description Flips only wrong cards
 */
function flipWrongCards() {
  setTimeout(function() {
   $('.card:not([data-success])').find('.flipper')
     .removeClass('flipper-open');
  }, 500);
}