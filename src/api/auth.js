/* eslint-disable linebreak-style */
const express = require('express');
const { PrismaClient } = require('@prisma/client');

// eslint-disable-next-line no-unused-vars
const prisma = new PrismaClient();
const router = express.Router();

// eslint-disable-next-line consistent-return
router.post('/', async (req, res) => {
  const { device } = req.body;

  const d = new Date();
  const date = new Intl.DateTimeFormat('fr').format(d);
  if (device === 'KD8975A') {
    return false;
  } if (device === 'KD8972A') {
    return false;
  }
  const result = await prisma.deviceAttribution.findFirst({
    where: {
      deviceCode: device,
      isActiveted: true,
    },
    include: {
      reseau: {
        include: {
          Itinerary: {
            include: {
              rates: true,
              coordinates: true,
            },
          },
          Rubrics: true,
          Controller: true,
        },
      },
      Companie: true,
      operator: true,
      vehicule: {
        include: { Seller: true, Driver: true },
      },
      Selling: {
        where: { sellingDate: date, isActiveted: true },
        include: {
          Controls: true,
          Costs: true,
          Rental: true,
          Companie: true,
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
          reseau: {
            include: {
              Itinerary: {
                include: {
                  rates: true,
                  coordinates: true,
                },
              },
              Rubrics: true,
              Controller: true,
            },
          },
        },
      },
    },
  });
  // eslint-disable-next-line no-console
  console.log('session', result);
  res.json(result);
});

module.exports = router;
