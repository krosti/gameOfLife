console.log('Config Loaded');
require.config({
      deps: ["gamecanvas"],

      paths: {
        board       :'board',
        game        :'game',
        microevent  :'microevent',
        gamecanvas  :'gamecanvas'
      },

      shim:{
        board       : 'Board',
        game        : 'Game',
        microevent  : 'MicroEvent'
      },

      modules:[
        {
          name: 'gamecanvas'
        }
      ]
  });