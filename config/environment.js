 const development ={ 
    name : 'development',
    asset_path :'/assets',
    session_cookie_key:'Blahsomething',
    db:'codeial_development',
    smtp : {
        
            service:'gmail',
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            auth:{
                user:'bitztechdev@gmail.com',
                pass:'mpzwfwmysbayapkw'
            }
        
    },
    google_client_id: "524394902723-agjdm8m92l97tbcm3qdk59urqscu0gld.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret:'codeial'

}


 const production = {
    name : 'production',
    asset_path : process.env.CODEIAL_ASSET_PATH,
    session_cookie_key:process.env.CODEIAL_SESSION_COOKIE_KEY,
    db:process.env.CODEIAL_DB,
        smtp : {
        
            service:'gmail',
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            auth:{
                user:process.env.CODEIAL_GMAIL_USERNAME,
                pass:process.env.CODEIAL_GMAIL_PASSWORD
            }
        
    },
    google_client_id: process.env.CODEIAL_GMAIL_CLIENT_ID,
    google_client_secret:process.env.CODEIAL_GMAIL_CLIENT_SECRET ,
    google_call_back_url: process.env.CODEIAL_GMAIL_CALL_BACK_URL,
    jwt_secret:process.env.CODEIAL_JWT_SECRET


 }
 
module.exports=development;

 module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development: eval(process.env>CODEIAL_ENVIRONMENT)