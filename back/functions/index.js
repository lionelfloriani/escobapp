const functions = require('firebase-functions')

const admin = require('firebase-admin')
var serviceAccount = require('./permissions.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const express = require('express')
const app = express()
const db = admin.firestore()

const cors = require('cors')
app.use(cors({ origin: true }))

// Routes
// POST (test)
app.post('/api/test', async (req, res) => {
  try {
    await db
      .collection('test')
      .doc('/' + req.body.id + '/')
      .create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
      })
    return res.status(200).send()
  } catch (err) {
    console.error(err)
    return res.status(500).send(err)
  }
})
// GET
app.get('/api', (req, res) => {
  return res.status(200).send('Hello World!')
})

app.get('/api/stats', async (req, res) => {
  try {
    const document = db.collection('stats').doc('0')
    const statsSnapshot = await document.get()
    const statsData = statsSnapshot.data()

    return res.status(200).json(statsData)
  } catch (err) {
    console.error(err)
    return res.status(500).send(err)
  }
})

app.get('/api/users', async (req, res) => {
  try {
    const document = await db.collection('users').get()
    const usersData = []
    document.forEach((doc) => {
      usersData.push(doc.data())
    })

    return res.status(200).json(usersData)
  } catch (err) {
    console.error(err)
    return res.status(500).send(err)
  }
})

// PUT
app.put('/api/stats/update/:id', async (req, res) => {
  try {
    const docId = req.params.id

    const updateData = {
      games: req.body.games,
      rounds: req.body.rounds,
      turns: req.body.turns,
    }

    await db.collection('stats').doc(docId).update(updateData)

    return res.status(200).send()
  } catch (err) {
    console.error(err)
    return res.status(500).send(err)
  }
})

app.put('/api/users/update/:id', async (req, res) => {
  try {
    const docId = req.params.id

    const updateData = {
      cards: req.body.cards,
      hearts: req.body.hearts,
      sevens: req.body.sevens,
      sevenHeart: req.body.sevenHeart,
      escoba: req.body.escoba,
      points: req.body.points,
      rounds: req.body.rounds,
      wins: req.body.wins,
    }

    await db.collection('users').doc(docId).update(updateData)

    return res.status(200).send()
  } catch (err) {
    console.error(err)
    return res.status(500).send(err)
  }
})

exports.app = functions.https.onRequest(app)
