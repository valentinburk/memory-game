/**
 * Constants
 */

const MAX_NUMBER_OF_PICTURES = 18;
const EASY_LEVEL = 16;
const HARD_LEVEL = 36;

/**
 * Main Logic
 */

$(document).ready(function() {
  let difficulty = 'easy';
  let category = 'sweets';
  let openedCardId = null;
  let ready = true;
  let movesCount = 0;

  // Set difficulty of the game
  $('.difficulty').on('click', '.difficulty-level', function() {
    difficulty = $(this).attr('data-difficulty');
    hideAndShow($('.difficulty'), $('.category'), 200);
  });

  // Set category of cards
  $('.category').on('click', '.category-type', function() {
    category = $(this).attr('data-category');
    setupBoard(difficulty, category);
    hideAndShow($('.category'), $('.board'), 200);
  });

  $('.board').on('click', '.card', function() {
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
 * @description Sets up the gaming board
 * @param {string} difficulty Difficulty of the game
 * @param {string} category Category of cards
 */
function setupBoard(difficulty, category) {
  const board = $('.board');

  const cards = generateCards(difficulty, category);
  board.append(cards);

  switch (difficulty) {
    case 'easy':
      break;
    case 'hard':
      board.css('width', '700px');
      board.css('height', '700px');
      board.children('.card').css('width', '14.6666%');
      break;
  }
}

/**
 * @description Smoothly hides one element and shows another
 * @param {jQuery} first Element to hide
 * @param {jQuery} second Element to show
 * @param {number} duration Duration of animation
 */
function hideAndShow(first, second, duration) {
  first.fadeOut(duration, function() {
    second.fadeIn(duration);
  });
}

/**
 * @description Generates the DOM Fragment with cards on it
 * @param {string} level Difficulty of the game - i.e. medium or hard
 * @param {string} category Category of the cards
 * @returns {DocumentFragment} DOM Fragment with cards on it
 */
function generateCards(level, category) {
  let cardsNumber;
  switch (level) {
    case 'easy':
      cardsNumber = EASY_LEVEL;
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