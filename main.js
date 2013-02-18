console.log('Config Loaded');
require.config({
      deps: ['gamecanvas'],

      paths: {
        board       :'game/board',
        game        :'game/game',
        gamecanvas  :'game/gamecanvas',
        microevent  :'vendors/microevent'
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