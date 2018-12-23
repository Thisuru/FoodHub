const secrets = {
    // dbUri: "mongodb://localhost:27017/mern-comment-box"
    dbUri: "mongodb://root:Thisuru@11@ds141674.mlab.com:41674/mern-comment-box"
  
  };
  
  export const getSecret = key => secrets[key];