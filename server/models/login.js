let users = [
    {
      id : 1,
      username: "admin",
      password: "admin123"
    },
    {
      id: 2,
      username: "abdelaziz",
      password: "aboukhame"
    }
  ];

  module.exports = class user {
    constructor(id, username, password, token) {
      this.id = id;
      this.username = username;
      this.password = password;
      this.token = token;
    }
    static login(username, password) {
      const index = users.findIndex(u => u.username == username && u.password == password);
      if(index>-1){
          let tok = users[index].username + " , " + Date.now() ;
          this.token = tok;
          console.log("My token = ", tok);
          return {token : tok};
      }
      return { message : "Sorry ! Username or Password is incorrect , Please try again" }
    }
  };