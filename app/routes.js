// BARISTA APP API ===================================================================================

module.exports = function(app, passport, db) {

  // normal routes ===============================================================

  // show the home page (will also have our login links)

  app.get('/', function(req, res) {
    res.render('cashier.ejs');
  });


  // creating the inputs of the order proprties
  app.post('/submitOrder', (req, res) => {
    db.collection('orders').save({orderName: req.body.orderName, orderItem: req.body.orderItem, baristaName: null, completed: false}, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect('/')
    })
  })

  // app.post('/submitOrder', (req, res) => {
  //   console.log(req.body)
  //   db.collection('orders').save({orderName: req.body.orderNameValue, req.body.orderItem, baristaName: null, completed: false}, (err, result) => {
  //     if (err) return console.log(err)
  //     console.log('saved to database')
  //     res.redirect('/')
  //   })
  // })

  // going through the collection an making it into an array
  app.get('/barista', isLoggedIn, function(req, res) {
    db.collection('orders').find().toArray((err, result) => {
      // console.log(result)
      if (err) return console.log(err)
      res.render('barista.ejs', {
        user : res.user,
        orders: result
      })
    })
  });


  app.put('/completedOrder', (req, res) => {
    console.log("completedOrder .put workin'")
    db.collection('orders')
    .findOneAndUpdate({orderName: req.body.name, orderItem: req.body.order }, {
      $set:
      {baristaName: req.user.local.email,
        completed: true
      }
    }, {
      sort: {_id: -1},
      upsert: false
    }, (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    })
  })

  // this is for displaying the orders for them to be deleted on the cashier page
  // app.get('/cashier', isLoggedIn, function(req, res) {
  //   db.collection('orders').find().toArray((err, result) => {
  //     if (err) return console.log(err)
  //     res.render('cashier.ejs', {
  //       user : req.user,
  //       order: result
  //     })
  //   })
  // });

  //
  // app.delete('/', (req, res) => {
  //   db.collection('order').findOneAndDelete({orderName: req.body.orderName, orderItem: req.body.orderItem}, (err, result) => {
  //     if (err) return res.send(500, err)
  //     res.send('Order deleted!')
  //   })
  // })


  // LOGOUT ==============================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });


  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  //render the login/signup form
  app.get('/login', function(req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/barista', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  // SIGNUP =================================
  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/barista', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));
  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  app.get('/unlink/local', isLoggedIn, function(req, res) {
    var user            = req.user;
    user.local.email    = undefined;
    user.local.password = undefined;
    user.save(function(err) {
      res.redirect('/barista');
    });
  });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
  return next();
  res.redirect('/');
}
