const request = require('supertest');
const authentication = require('../middlewares/authentication');
const MyAnimeController = require('../controllers/controllerMyAnime');
const AnimesController = require('../controllers/controllerAnimes');
const UserController = require('../controllers/controllerUser');
const { User, Transaction } = require('../models');
const app = require('../app');

describe('MyAnimeController', () => {
  describe('getMyAnime', () => {
    it('should return a list of anime', async () => {
      const res = await request(app)
        .get('/myanime')
        .set('Authorization', 'Bearer valid_token') 
        .expect(200);

      expect(res.body).toHaveProperty('animes');
      expect(res.body).toHaveProperty('totalCount');
      expect(res.body).toHaveProperty('pageSize');
      expect(res.body).toHaveProperty('currentPage');
      expect(res.body).toHaveProperty('countPage');
    });
  });

  describe('addFavAnime', () => {
    it('should add a new anime to the user\'s favorites', async () => {
      const res = await request(app)
        .post('/myanime/addFav/1') 
        .set('Authorization', 'Bearer valid_token') 
        .send({ animeId: 12345 })
        .expect(201);

      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('UserId');
      expect(res.body).toHaveProperty('MALId');
      
    });

    it('should return a 400 error if the anime already exists', async () => {
      const res = await request(app)
        .post('/myanime/addFav/1') 
        .set('Authorization', 'Bearer valid_token') 
        .send({ animeId: 12345 }) 
        .expect(400);

      expect(res.body).toHaveProperty('message', 'Anime already favorited');
    });
  });

  describe('deleteMyAnime', () => {
    it('should delete an anime from the user\'s favorites', async () => {
      const res = await request(app)
        .delete('/myanime/delete/1') 
        .set('Authorization', 'Bearer valid_token') 
        .expect(200);

      expect(res.body).toHaveProperty('MALId');
     
    });
  });
});

describe('AnimesController', () => {
  describe('getAnimes', () => {
    it('should return a list of animes', async () => {
      const res = await request(app)
        .get('/animes')
        .expect(200);

      expect(res.body).toHaveProperty('data');
    });
  });

  describe('getAnime', () => {
    it('should return a single anime', async () => {
      const res = await request(app)
        .get('/animes/12345') 
        .expect(200);

      expect(res.body).toHaveProperty('MALId');
      expect(res.body).toHaveProperty('title');
      expect(res.body).toHaveProperty('titleJap');
      expect(res.body).toHaveProperty('imgUrl');
      expect(res.body).toHaveProperty('episodes');
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('aired');
      expect(res.body).toHaveProperty('synopsis');
      expect(res.body).toHaveProperty('producers');
      expect(res.body).toHaveProperty('licensors');
      expect(res.body).toHaveProperty('studios');
    });
  });
});

describe('Middleware', () => {
  describe('authentication', () => {
    it('should return a 401 error if no token is provided', async () => {
      const res = await request(app)
        .get('/myanime')
        .expect(401);

      expect(res.body).toHaveProperty('message', 'Invalid Token');
    });

    it('should return a 401 error if the token is invalid', async () => {
      const res = await request(app)
        .get('/myanime')
        .set('Authorization', 'Bearer invalid_token')
        .expect(400);

      expect(res.body).toHaveProperty('message', 'Invalid Token');
    });

    it('should add the user to the request object', async () => {
      const user = { id: 1, username: 'testuser' };
      const req = { headers: { authorization: 'Bearer valid_token' } };
      const next = jest.fn();

      authentication(req, res, next);

      expect(req.user).toEqual(user);
      expect(next).toHaveBeenCalled();
    });
  });
});

describe('UserController', () => {
    describe('findUser', () => {
      it('should return a user by id', async () => {
        const userId = 1;
        const res = await request(app)
          .get(`/users/findUser/${userId}`)
          .expect(200);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('username');
        expect(res.body).toHaveProperty('email');
      });
  
      it('should return 404 if user is not found', async () => {
        const userId = 999;
        const res = await request(app)
          .get(`/users/findUser/${userId}`)
          .expect(404)
        expect(res.body).toHaveProperty('message', 'User Not Found');
      });
    });
  
    describe('editUser', () => {
      it('should update a user by id', async () => {
        const userId = 1;
        const updatedUser = {
          username: 'newUsername',
          email: 'newEmail@example.com',
          password: 'newPassword'
        };
        const res = await request(app)
          .put(`/users/editUser/${userId}`)
          .send(updatedUser)
          .expect(200);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('username', updatedUser.username);
        expect(res.body).toHaveProperty('email', updatedUser.email);
      });
  
      it('should return 400 if password is not provided', async () => {
        const userId = 1;
        const updatedUser = {
          username: 'newUsername',
          email: 'newEmail@example.com'
        };
        const res = await request(app)
          .put(`/users/editUser/${userId}`)
          .send(updatedUser)
          .expect(400)
        expect(res.body).toHaveProperty('message', 'Invalid Password');
      });
  
      it('should return 404 if user is not found', async () => {
        const userId = 999;
        const updatedUser = {
          username: 'newUsername',
          email: 'newEmail@example.com',
          password: 'newPassword'
        };
        const res = await request(app)
          .put(`/users/editUser/${userId}`)
          .send(updatedUser)
          .expect(404)
        expect(res.body).toHaveProperty('message', 'User Not Found');
      });
    });
  });

describe('Global Routes', () => {
  describe('POST /register', () => {
    it('should create a new user and return a 200 status code', async () => {
      const res = await request(app)
        .post('/register')
        .send({
          username: 'testuser',
          email: 'testuser@example.com',
          password: 'testpassword'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.id).toBeDefined();
      expect(res.body.username).toBe('testuser');
      expect(res.body.email).toBe('testuser@example.com');
    });
  });

  describe('POST /login', () => {
    it('should login a user and return a 200 status code', async () => {
      const user = await User.create({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'testpassword'
      });

      const res = await request(app)
        .post('/login')
        .send({
          email: 'testuser@example.com',
          password: 'testpassword'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.id).toBeDefined();
      expect(res.body.username).toBe('testuser');
      expect(res.body.email).toBe('testuser@example.com');
    });
  });

  describe('POST /login/google', () => {
    it('should login a user with google and return a 200 status code', async () => {
      const res = await request(app)
        .post('/login/google')
        .send({
          id_token: 'testidtoken'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.id).toBeDefined();
      expect(res.body.username).toBeDefined();
      expect(res.body.email).toBeDefined();
    });
  });

  describe('POST /pay/stripe', () => {
    it('should process a stripe transaction and return a 200 status code', async () => {
      const user = await User.create({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'testpassword',
        status: 'Free'
      });

      const res = await request(app)
        .post('/pay/stripe')
        .set('Authorization', `Bearer ${user.generateToken()}`)
        .send({
          product_data_name: 'Test Product',
          product_data_unit_amount: 1000,
          product_data_currency: 'usd',
          product_data_quantity: 1
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.url).toBeDefined();
    });
  });

  describe('PATCH /upgrade', () => {
    it('should upgrade a user to premium and return a 200 status code', async () => {
      const user = await User.create({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'testpassword',
        status: 'Free'
      });

      const transaction = await Transaction.create({
        UserId: user.id,
        transaction_id: 'TRX-UACC-warg48-20220101',
        payment_gateway_id: 'test_payment_gateway_id',
        status: 'unpaid'
      });

      user.Transactions = [transaction];

      const res = await request(app)
        .patch('/upgrade')
        .set('Authorization', `Bearer ${user.generateToken()}`);

      expect(res.statusCode).toBe(200);
      expect(user.status).toBe('Premium');
      expect(transaction.status).toBe('paid');
    });
  });
});

describe('Authentication Middleware', () => {
  it('should return a 401 status code if no authorization header is present', async () => {
    const res = await request(app)
      .get('/user')

    expect(res.statusCode).toBe(401);
  });

  it('should return a 401 status code if the authorization header is not a bearer token', async () => {
    const res = await request(app)
      .get('/user')
      .set('Authorization', 'Basic testtoken')

    expect(res.statusCode).toBe(401);
  });

  it('should return a 401 status code if the token is not valid', async () => {
    const res = await request(app)
      .get('/user')
      .set('Authorization', 'Bearer invalidtoken')

    expect(res.statusCode).toBe(401);
  });

  it('should return a 401 status code if the token is not associated with a user', async () => {
    const res = await request(app)
      .get('/user')
      .set('Authorization', 'Bearer ' + User.generateToken({ id: 999999 }))

    expect(res.statusCode).toBe(401);
  });
});
