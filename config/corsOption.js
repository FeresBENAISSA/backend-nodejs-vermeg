const whitelist =require('./whitelist');//...

const corsOptions = {
    origin :(origin,callback)=>{
        if (whitelist.indexOf(origin)!==-1|| !origin){
            callback(null,true)
        }else{
            callback(new Error('Not allowed by Cors'))
        }
    },
    optionSuccessStatus :200,
}

module.exports= corsOptions;
//add corsOtion to cors 