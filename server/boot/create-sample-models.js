var async = require('async');
module.exports = function(app) {
  //data sources
  var mongoDs = app.dataSources.productDS;
  
  //create all models
  async.parallel({
    reviewers: async.apply(createReviewers),
    images: async.apply(createImages)
  });
  //create reviewers
  function createReviewers(cb) {
    mongoDs.automigrate('Reviewer', function(err) {
      if (err) return cb(err);
      var Reviewer = app.models.Reviewer;
      Reviewer.create([
        {email: 'foo@bar.com', password: 'foobar'},
        {email: 'john@doe.com', password: 'johndoe'},
        {email: 'jane@doe.com', password: 'janedoe'}
      ], cb);
    });
  }
   //create reviewers
  function createImages(cb) {
    mongoDs.automigrate('Image', function(err) {
      if (err) return cb(err);
      var Image = app.models.Image;
      Image.create([
        {imageDescription: 'classique', fileName: 'classique.png'},
        {imageDescription: 'elegance', fileName: 'elegance.png'},
        {imageDescription: 'etudiants', fileName: 'etudiants.png'},
        {imageDescription: 'modulo', fileName: 'modulo.png'},
        {imageDescription: 'odyssee', fileName: 'odyssee.png'},
        {imageDescription: 'odysseeelite', fileName: 'odysseeelite.png'},
        {imageDescription: 'remises', fileName: 'remises.png'},
        {imageDescription: 'world', fileName: 'world.png'}
      ], cb);
    });
  }
};