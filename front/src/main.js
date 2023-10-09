import './index.css'

let gameCount = document.getElementById('gameCount')
let roundCount = document.getElementById('roundCount')
let turnCount = document.getElementById('turnCount')
let currentRound = 1

let previousGameCount
let previousRoundCount
let previousTurnCount

// Call API to set above variables correct number from db
fetch('https://us-central1-escob-app.cloudfunctions.net/app/api/stats')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  })
  .then((data) => {
    const turnsDb = data.turns
    turnCount.innerHTML = turnsDb
    previousTurnCount = turnsDb
    const gamesDb = data.games
    gameCount.innerHTML = gamesDb
    previousGameCount = gamesDb
    const roundsDb = data.rounds
    roundCount.innerHTML = roundsDb
    previousRoundCount = roundsDb
    fetchAndAssignUserData()
  })
  .catch((error) => {
    console.error('Fetch error:', error)
  })

let nameOne = document.getElementById('nameOne')
let winOne = document.getElementById('winOne')
let pointsOne = document.getElementById('pointsOne')
let roundsOne = document.getElementById('roundsOne')
let totalRoundsOne = document.getElementById('totalRoundsOne')
let escobaOne = document.getElementById('escobaOne')
let percentageCardsOne = document.getElementById('percentageCardsOne')
let cardsOne = document.getElementById('cardsOne')
let totalCardsOne = document.getElementById('totalCardsOne')
let percentageHeartsOne = document.getElementById('percentageHeartsOne')
let heartsOne = document.getElementById('heartsOne')
let totalHeartsOne = document.getElementById('totalHeartsOne')
let percentageSevensOne = document.getElementById('percentageSevensOne')
let sevensOne = document.getElementById('sevensOne')
let totalSevensOne = document.getElementById('totalSevensOne')
let percentageSevenHeartOne = document.getElementById('percentageSevenHeartOne')
let sevenHeartOne = document.getElementById('sevenHeartOne')
let totalSevenHeartOne = document.getElementById('totalSevenHeartOne')

let nameTwo = document.getElementById('nameTwo')
let winTwo = document.getElementById('winTwo')
let pointsTwo = document.getElementById('pointsTwo')
let roundsTwo = document.getElementById('roundsTwo')
let totalRoundsTwo = document.getElementById('totalRoundsTwo')
let escobaTwo = document.getElementById('escobaTwo')
let percentageCardsTwo = document.getElementById('percentageCardsTwo')
let cardsTwo = document.getElementById('cardsTwo')
let totalCardsTwo = document.getElementById('totalCardsTwo')
let percentageHeartsTwo = document.getElementById('percentageHeartsTwo')
let heartsTwo = document.getElementById('heartsTwo')
let totalHeartsTwo = document.getElementById('totalHeartsTwo')
let percentageSevensTwo = document.getElementById('percentageSevensTwo')
let sevensTwo = document.getElementById('sevensTwo')
let totalSevensTwo = document.getElementById('totalSevensTwo')
let percentageSevenHeartTwo = document.getElementById('percentageSevenHeartTwo')
let sevenHeartTwo = document.getElementById('sevenHeartTwo')
let totalSevenHeartTwo = document.getElementById('totalSevenHeartTwo')

let percentageCardsDraw = document.getElementById('percentageCardsDraw')
let cardsDrawStats = document.getElementById('cardsDrawDisplay')
let totalCardsDrawStats = document.getElementById('totalCardsDraw')
let percentageHeartsDraw = document.getElementById('percentageHeartsDraw')
let heartsDrawStats = document.getElementById('heartsDrawDisplay')
let totalHeartsDrawStats = document.getElementById('totalHeartsDraw')
let percentageSevensDraw = document.getElementById('percentageSevensDraw')
let sevensDrawStats = document.getElementById('sevensDrawDisplay')
let totalSevensDrawStats = document.getElementById('totalSevensDraw')

async function getUsersData() {
  try {
    const response = await fetch('https://us-central1-escob-app.cloudfunctions.net/app/api/users')

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const userData = await response.json()
    return userData
  } catch (error) {
    console.error('Error fetching users data:', error)
    throw error
  }
}

let usersFetched = {
  lili: {
    cards: 0,
    hearts: 0,
    sevens: 0,
    sevenHeart: 0,
    escoba: 0,
    points: 0,
    rounds: 0,
    wins: 0,
    name: '',
  },
  cami: {
    cards: 0,
    hearts: 0,
    sevens: 0,
    sevenHeart: 0,
    escoba: 0,
    points: 0,
    rounds: 0,
    wins: 0,
    name: '',
  },
}

async function fetchAndAssignUserData() {
  try {
    const userData = await getUsersData()
    const [liliData, camiData] = userData // Assuming lili is at index 0 and cami is at index 1

    await Promise.all([
      // Assign lili's data
      (async () => {
        usersFetched.lili.cards = liliData.cards
        usersFetched.lili.hearts = liliData.hearts
        usersFetched.lili.sevens = liliData.sevens
        usersFetched.lili.sevenHeart = liliData.sevenHeart
        usersFetched.lili.escoba = liliData.escoba
        usersFetched.lili.points = liliData.points
        usersFetched.lili.wins = liliData.wins
        usersFetched.lili.name = liliData.name
        usersFetched.lili.rounds = liliData.rounds
      })(),

      // Assign cami's data
      (async () => {
        usersFetched.cami.cards = camiData.cards
        usersFetched.cami.hearts = camiData.hearts
        usersFetched.cami.sevens = camiData.sevens
        usersFetched.cami.sevenHeart = camiData.sevenHeart
        usersFetched.cami.escoba = camiData.escoba
        usersFetched.cami.points = camiData.points
        usersFetched.cami.wins = camiData.wins
        usersFetched.cami.name = camiData.name
        usersFetched.cami.rounds = camiData.rounds
      })(),
    ])
    processData()
  } catch (error) {
    console.error('Error:', error)
  }
}

function processData() {
  let resultPercentageCardsOne
  let resultPercentageHeartsOne
  let resultPercentageSevensOne
  let resultPercentageSevenHeartOne

  let resultPercentageCardsTwo
  let resultPercentageHeartsTwo
  let resultPercentageSevensTwo
  let resultPercentageSevenHeartTwo

  if (usersFetched.cami.wins >= usersFetched.lili.wins) {
    nameOne.innerHTML = usersFetched.cami.name
    winOne.innerHTML = usersFetched.cami.wins
    pointsOne.innerHTML = usersFetched.cami.points
    roundsOne.innerHTML = usersFetched.cami.rounds
    totalRoundsOne.innerHTML = previousRoundCount
    escobaOne.innerHTML = usersFetched.cami.escoba
    cardsOne.innerHTML = usersFetched.cami.cards
    totalCardsOne.innerHTML = previousTurnCount
    heartsOne.innerHTML = usersFetched.cami.hearts
    totalHeartsOne.innerHTML = previousTurnCount
    sevensOne.innerHTML = usersFetched.cami.sevens
    totalSevensOne.innerHTML = previousTurnCount
    sevenHeartOne.innerHTML = usersFetched.cami.sevenHeart
    totalSevenHeartOne.innerHTML = previousTurnCount

    resultPercentageCardsOne = Math.floor((usersFetched.cami.cards * 100) / previousTurnCount)
    percentageCardsOne.innerHTML = isNaN(resultPercentageCardsOne) ? '0' : resultPercentageCardsOne.toString()

    resultPercentageHeartsOne = Math.floor((usersFetched.cami.hearts * 100) / previousTurnCount)
    percentageHeartsOne.innerHTML = isNaN(resultPercentageHeartsOne) ? '0' : resultPercentageHeartsOne.toString()

    resultPercentageSevensOne = Math.floor((usersFetched.cami.sevens * 100) / previousTurnCount)
    percentageSevensOne.innerHTML = isNaN(resultPercentageSevensOne) ? '0' : resultPercentageSevensOne.toString()

    resultPercentageSevenHeartOne = Math.floor((usersFetched.cami.sevenHeart * 100) / previousTurnCount)
    percentageSevenHeartOne.innerHTML = isNaN(resultPercentageSevenHeartOne) ? '0' : resultPercentageSevenHeartOne.toString()

    nameTwo.innerHTML = usersFetched.lili.name
    winTwo.innerHTML = usersFetched.lili.wins
    pointsTwo.innerHTML = usersFetched.lili.points
    roundsTwo.innerHTML = usersFetched.lili.rounds
    totalRoundsTwo.innerHTML = previousRoundCount
    escobaTwo.innerHTML = usersFetched.lili.escoba
    cardsTwo.innerHTML = usersFetched.lili.cards
    totalCardsTwo.innerHTML = previousTurnCount
    heartsTwo.innerHTML = usersFetched.lili.hearts
    totalHeartsTwo.innerHTML = previousTurnCount
    sevensTwo.innerHTML = usersFetched.lili.sevens
    totalSevensTwo.innerHTML = previousTurnCount
    sevenHeartTwo.innerHTML = usersFetched.lili.sevenHeart
    totalSevenHeartTwo.innerHTML = previousTurnCount

    resultPercentageCardsTwo = Math.floor((usersFetched.lili.cards * 100) / previousTurnCount)
    percentageCardsTwo.innerHTML = isNaN(resultPercentageCardsTwo) ? '0' : resultPercentageCardsTwo.toString()

    resultPercentageHeartsTwo = Math.floor((usersFetched.lili.hearts * 100) / previousTurnCount)
    percentageHeartsTwo.innerHTML = isNaN(resultPercentageHeartsTwo) ? '0' : resultPercentageHeartsTwo.toString()

    resultPercentageSevensTwo = Math.floor((usersFetched.lili.sevens * 100) / previousTurnCount)
    percentageSevensTwo.innerHTML = isNaN(resultPercentageSevensTwo) ? '0' : resultPercentageSevensTwo.toString()

    resultPercentageSevenHeartTwo = Math.floor((usersFetched.lili.sevenHeart * 100) / previousTurnCount)
    percentageSevenHeartTwo.innerHTML = isNaN(resultPercentageSevenHeartTwo) ? '0' : resultPercentageSevenHeartTwo.toString()
  } else {
    nameOne.innerHTML = usersFetched.lili.name
    winOne.innerHTML = usersFetched.lili.wins
    pointsOne.innerHTML = usersFetched.lili.points
    roundsOne.innerHTML = usersFetched.lili.rounds
    totalRoundsOne.innerHTML = previousRoundCount
    escobaOne.innerHTML = usersFetched.lili.escoba
    cardsOne.innerHTML = usersFetched.lili.cards
    totalCardsOne.innerHTML = previousTurnCount
    heartsOne.innerHTML = usersFetched.lili.hearts
    totalHeartsOne.innerHTML = previousTurnCount
    sevensOne.innerHTML = usersFetched.lili.sevens
    totalSevensOne.innerHTML = previousTurnCount
    sevenHeartOne.innerHTML = usersFetched.lili.sevenHeart
    totalSevenHeartOne.innerHTML = previousTurnCount

    resultPercentageCardsOne = Math.floor((usersFetched.lili.cards * 100) / previousTurnCount)
    percentageCardsOne.innerHTML = isNaN(resultPercentageCardsOne) ? '0' : resultPercentageCardsOne.toString()

    resultPercentageHeartsOne = Math.floor((usersFetched.lili.hearts * 100) / previousTurnCount)
    percentageHeartsOne.innerHTML = isNaN(resultPercentageHeartsOne) ? '0' : resultPercentageHeartsOne.toString()

    resultPercentageSevensOne = Math.floor((usersFetched.lili.sevens * 100) / previousTurnCount)
    percentageSevensOne.innerHTML = isNaN(resultPercentageSevensOne) ? '0' : resultPercentageSevensOne.toString()

    resultPercentageSevenHeartOne = Math.floor((usersFetched.lili.sevenHeart * 100) / previousTurnCount)
    percentageSevenHeartOne.innerHTML = isNaN(resultPercentageSevenHeartOne) ? '0' : resultPercentageSevenHeartOne.toString()

    nameTwo.innerHTML = usersFetched.cami.name
    winTwo.innerHTML = usersFetched.cami.wins
    pointsTwo.innerHTML = usersFetched.cami.points
    roundsTwo.innerHTML = usersFetched.cami.rounds
    totalRoundsTwo.innerHTML = previousRoundCount
    escobaTwo.innerHTML = usersFetched.cami.escoba
    cardsTwo.innerHTML = usersFetched.cami.cards
    totalCardsTwo.innerHTML = previousTurnCount
    heartsTwo.innerHTML = usersFetched.cami.hearts
    totalHeartsTwo.innerHTML = previousTurnCount
    sevensTwo.innerHTML = usersFetched.cami.sevens
    totalSevensTwo.innerHTML = previousTurnCount
    sevenHeartTwo.innerHTML = usersFetched.cami.sevenHeart
    totalSevenHeartTwo.innerHTML = previousTurnCount

    resultPercentageCardsTwo = Math.floor((usersFetched.cami.cards * 100) / previousTurnCount)
    percentageCardsTwo.innerHTML = isNaN(resultPercentageCardsTwo) ? '0' : resultPercentageCardsTwo.toString()

    resultPercentageHeartsTwo = Math.floor((usersFetched.cami.hearts * 100) / previousTurnCount)
    percentageHeartsTwo.innerHTML = isNaN(resultPercentageHeartsTwo) ? '0' : resultPercentageHeartsTwo.toString()

    resultPercentageSevensTwo = Math.floor((usersFetched.cami.sevens * 100) / previousTurnCount)
    percentageSevensTwo.innerHTML = isNaN(resultPercentageSevensTwo) ? '0' : resultPercentageSevensTwo.toString()

    resultPercentageSevenHeartTwo = Math.floor((usersFetched.cami.sevenHeart * 100) / previousTurnCount)
    percentageSevenHeartTwo.innerHTML = isNaN(resultPercentageSevenHeartTwo) ? '0' : resultPercentageSevenHeartTwo.toString()
  }

  let resultPercentageCardsDraw = Math.floor(
    ((previousTurnCount - (usersFetched.cami.cards + usersFetched.lili.cards)) * 100) / previousTurnCount
  )
  percentageCardsDraw.innerHTML = isNaN(resultPercentageCardsDraw) ? '0' : resultPercentageCardsDraw.toString()
  cardsDrawStats.innerHTML = previousTurnCount - (usersFetched.cami.cards + usersFetched.lili.cards)
  totalCardsDrawStats.innerHTML = previousTurnCount

  let resultPercentageHeartsDraw = Math.floor(
    ((previousTurnCount - (usersFetched.cami.hearts + usersFetched.lili.hearts)) * 100) / previousTurnCount
  )
  percentageHeartsDraw.innerHTML = isNaN(resultPercentageHeartsDraw) ? '0' : resultPercentageHeartsDraw.toString()
  heartsDrawStats.innerHTML = previousTurnCount - (usersFetched.cami.hearts + usersFetched.lili.hearts)
  totalHeartsDrawStats.innerHTML = previousTurnCount

  let resultPercentageSevensDraw = Math.floor(
    ((previousTurnCount - (usersFetched.cami.sevens + usersFetched.lili.sevens)) * 100) / previousTurnCount
  )
  percentageSevensDraw.innerHTML = isNaN(resultPercentageSevensDraw) ? '0' : resultPercentageSevensDraw
  sevensDrawStats.innerHTML = previousTurnCount - (usersFetched.cami.sevens + usersFetched.lili.sevens)
  totalSevensDrawStats.innerHTML = previousTurnCount
}

let cardsDraw = document.getElementById('cardsDraw')
let heartDraw = document.getElementById('heartsDraw')
let sevensDraw = document.getElementById('sevensDraw')

let scoreRoundCami = document.getElementById('scoreRoundCami')
let cardsCami = document.getElementById('cardsCami')
let heartsCami = document.getElementById('heartsCami')
let sevensCami = document.getElementById('sevensCami')
let sevenHeartCami = document.getElementById('sevenHeartCami')
let escobaCami = document.getElementById('escobaCami')

let scoreRoundLili = document.getElementById('scoreRoundLili')
let cardsLili = document.getElementById('cardsLili')
let heartsLili = document.getElementById('heartsLili')
let sevensLili = document.getElementById('sevensLili')
let sevenHeartLili = document.getElementById('sevenHeartLili')
let escobaLili = document.getElementById('escobaLili')

let turnButton = document.getElementById('turnButton')
let roundButton = document.getElementById('roundButton')
roundButton.style.backgroundColor = 'black'
roundButton.style.pointerEvents = 'none'
let gameButton = document.getElementById('gameButton')
gameButton.style.backgroundColor = 'black'
gameButton.style.pointerEvents = 'none'

let game = {
  lili: {
    cards: 0,
    hearts: 0,
    sevens: 0,
    sevenHeart: 0,
    escoba: 0,
    points: 0,
    rounds: 0,
    win: 0,
  },
  cami: {
    cards: 0,
    hearts: 0,
    sevens: 0,
    sevenHeart: 0,
    escoba: 0,
    points: 0,
    rounds: 0,
    win: 0,
  },
  turns: 0,
  rounds: 0,
  currentTurn: {
    pointsCami: 0,
    pointsLili: 0,
  },
  roundOne: {
    pointsCami: 0,
    pointsLili: 0,
    winner: 'blank',
  },
  roundTwo: {
    pointsCami: 0,
    pointsLili: 0,
    winner: 'blank',
  },
  roundThree: {
    pointsCami: 0,
    pointsLili: 0,
    winner: 'blank',
  },
}

function updateRoundStats() {
  if (cardsCami.checked) {
    //validation Cami
    game.cami.cards += 1
    game.currentTurn.pointsCami += 1
  }
  if (heartsCami.checked) {
    game.cami.hearts += 1
    game.currentTurn.pointsCami += 1
  }
  if (sevensCami.checked) {
    game.cami.sevens += 1
    game.currentTurn.pointsCami += 1
  }
  if (sevenHeartCami.checked) {
    game.cami.sevenHeart += 1
    game.currentTurn.pointsCami += 1
  }
  game.cami.escoba += parseInt(escobaCami.value)
  game.currentTurn.pointsCami += parseInt(escobaCami.value)
  //validation Lili
  if (cardsLili.checked) {
    game.lili.cards += 1
    game.currentTurn.pointsLili += 1
  }
  if (heartsLili.checked) {
    game.lili.hearts += 1
    game.currentTurn.pointsLili += 1
  }
  if (sevensLili.checked) {
    game.lili.sevens += 1
    game.currentTurn.pointsLili += 1
  }
  if (sevenHeartLili.checked) {
    game.lili.sevenHeart += 1
    game.currentTurn.pointsLili += 1
  }
  game.lili.escoba += parseInt(escobaLili.value)
  game.currentTurn.pointsLili += parseInt(escobaLili.value)
  //stats
  game.turns += 1
  //display points
  scoreRoundCami.innerHTML = game.currentTurn.pointsCami
  scoreRoundLili.innerHTML = game.currentTurn.pointsLili
  //add values to turn without calling the db each time
  let currentTurnCount = parseInt(turnCount.innerHTML)
  turnCount.innerHTML = currentTurnCount + 1
  //reset values
  cardsDraw.checked = true
  heartDraw.checked = true
  sevensDraw.checked = true
  sevenHeartLili.checked = false
  sevenHeartCami.checked = false
  escobaCami.value = '0'
  escobaLili.value = '0'
}

function camiWins() {
  roundButton.style.backgroundColor = 'white'
  roundButton.style.pointerEvents = 'auto'
  document.getElementById('preventClick').style.pointerEvents = 'none'
  turnButton.style.pointerEvents = 'none'
  game.cami.rounds += 1
  switch (currentRound) {
    case 1:
      game.roundOne.pointsCami = parseInt(scoreRoundCami.innerHTML)
      game.roundOne.pointsLili = parseInt(scoreRoundLili.innerHTML)
      game.roundOne.winner = 'Cami'
      break
    case 2:
      game.roundTwo.pointsCami = parseInt(scoreRoundCami.innerHTML)
      game.roundTwo.pointsLili = parseInt(scoreRoundLili.innerHTML)
      game.roundTwo.winner = 'Cami'
      break
    case 3:
      game.roundThree.pointsCami = parseInt(scoreRoundCami.innerHTML)
      game.roundThree.pointsLili = parseInt(scoreRoundLili.innerHTML)
      game.roundThree.winner = 'Cami'
      break
  }
  turnButton.style.backgroundColor = 'black'
}

function liliWins() {
  roundButton.style.backgroundColor = 'white'
  roundButton.style.pointerEvents = 'auto'
  document.getElementById('preventClick').style.pointerEvents = 'none'
  turnButton.style.pointerEvents = 'none'
  game.lili.rounds += 1
  switch (currentRound) {
    case 1:
      game.roundOne.pointsCami = parseInt(scoreRoundCami.innerHTML)
      game.roundOne.pointsLili = parseInt(scoreRoundLili.innerHTML)
      game.roundOne.winner = 'Lili'
      break
    case 2:
      game.roundTwo.pointsCami = parseInt(scoreRoundCami.innerHTML)
      game.roundTwo.pointsLili = parseInt(scoreRoundLili.innerHTML)
      game.roundTwo.winner = 'Lili'
      break
    case 3:
      game.roundThree.pointsCami = parseInt(scoreRoundCami.innerHTML)
      game.roundThree.pointsLili = parseInt(scoreRoundLili.innerHTML)
      game.roundThree.winner = 'Lili'
      break
  }
  turnButton.style.backgroundColor = 'black'
}

turnButton.addEventListener('click', function () {
  if (sevenHeartCami.checked || sevenHeartLili.checked) {
    updateRoundStats()
    if (parseInt(scoreRoundCami.innerHTML) >= 15 && parseInt(scoreRoundLili.innerHTML) < 15) {
      camiWins()
    } else if (parseInt(scoreRoundLili.innerHTML) >= 15 && parseInt(scoreRoundCami.innerHTML) < 15) {
      liliWins()
    } else if (parseInt(scoreRoundCami.innerHTML) >= 15 && parseInt(scoreRoundLili.innerHTML) >= 15) {
      if (parseInt(scoreRoundCami.innerHTML) > parseInt(scoreRoundLili.innerHTML)) {
        camiWins()
      } else if (parseInt(scoreRoundCami.innerHTML) < parseInt(scoreRoundLili.innerHTML)) {
        liliWins()
      }
    }
  }
})

function nextRound() {
  game.currentTurn.pointsCami = 0
  game.currentTurn.pointsLili = 0
  scoreRoundCami.innerHTML = '0'
  scoreRoundLili.innerHTML = '0'
}

function doubleWin() {
  turnButton.style.pointerEvents = 'none'
  turnButton.style.backgroundColor = 'black'
  gameButton.style.backgroundColor = 'white'
  gameButton.style.pointerEvents = 'auto'
  if (document.getElementById('roundOneName').innerHTML == 'Cami') {
    game.cami.win += 1
  } else if (document.getElementById('roundOneName').innerHTML == 'Lili') {
    game.lili.win += 1
  }
}

function gameEnded() {
  turnButton.style.pointerEvents = 'none'
  turnButton.style.backgroundColor = 'black'
  gameButton.style.backgroundColor = 'white'
  gameButton.style.pointerEvents = 'auto'
  if (document.getElementById('roundThreeName').innerHTML == 'Cami') {
    game.cami.win += 1
  } else if (document.getElementById('roundThreeName').innerHTML == 'Lili') {
    game.lili.win += 1
  }
}

roundButton.addEventListener('click', function () {
  roundButton.style.backgroundColor = 'black'
  roundButton.style.pointerEvents = 'none'
  document.getElementById('preventClick').style.pointerEvents = 'auto'
  turnButton.style.pointerEvents = 'auto'
  turnButton.style.backgroundColor = 'white'
  game.cami.points += game.currentTurn.pointsCami
  game.lili.points += game.currentTurn.pointsLili
  switch (currentRound) {
    case 1:
      document.getElementById('roundOneName').innerHTML = game.roundOne.winner
      if (document.getElementById('roundOneName').innerHTML == 'Cami') {
        document.getElementById('winRoundOne').innerHTML = game.roundOne.pointsCami
        document.getElementById('looseRoundOne').innerHTML = game.roundOne.pointsLili
      } else {
        document.getElementById('winRoundOne').innerHTML = game.roundOne.pointsLili
        document.getElementById('looseRoundOne').innerHTML = game.roundOne.pointsCami
      }
      break
    case 2:
      document.getElementById('roundTwoName').innerHTML = game.roundTwo.winner
      if (document.getElementById('roundTwoName').innerHTML == 'Cami') {
        document.getElementById('winRoundTwo').innerHTML = game.roundTwo.pointsCami
        document.getElementById('looseRoundTwo').innerHTML = game.roundTwo.pointsLili
        if (document.getElementById('roundOneName').innerHTML == 'Cami') {
          doubleWin()
        }
      } else {
        document.getElementById('winRoundTwo').innerHTML = game.roundTwo.pointsLili
        document.getElementById('looseRoundTwo').innerHTML = game.roundTwo.pointsCami
        if (document.getElementById('roundOneName').innerHTML == 'Lili') {
          doubleWin()
        }
      }
      break
    case 3:
      document.getElementById('roundThreeName').innerHTML = game.roundThree.winner
      if (document.getElementById('roundThreeName').innerHTML == 'Cami') {
        document.getElementById('winRoundThree').innerHTML = game.roundThree.pointsCami
        document.getElementById('looseRoundThree').innerHTML = game.roundThree.pointsLili
        gameEnded()
      } else {
        document.getElementById('winRoundThree').innerHTML = game.roundThree.pointsLili
        document.getElementById('looseRoundThree').innerHTML = game.roundThree.pointsCami
        gameEnded()
      }
      break
  }
  currentRound++
  game.rounds += 1
  //add values to round without calling the db each time
  let currentRoundCount = parseInt(roundCount.innerHTML)
  roundCount.innerHTML = currentRoundCount + 1
  nextRound()
})

const updatePlayerData = async (playerId, newData) => {
  try {
    const response = await fetch(`https://us-central1-escob-app.cloudfunctions.net/app/api/users/update/${playerId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    })

    if (!response.ok) {
      throw new Error(`Network response was not ok. Status: ${response.status}`)
    }

    console.log(`Player ${playerId} data updated successfully`)
  } catch (error) {
    console.error(`Error updating player ${playerId} data:`, error)
  }
}

const updateStatsData = async (newData) => {
  try {
    const response = await fetch(`https://us-central1-escob-app.cloudfunctions.net/app/api/stats/update/0`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    })

    if (!response.ok) {
      throw new Error(`Network response was not ok. Status: ${response.status}`)
    }

    console.log(`Stats data updated successfully`)
    location.reload()
  } catch (error) {
    console.error(`Error updating stats data:`, error)
  }
}

gameButton.addEventListener('click', function () {
  const liliDataToUpdate = {
    cards: game.lili.cards + usersFetched.lili.cards,
    hearts: game.lili.hearts + usersFetched.lili.hearts,
    sevens: game.lili.sevens + usersFetched.lili.sevens,
    sevenHeart: game.lili.sevenHeart + usersFetched.lili.sevenHeart,
    escoba: game.lili.escoba + usersFetched.lili.escoba,
    points: game.lili.points + usersFetched.lili.points,
    rounds: game.lili.rounds + usersFetched.lili.rounds,
    wins: game.lili.win + usersFetched.lili.wins,
  }

  const camiDataToUpdate = {
    cards: game.cami.cards + usersFetched.cami.cards,
    hearts: game.cami.hearts + usersFetched.cami.hearts,
    sevens: game.cami.sevens + usersFetched.cami.sevens,
    sevenHeart: game.cami.sevenHeart + usersFetched.cami.sevenHeart,
    escoba: game.cami.escoba + usersFetched.cami.escoba,
    points: game.cami.points + usersFetched.cami.points,
    rounds: game.cami.rounds + usersFetched.cami.rounds,
    wins: game.cami.win + usersFetched.cami.wins,
  }

  const statsDataToUpdate = {
    games: previousGameCount + 1,
    rounds: previousRoundCount + game.rounds,
    turns: previousTurnCount + game.turns,
  }

  updatePlayerData(0, liliDataToUpdate)
  updatePlayerData(1, camiDataToUpdate)
  updateStatsData(statsDataToUpdate)
})

document.getElementById('resetButton').addEventListener('click', function () {
  const liliReset = {
    cards: 0,
    hearts: 0,
    sevens: 0,
    sevenHeart: 0,
    escoba: 0,
    points: 0,
    rounds: 0,
    wins: 0,
  }

  const camiReset = {
    cards: 0,
    hearts: 0,
    sevens: 0,
    sevenHeart: 0,
    escoba: 0,
    points: 0,
    rounds: 0,
    wins: 0,
  }

  const statsReset = {
    games: 0,
    rounds: 0,
    turns: 0,
  }
  updatePlayerData(0, liliReset)
  updatePlayerData(1, camiReset)
  updateStatsData(statsReset)
})
