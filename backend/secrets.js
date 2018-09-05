const secrets = {
    dbUri: "mongodb://localhost:27017/mern-comment-box"
  };
  
  export const getSecret = key => secrets[key];