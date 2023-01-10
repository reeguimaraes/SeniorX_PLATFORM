
/**
 * Nome da primitiva : createRole
 * Nome do dominio : platform
 * Nome do serviço : authorization
 * Nome do tenant : fabrispumacom
 **/

const axios = require("axios");

exports.handler = async (event) => {
  
  let body = parseBody(event);
  let tokenSeniorX = event.headers['X-Senior-Token'];
  
  if(body.hasOwnProperty('description')){
    return sendRes(200, body);
  }else{
    let user = await obterDadosUser(tokenSeniorX);
    body.description = 'Papel criado por: ' + user.fullName;
    return sendRes(200, body);
  }
    
};

const obterDadosUser = async (tokenSeniorX) => {
  
  let vResponse;
  
  let headerConfig ={
    headers:{
      "Authorization": tokenSeniorX
    }
  };
  
  try{
  vResponse = await axios.get('https://platform.senior.com.br/t/senior.com.br/bridge/1.0/rest/platform/user/queries/getUser', headerConfig);
  
  return vResponse.data;
  
  } catch (e){
    return sendRes(400, 'Erro ao realizar chamada HTTP');
    
  }
};

const parseBody = (event) => {
  return typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
};

const sendRes = (status, body) => {
  body.helloWorld = "Olá mundo!";

  var response = {
    statusCode: status,
    headers: {
      "Content-Type": "application/json"
    },
    body: typeof body === 'string' ? body : JSON.stringify(body)
  };

  console.log(body);

  return response;
};
