var ObjectID = require ('mongodb').ObjectID
//Added comment to test 
var testVar;
module.exports = function(app,db) {
    app.get('/notes/:id',(req,res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        db.collection('notes').findOne(details,(err,item) => {
          if(err) {
            res.send({'error': 'An error has occured !'});
          }
          else {
            res.send(item);
            }
        });
      });

      app.delete('/notes/:id',(req,res) => {
          const id = req.params.id;
          const details = {'_id': new ObjectID(id)};
          db.collection('notes').remove(details,(err,item) => {
            if(err) {
              res.send({'error': 'An error has occured !'});
            }
            else {
              res.send("Note  "+id+" is deleted!");
              }
          });
        });

        app.put('/notes/:id',(req,res) => {
            const id = req.params.id;
            const details = {'_id': new ObjectID(id)};
            const note = {text: req.body.body, title: req.body.title};
            db.collection('notes').update(details,note, (err,item) => {
              if(err) {
                res.send({'error': 'An error has occured !'});
              }
              else {
                res.send(item);
                }
            });
          });


      app.post('/notes',(req,res)=> {
      //Creating the note here
      const note = {text: req.body.body, title: req.body.title};
      // const mydb = database.db('notable')
      db.collection('notes').insert(note, (err, result) => {
        if(err) {
          res.send({'error': 'An error has occured !'});
        }
        else {
          res.send(result.ops[0])
          }

      });
    });
};
