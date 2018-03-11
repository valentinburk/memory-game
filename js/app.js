/**
 * Logic
 */

$(document).ready(function() {
  let openedCardId = null;
  let ready = true;

  $('.card').click(function() {
    const currentId = flipCard($(this));

    // if another card is open
    if (openedCardId !== null) {
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