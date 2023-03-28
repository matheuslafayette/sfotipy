import express = require('express');
import bodyParser = require("body-parser");

import { CarService } from './src/cars-service';
import { Car } from './src/car';
import { MusicService } from './src/music-service';
import { Music } from './src/music';

var app = express();

var allowCrossDomain = function (req: any, res: any, next: any) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
app.use(allowCrossDomain);

app.use(bodyParser.json());

// var carService: CarService = new CarService();

// app.get('/cars', function (req, res) {
//   const cars = carService.get();
//   res.send(JSON.stringify(cars));
// });

// app.get('/cars/:id', function (req, res) {
//   const id = req.params.id;
//   const car = carService.getById(id);
//   if (car) {
//     res.send(car);
//   } else {
//     res.status(404).send({ message: `Car ${id} could not be found` });
//   }
// });

// app.post('/cars', function (req: express.Request, res: express.Response) {
//   const car: Car = <Car>req.body;
//   try {
//     const result = carService.add(car);
//     if (result) {
//       res.status(201).send(result);
//     } else {
//       res.status(403).send({ message: "Car list is full" });
//     }
//   } catch (err) {
//     const { message } = err;
//     res.status(400).send({ message })
//   }
// });

// app.put('/cars', function (req: express.Request, res: express.Response) {
//   const car: Car = <Car>req.body;
//   const result = carService.update(car);
//   if (result) {
//     res.send(result);
//   } else {
//     res.status(404).send({ message: `Car ${car.id} could not be found.` });
//   }
// })

var musicService: MusicService = new MusicService();

app.get('/musics', function (req, res) {
  const musics = musicService.get();
  res.send(JSON.stringify(musics));
});

app.get('/musics/:id', function (req, res) {
  const id = req.params.id;
  const music = musicService.getById(id);
  if (music) {
    res.send(music);
  } else {
    res.status(404).send({ message: `Music ${id} could not be found` });
  }
});

app.post('/musics', function (req: express.Request, res: express.Response) {
  const music: Music = <Music>req.body;
  try {
    const result = musicService.add(music);
    if (result) {
      res.status(201).send(result);
    } else {
      res.status(403).send({ message: "Music list is full" });
    }
  } catch (err) {
    const { message } = err;
    res.status(400).send({ message })
  }
});

app.put('/musics', function (req: express.Request, res: express.Response) {
  const music: Music = <Music>req.body;
  const result = musicService.update(music);
  if (result) {
    res.send(result);
  } else {
    res.status(404).send({ message: `Music ${music.id} could not be found.` });
  }
});

app.get('/playlist/category/:id', function (req: express.Request, res: express.Response) {
  const playlistId : number = req.params.id;
  const music = musicService.getById(playlistId);
  const categories = music.categories;
  if(categories) {
    res.send(categories);
  } else {
    res.status(404).send({message : 'Playlist could not be found'});
  }
})

var server = app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

function closeServer(): void {
  server.close();
}

export { app, server, closeServer }