exports.definition = {
  config: {
    columns: {
      "name": "text",
      "age": "integer",
      "email": "text"
    },
    adapter: {
      type: "sql",
      collection_name: "user"
    }
  },
  extendModel: function(Model) {
    _.extend(Model.prototype, {
      /* validateプロパティだけど呼び出す時はisValid() */
      validate: function(attrs){
        for(var key in attrs){
          var value = attrs[key];
          switch(key){
            case 'name':
              if(value.length <= 0 || 20 < value.length){
                return 'Error: No title';
              }
              break;
            case 'age':
              if(isNaN(value)){
                return 'Error: No age';
              }
              break;
            case 'email':
              if(!(/^[A-Za-z0-9]+[\w-]+@[\w\.-]+\.\w{2,}$/.test(value))){
                return 'Error: No email';
              }
              break;
          }
        }
      }
    });

    return Model;
  },
  extendCollection: function(Collection) {
    _.extend(Collection.prototype, {
      // extended functions and properties go here
    });

    return Collection;
  }
};
