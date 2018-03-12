/**
 * Constants
 */

const MAX_NUMBER_OF_PICTURES = 18;
const MEDIUM_LEVEL = 16;
const HARD_LEVEL = 36;

/**
 * Main Logic
 */

$(document).ready(function() {
  $('.board').append(generateCards('medium', 'sweets'));

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
 * Generating board functions
 */

 /**
  * @description Generates the DOM Fragment with cards on it
  * @param {string} level Difficulty of the game - i.e. medium or hard
  * @param {string} category Category of the cards
  * @returns {DocumentFragment} DOM Fragment with cards on it
  */
function generateCards(level, category) {
  let cardsNumber;
  switch (level) {
    case 'medium':
      cardsNumber = MEDIUM_LEVEL;
      break;
    case 'hard':
      cardsNumber = HARD_LEVEL;
      break;
  }

  const fragment = document.createDocumentFragment();

  const ids = getRandomIds(cardsNumber);
  for (const id of ids) {
    const card = getCard(id, category);
    fragment.appendChild(card);
  }

  return $(fragment);
}

/**
 * @description Generates the array of random Ids of cards
 * @param {number} totalCardsNumber Maximum number of cards on board
 * @returns {Array} Shuffled array of cards Ids
 */
function getRandomIds(totalCardsNumber) {
  let ids = [];

  while (ids.length < totalCardsNumber / 2) {
    const rnd = Math.floor(Math.random() * MAX_NUMBER_OF_PICTURES) + 1;
    if (ids.indexOf(rnd) > -1) continue;
    ids[ids.length] = rnd;
  }

  // Double every number
  ids.push(...ids);

  // Shuffle all
  ids = shuffle(ids);

  return ids;
}

/**
 * @description Shuffles array
 * @param {Array} a Items An array containing the items
 * @returns {Array} Shuffled array of same content
 */
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * @description Creates new card
 * @param {number} id Random Id of the card
 * @param {string} category Category of the card
 * @return {Element} New card
 */
function getCard(id, category) {
  const card = createElementWithClass('div', 'card');

  const flipper = createElementWithClass('div', 'flipper');
  const back = createElementWithClass('div', 'card-back');
  const front = createElementWithClass('div', 'card-front');
  const img = createElementWithClass('img', 'card-img');

  card.setAttribute('data-card-id', id);
  img.src = `img/${category}/${id}.jpg`;

  front.appendChild(img);
  flipper.appendChild(back);
  flipper.appendChild(front);
  card.appendChild(flipper);

  return card;
}

/**
 * @description Creates DOM element with provided CSS class
 * @param {string} element Elemet type like div, p or else
 * @param {string} css CSS class to be applied
 * @returns {Element} New element
 */
function createElementWithClass(element, css) {
  const e = document.createElement(element);
  e.classList.add(css);
  return e;
}

/**
 * Gaming functions
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