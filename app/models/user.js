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
                this.errorMsg = '名前は１文字以上20文字以下です';
                return 'Error: name';
              }
              break;
            case 'age':
              if(value.length <= 0 || isNaN(value)){
                this.errorMsg = '年齢は数字のみです';
                return 'Error: age';
              }
              break;
            case 'email':
              if(!(/^[A-Za-z0-9]+[\w-]+@[\w\.-]+\.\w{2,}$/.test(value))){
                this.errorMsg = 'Eメールが正しくありません';
                return 'Error: email';
              }
              break;
          }
        }
      },
      errorMsg: ''
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
