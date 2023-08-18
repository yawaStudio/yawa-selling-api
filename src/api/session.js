/* eslint-disable no-unused-vars */
const express = require('express');
const { PrismaClient } = require('@prisma/client');

// eslint-disable-next-line no-unused-vars
const prisma = new PrismaClient();
const router = express.Router();

router.post('/', async (req, res) => {
  const {
    sellerId,
    driverId,
    itineraryId,
    deviceId,
    vehiculeId,
    CompanieId,
    operatorId,
    reseauId,
  } = req.body;
  const d = new Date();
  const date = new Intl.DateTimeFormat('fr').format(d);
  const time = d.toLocaleTimeString('fr-FR');
  // eslint-disable-next-line no-console
  console.log('date: ', date, 'time ', time);
  await prisma.selling.updateMany({
    where: {
      deviceId,
    },
    data: {
      isActiveted: false,
    },
  });
  const type = 'Vente';
  const result = await prisma.selling.create({
    data: {
      type,
      sellerId,
      driverId,
      itineraryId,
      deviceId,
      startTime: time,
      sellingDate: date,
      vehiculeId,
      CompanieId,
      operatorId,
      reseauId,
    },
    include: {
      Controls: true,
      Costs: true,
      Rental: true,
      driver: true,
      seller: true,
      Companie: true,
      device: true,
      operator: true,
      itinerary: {
        include: {
          coordinates: true,
          rates: true,
        },
      },
      vehicule: true,
      Tickets: true,
      tracking: true,
      trajet: true,
    },
  });
  res.json(result);
});

module.exports = router;
