import { Router } from "express";

const router = Router();

let servers = [
  {id: "1", name: 'AWS', status: 'working'},
  {id: "2", name: 'Google', status: 'working'},
  {id: "3", name: 'Yandex', status: 'working'},
  {id: "4", name: 'Microsoft', status: 'pending'},
];

router.get('/api/server', (req, res) => {
  // res.status(200).json(servers);
  res.json({xuy: 25});
});

export default router;